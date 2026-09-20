import { generatePRDSections } from '@/lib/prd-generator';

export interface AIInterviewData {
  appName: string;
  oneLinePitch: string;
  targetAudience: string;
  primaryPersonaNeeds: string;
  coreUserFlows: string[];
  keyFeatures: string[];
  platform: string;
  customPlatform?: string;
  frontendPreference?: string;
  backendPreference?: string;
  databasePreference?: string;
  thirdPartyIntegrations: string[];
  monetizationModel?: string;
  designAesthetic: string;
  colorMood?: string;
  primaryColor?: string;
  specialRules?: string;
}

export interface AIPRDOutput {
  success: boolean;
  modelUsed: string;
  projectName: string;
  isFallback?: boolean;
  sections: {
    id: string;
    title: string;
    filename: string;
    content: string;
  }[];
  error?: string;
}

export const NARA_BASE_URL =
  process.env.NARA_BASE_URL || 'https://router.bynara.id/v1';

export const NARA_API_KEY = process.env.NARA_API_KEY || '';

export const NARA_MODELS = [
  'agnes-2.5-flash',
];


// Converts nested JSON objects/arrays to human-readable Markdown
export function jsonToMarkdown(obj: any, depth = 1): string {
  if (typeof obj === 'string') return obj;
  if (typeof obj !== 'object' || obj === null) return String(obj);

  let md = '';

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) {
        md += jsonToMarkdown(item, depth) + '\n\n';
      } else {
        md += `- ${item}\n`;
      }
    }
    return md;
  }

  for (const [key, value] of Object.entries(obj)) {
    const heading = key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (s) => s.toUpperCase())
      .trim();

    const prefix = '#'.repeat(Math.min(depth + 1, 4));

    if (typeof value === 'string') {
      md += `${prefix} ${heading}\n\n${value}\n\n`;
    } else if (Array.isArray(value)) {
      md += `${prefix} ${heading}\n\n`;
      if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
        const keys = Object.keys(value[0]);
        if (keys.length <= 4) {
          md += `| ${keys.map((k) => k.replace(/_/g, ' ').toUpperCase()).join(' | ')} |\n`;
          md += `| ${keys.map(() => '---').join(' | ')} |\n`;
          for (const row of value) {
            md += `| ${keys.map((k) => String(row[k] || '')).join(' | ')} |\n`;
          }
          md += '\n';
        } else {
          for (const item of value) {
            md += jsonToMarkdown(item, depth + 1) + '\n';
          }
        }
      } else {
        for (const item of value) {
          md += `- ${String(item)}\n`;
        }
        md += '\n';
      }
    } else if (typeof value === 'object' && value !== null) {
      md += `${prefix} ${heading}\n\n`;
      md += jsonToMarkdown(value, depth + 1);
    } else {
      md += `${prefix} ${heading}: **${String(value)}**\n\n`;
    }
  }

  return md;
}

// Normalizes AI content into clean human-readable Markdown
export function cleanSectionContent(val: any): string {
  if (!val) return '';
  if (typeof val === 'object') {
    return jsonToMarkdown(val);
  }

  let str = String(val).trim();

  // If wrapped in JSON code fence ```json ... ```
  if (str.startsWith('```json') && str.endsWith('```')) {
    const inner = str.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    try {
      const parsed = JSON.parse(inner);
      return cleanSectionContent(parsed);
    } catch (e) {
      str = inner;
    }
  }

  // If string starts with { or [ and ends with } or ], try parsing as JSON
  if ((str.startsWith('{') && str.endsWith('}')) || (str.startsWith('[') && str.endsWith(']'))) {
    try {
      const parsed = JSON.parse(str);
      if (typeof parsed === 'object' && parsed !== null) {
        if (parsed.overview || parsed.features || parsed.uiux || parsed.technical) {
          return cleanSectionContent(parsed.content || parsed.overview || jsonToMarkdown(parsed));
        }
        return jsonToMarkdown(parsed);
      }
    } catch (e) {
      // Not valid JSON, continue with string processing
    }
  }

  // Strip outer markdown code block if the AI wrapped the entire file in ```markdown ... ```
  const outerCodeBlock = str.match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n```$/i);
  if (outerCodeBlock && outerCodeBlock[1]) {
    str = outerCodeBlock[1].trim();
  } else if (str.startsWith('```markdown') || str.startsWith('```md')) {
    str = str.replace(/^```(?:markdown|md)?\s*/i, '').replace(/```\s*$/, '').trim();
  }

  // Handle literal escaped newlines: "\n" -> real newlines, "\t" -> tabs, \" -> "
  if (str.includes('\\n') && !str.includes('\n\n')) {
    str = str.replace(/\\n/g, '\n').replace(/\\r/g, '').replace(/\\t/g, '\t').replace(/\\"/g, '"');
  }

  return str;
}

// Helper to sanitize and extract JSON from model responses
function extractJSONFromResponse(raw: string): any {
  let cleaned = raw.trim();

  // If wrapped in markdown code fence ```json ... ```
  if (cleaned.includes('```')) {
    const match = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      cleaned = match[1].trim();
    }
  }

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Attempt relaxed parsing: find first '{' and last '}'
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      try {
        return JSON.parse(cleaned.substring(start, end + 1));
      } catch (e) {
        // continue
      }
    }
    throw new Error('Unable to parse JSON structure from AI output: ' + raw.substring(0, 150));
  }
}

