import { PRDProject } from '@/store/prd-store';
import { cleanSectionContent } from '@/lib/nara-client';

export async function createPRDZipPackage(project: PRDProject): Promise<Blob> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  const projectName = project.title.replace(/[^\w\s-]/gi, '').trim() || 'Product-PRD';
  const folderName = `${projectName.toLowerCase().replace(/\s+/g, '-')}-prd-package`;
  const folder = zip.folder(folderName) || zip;

  // Add individual modular markdown files
  project.sections.forEach((sec) => {
    const filename = sec.filename || `${sec.title.toLowerCase().replace(/[^\w]/g, '-')}.md`;
    folder.file(filename, cleanSectionContent(sec.content));
  });

  // Add consolidated master PRD
  const consolidatedContent = `# ${project.title} — Master Product Requirements Document

> **Target Platform**: ${project.input.platform || 'Web' }  
> **Tech Stack**: ${project.input.stack?.frontend || 'React'} + ${project.input.stack?.backend || 'Node.js'} + ${project.input.stack?.database || 'SQL'}  
> **Visual Style**: ${project.input.designStyle || 'Minimal'}  
> **Typography**: ${project.input.font || 'Poppins'}  
> **Generated**: ${new Date(project.createdAt).toLocaleDateString()}  

---

${project.sections.map((s) => cleanSectionContent(s.content)).join('\n\n---\n\n')}
`;
  folder.file('PRD.md', consolidatedContent);

  // Add README with instructions for AI Coding Agents
  const readmeContent = `# ${project.title} — AI PRD Package

Welcome to your developer-ready, 4-file Product Requirements Document package. This structure is specifically optimized for human engineering teams and AI coding agents (Claude Code, Cursor, Copilot, Windsurf).

---

## Package Contents

| File | Purpose |
| :--- | :--- |
| **\`01-PRODUCT-OVERVIEW.md\`** | Executive summary, problem statement, personas, and success metrics. |
| **\`02-FEATURES-REQUIREMENTS.md\`** | Feature matrix (MVP vs Phase 2), user stories with Given-When-Then acceptance criteria, edge cases. |
| **\`03-UI-UX-REQUIREMENTS.md\`** | Design system specifications, design tokens, color palette hex codes, typography hierarchy, screen flows. |
| **\`04-TECHNICAL-REQUIREMENTS.md\`** | Architecture blueprint, API endpoints, database schemas, security, and deployment strategy. |
| **\`PRD.md\`** | Master consolidated document containing all 4 sections in a single file. |

---

## How to Use with AI Coding Agents

### 1. Using with Claude Code (Terminal CLI)
Drop these files into your repository's root or \`docs/\` directory. Run:
\`\`\`bash
# Initialize project scaffolding
claude "Read 01-PRODUCT-OVERVIEW.md and 04-TECHNICAL-REQUIREMENTS.md to set up the repository architecture and tech stack."

# Implement features sequentially
claude "Review 02-FEATURES-REQUIREMENTS.md and implement Story 1 with full unit test coverage."
\`\`\`

### 2. Using with Cursor / Composer
Reference the specific requirement file directly into your Composer prompt (\`Ctrl/Cmd + I\`):
\`\`\`
@04-TECHNICAL-REQUIREMENTS.md @02-FEATURES-REQUIREMENTS.md 
Please scaffold the database schema and API endpoints defined for the project.
\`\`\`

### 3. Using with GitHub Copilot & Windsurf
Open the relevant \`.md\` file in your split editor pane to provide active context memory to the language model while you code.

---

## Architecture Metadata
- **Platform**: \`${project.input.platform || 'website'}\`
- **Frontend**: \`${project.input.stack?.frontend || 'Next.js'}\`
- **Backend**: \`${project.input.stack?.backend || 'Node.js'}\`
- **Database**: \`${project.input.stack?.database || 'PostgreSQL'}\`
- **Design System Style**: \`${project.input.designStyle || 'Minimal'}\`
- **Theme Mode**: \`${project.input.theme || 'both'}\`
- **Primary Typography**: \`${project.input.font || 'Poppins'}\`
- **Primary Color**: \`${project.input.colors?.primary || '#3B82F6'}\`
`;
  folder.file('README.md', readmeContent);

  return await zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

