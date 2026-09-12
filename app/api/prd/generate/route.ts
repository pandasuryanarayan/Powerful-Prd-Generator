import { NextRequest, NextResponse } from 'next/server';
import { generatePRDSections, PRDGenerationInput } from '@/lib/prd-generator';

export async function POST(request: NextRequest) {
  try {
    const body: PRDGenerationInput = await request.json();
    const { idea = '' } = body;

    if (!idea.trim()) {
      return NextResponse.json({ error: 'Product description is required' }, { status: 400 });
    }

    const projectName =
      idea.split('\n')[0].replace(/[#*]/g, '').trim().substring(0, 45) || 'Product Specification';

    // Try AI Provider if key exists
    const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        const platformName = body.platform === 'custom' && body.customPlatform ? body.customPlatform : (body.platform || 'Website');
        const systemPrompt = `You are a Principal Product Architect and Staff Systems Engineer.
Generate an implementation-ready, developer-focused 4-file Product Requirements Document (PRD) package.
Your output must be returned strictly as a valid JSON object matching this schema:
{
  "overview": "Markdown content for 01-PRODUCT-OVERVIEW.md",
  "features": "Markdown content for 02-FEATURES-REQUIREMENTS.md",
  "uiux": "Markdown content for 03-UI-UX-REQUIREMENTS.md",
  "technical": "Markdown content for 04-TECHNICAL-REQUIREMENTS.md"
}

Format rules:
1. "overview": Executive Summary, Problem Statement, Target Personas, Core Value Proposition, Success Metrics & KPIs.
2. "features": MVP Feature Scope vs Phase 2, Detailed User Stories with Gherkin Given-When-Then Acceptance Criteria, Functional Workflows, Edge Cases & Error States.
3. "uiux": Visual Design System for "${body.designStyle || 'Minimal'}" style, Theme "${body.theme || 'both'}", Color Tokens (${JSON.stringify(body.colors || {})}), Typography "${body.font || 'Poppins'}", Component Specs, Navigation & Screen Hierarchy.
4. "technical": Architecture Blueprint for ${platformName} using ${body.stack?.frontend || 'Next.js'} + ${body.stack?.backend || 'Node.js'} + ${body.stack?.database || 'PostgreSQL'}, API Endpoints & Request/Response JSON, Database Models/Entity Relationship, Security & Auth, Deployment Strategy.`;

        const userPrompt = `Project: ${projectName}
Domain Category: ${body.category || 'General'}
Platform: ${platformName}
Tech Stack: Frontend: ${body.stack?.frontend}, Backend: ${body.stack?.backend}, Database: ${body.stack?.database}
Design Style: ${body.designStyle}
Theme: ${body.theme}
Font: ${body.font}
Color Palette: ${JSON.stringify(body.colors)}
Core Entities: ${body.targetEntities?.join(', ') || 'Auto-detect'}
Key Features & Mechanics: ${body.keyFeatures?.join(', ') || 'Auto-detect'}
Target User Roles: ${body.userRoles?.join(', ') || 'Auto-detect'}
Product Description: ${idea}
${body.guidingNotes ? `Guiding Notes: ${body.guidingNotes}` : ''}
${body.regenChanges ? `Revision Requested: ${body.regenChanges}` : ''}`;

        const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: process.env.AI_MODEL || 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.3,
          }),
        });

        if (aiResponse.ok) {
          const result = await aiResponse.json();
          const parsed = JSON.parse(result.choices[0].message.content);

          return NextResponse.json({
            success: true,
            projectName,
            sections: [
              { id: 'overview', title: 'Product Overview', filename: '01-PRODUCT-OVERVIEW.md', content: parsed.overview },
              { id: 'features', title: 'Features & Requirements', filename: '02-FEATURES-REQUIREMENTS.md', content: parsed.features },
              { id: 'uiux', title: 'UI/UX Requirements', filename: '03-UI-UX-REQUIREMENTS.md', content: parsed.uiux },
              { id: 'technical', title: 'Technical Requirements', filename: '04-TECHNICAL-REQUIREMENTS.md', content: parsed.technical },
            ],
          });
        }
      } catch (err) {
        console.warn('AI API call failed, falling back to built-in generator:', err);
      }
    }

    // High-fidelity structured fallback generation
    const fallbackOutput = generatePRDSections(body);

    return NextResponse.json({
      success: true,
      projectName: fallbackOutput.projectName,
      sections: fallbackOutput.sections,
    });
  } catch (error: any) {
    console.error('Error generating PRD:', error);
    return NextResponse.json(
      { error: 'Failed to generate PRD', details: error.message },
      { status: 500 }
    );
  }
}