// Resilient section extractor (supports structured JSON or markdown section headings)
function extractSectionsFromResponse(raw: string): {
  overview?: any;
  features?: any;
  uiux?: any;
  technical?: any;
} | null {
  try {
    const json = extractJSONFromResponse(raw);
    if (json && (json.overview || json.features || json.uiux || json.technical)) {
      return json;
    }
  } catch (e) {
    // Fallback to markdown header parsing if JSON parsing fails
  }

  const sections: { overview?: string; features?: string; uiux?: string; technical?: string } = {};

  const overviewMatch = raw.match(/(?:#+\s*(?:01[ -]?)?PRODUCT[ -]?OVERVIEW[\s\S]*?)(?=#+\s*(?:02[ -]?)?FEATURES|$)/i);
  if (overviewMatch) sections.overview = overviewMatch[0].trim();

  const featuresMatch = raw.match(/(?:#+\s*(?:02[ -]?)?FEATURES[\s\S]*?)(?=#+\s*(?:03[ -]?)?UI|$)/i);
  if (featuresMatch) sections.features = featuresMatch[0].trim();

  const uiuxMatch = raw.match(/(?:#+\s*(?:03[ -]?)?UI[\s\S]*?)(?=#+\s*(?:04[ -]?)?TECH|$)/i);
  if (uiuxMatch) sections.uiux = uiuxMatch[0].trim();

  const techMatch = raw.match(/(?:#+\s*(?:04[ -]?)?TECH[\s\S]*?)$/i);
  if (techMatch) sections.technical = techMatch[0].trim();

  if (sections.overview && sections.features && sections.uiux && sections.technical) {
    return sections;
  }

  return null;
}

function buildLocalFallback(data: AIInterviewData, projectName: string): AIPRDOutput {
  const fallback = generatePRDSections({
    idea: data.oneLinePitch || data.appName || 'Product Concept',
    platform: data.platform,
    customPlatform: data.customPlatform,
    stack: {
      frontend: data.frontendPreference,
      backend: data.backendPreference,
      database: data.databasePreference,
    },
    designStyle: data.designAesthetic,
    colors: data.primaryColor
      ? {
          primary: data.primaryColor,
          secondary: '#64748b',
          accent: '#3b82f6',
          background: '#ffffff',
          surface: '#f8fafc',
          text: '#0f172a',
        }
      : undefined,
    keyFeatures: data.keyFeatures,
    guidingNotes: data.specialRules,
  });

  return {
    success: true,
    modelUsed: 'local-synthesis-engine',
    projectName: fallback.projectName || projectName,
    isFallback: true,
    sections: fallback.sections.map((s) => ({
      id: s.id,
      title: s.title,
      filename: s.filename,
      content: cleanSectionContent(s.content),
    })),
  };
}

export async function generatePRDWithNara(
  data: AIInterviewData
): Promise<AIPRDOutput> {
  const projectName = data.appName || data.oneLinePitch.substring(0, 45) || 'AI Generated Project';

  if (!NARA_API_KEY) {
    console.warn('[Nara Router] NARA_API_KEY is not set. Using local synthesis fallback.');
    return buildLocalFallback(data, projectName);
  }

  const platform = data.customPlatform || data.platform || 'Cross-Platform Web & Mobile';
  const frontend = data.frontendPreference || 'Modern Reactive Frontend';
  const backend = data.backendPreference || 'High-Throughput Node.js/Serverless API';
  const database = data.databasePreference || 'PostgreSQL';

  const systemPrompt = `You are a Principal Software Architect and Staff Technical Product Manager.
Generate an elite, developer-ready 4-file Product Requirements Document (PRD) package.
Your output must be returned STRICTLY as a valid JSON object matching this schema:
{
  "overview": "Complete Markdown for 01-PRODUCT-OVERVIEW.md",
  "features": "Complete Markdown for 02-FEATURES-REQUIREMENTS.md",
  "uiux": "Complete Markdown for 03-UI-UX-REQUIREMENTS.md",
  "technical": "Complete Markdown for 04-TECHNICAL-REQUIREMENTS.md"
}

CRITICAL RULES:
- Output MUST be valid JSON containing all 4 keys.
- Each value MUST be direct Markdown text. Do NOT wrap values in triple backticks code fences (do NOT use \`\`\`markdown ... \`\`\` inside JSON values).
- Ensure all quotes and newlines inside JSON strings are properly escaped.
- Be concise, high-density, and technical (~250-400 words per section).

Section Requirements:
1. "overview": Executive Summary, Problem Statement, Target User Personas with JTBD, 3 Core Value Pillars, and a 90-Day Success Metrics KPI Table.
2. "features": Scope Boundary Matrix (MVP vs Phase 2) with P0/P1/P2 priorities, 4-5 Detailed User Stories with Gherkin Acceptance Criteria, Edge Cases & Error States.
3. "uiux": Visual Design System for "${data.designAesthetic}" style, Color Tokens table with exact Hex codes (primary: ${data.primaryColor || '#f97316'}), Typography scale, ASCII Wireframe layout, WCAG AA compliance.
4. "technical": Architecture Blueprint with a Mermaid.js flowchart (graph TD), Production Database Schema (DDL SQL) with foreign keys & indexes, Core REST API contracts with JSON payloads, Security & Auth strategy.`;

  const coreFlowsStr = Array.isArray(data.coreUserFlows) && data.coreUserFlows.length > 0
    ? data.coreUserFlows.join('; ')
    : (data.coreUserFlows || 'Standard user onboarding and core workflow');

  const keyFeaturesStr = Array.isArray(data.keyFeatures) && data.keyFeatures.length > 0
    ? data.keyFeatures.join('; ')
    : (data.keyFeatures || 'Core product features and user dashboard');

  const integrationsStr = Array.isArray(data.thirdPartyIntegrations) && data.thirdPartyIntegrations.length > 0
    ? data.thirdPartyIntegrations.join(', ')
    : (data.thirdPartyIntegrations || 'Standard REST APIs');

  const userPrompt = `Product Idea: ${data.appName || 'Application'}
Elevator Pitch: ${data.oneLinePitch || ''}
Target Audience: ${data.targetAudience || 'General Users'}
Primary Persona Needs: ${data.primaryPersonaNeeds || 'High usability, fast performance'}
Core Workflows: ${coreFlowsStr}
Key Features: ${keyFeaturesStr}
Platform: ${platform}
Frontend Tech: ${frontend}
Backend Tech: ${backend}
Database: ${database}
Third-Party Integrations: ${integrationsStr}
Monetization: ${data.monetizationModel || 'Standard'}
Design Aesthetic: ${data.designAesthetic || 'Minimal'}
Color Mood / Primary: ${data.primaryColor || data.colorMood || '#f97316'}
Special Rules & Constraints: ${data.specialRules || 'None specified'}`;

  let lastError: Error | null = null;

  // Try each model sequentially with strict timeout ceiling to stay well under AppSail 25s limit
  for (const model of NARA_MODELS) {
    try {
      console.log(`[Nara Router] Attempting generation with live model: ${model}`);

      const controller = new AbortController();
      // Strict 16s timeout per model ensures response always returns before AppSail's 25-30s gateway timeout
      const timeoutId = setTimeout(() => controller.abort(), 16000);

      const response = await fetch(`${NARA_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${NARA_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          max_tokens: 2200,
          temperature: 0.2,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[Nara Router] Model ${model} returned HTTP ${response.status}: ${errorText.substring(0, 100)}`);
        continue; // Try next model
      }

      const result = await response.json();
      const rawContent = result.choices?.[0]?.message?.content;

      if (!rawContent) {
        console.warn(`[Nara Router] Model ${model} returned empty choices payload`);
        continue;
      }

      const parsed = extractSectionsFromResponse(rawContent);

      if (!parsed || !parsed.overview || !parsed.features || !parsed.uiux || !parsed.technical) {
        console.warn(`[Nara Router] Model ${model} returned content missing required sections`);
        continue;
      }

      console.log(`[Nara Router] Successfully generated PRD package with model: ${model}`);

      return {
        success: true,
        modelUsed: model,
        projectName,
        isFallback: false,
        sections: [
          {
            id: 'overview',
            title: 'Product Overview',
            filename: '01-PRODUCT-OVERVIEW.md',
            content: cleanSectionContent(parsed.overview),
          },
          {
            id: 'features',
            title: 'Features & Requirements',
            filename: '02-FEATURES-REQUIREMENTS.md',
            content: cleanSectionContent(parsed.features),
          },
          {
            id: 'uiux',
            title: 'UI/UX Requirements',
            filename: '03-UI-UX-REQUIREMENTS.md',
            content: cleanSectionContent(parsed.uiux),
          },
          {
            id: 'technical',
            title: 'Technical Requirements',
            filename: '04-TECHNICAL-REQUIREMENTS.md',
            content: cleanSectionContent(parsed.technical),
          },
        ],
      };
    } catch (err: any) {
      console.warn(`[Nara Router] Failure with model ${model}:`, err.message);
      lastError = err;
      // Continue to next model
    }
  }

  // Graceful fallback: If Nara models timed out or failed, return local high-fidelity synthesis
  // immediately so the HTTP response is 200 OK within 17 seconds, preventing 408 & 524 timeouts.
  console.warn(`[Nara Router] AI model failed or timed out (${lastError?.message || 'timeout'}). Returning high-fidelity local synthesis.`);
  return buildLocalFallback(data, projectName);
}
