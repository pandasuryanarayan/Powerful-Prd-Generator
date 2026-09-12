# PRD Generator for AI

Turn a rough product idea into a structured, implementation-ready Product Requirements Document.

## Features

- **Guided clarification** — Adaptive AI questioning that asks only what it needs to know.
- **Structured PRD generation** — Output follows a canonical schema with executive summary, problem statement, personas, user journeys, features, user stories, acceptance criteria, edge cases, technical considerations, risks, and more.
- **Editable workspace** — Inline editing with AI rewrite actions (rewrite, expand, make concise, regenerate).
- **Markdown export** — Download the PRD as `.md` or copy to clipboard.
- **Local persistence** — Drafts auto-saved in localStorage for unauthenticated use.
- **Accessibility** — Keyboard navigable, focus-visible, semantic HTML, WCAG-friendly contrast.
- **Responsive** — Works on desktop, tablet, and mobile.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design tokens
- **State:** Zustand (with persistence)
- **Markdown:** react-markdown + remark-gfm
- **Icons:** lucide-react

## Project Structure

```
.
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout with providers
│   ├── globals.css            # Tailwind + design tokens
│   ├── page.tsx               # Landing page
│   ├── create/                # Create flow
│   │   ├── page.tsx           # Idea input
│   │   ├── questions/         # AI clarification
│   │   └── generating/        # Generation progress
│   └── prd/[id]/              # PRD workspace
├── components/                # React components
│   ├── AppShell.tsx           # Layout wrapper
│   ├── Header.tsx             # Top navigation
│   ├── MarkdownRenderer.tsx   # Sanitized MD renderer
│   ├── ToastProvider.tsx      # Toast container
│   └── ui/                    # Reusable UI primitives
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── Toast.tsx
├── store/                     # State management
│   ├── prd-store.ts           # PRD project state
│   ├── toast-store.ts         # Toast notifications
│   └── index.ts               # Store exports
├── design.md                  # Design specification
├── prd.md                     # Product requirements
├── tailwind.config.js         # Tailwind config with tokens
├── postcss.config.js
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Setup

```bash
# Install dependencies
npm install

# Set up environment variables (optional, for AI features)
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Run production server
- `npm run lint` — Run ESLint
- `npm run typecheck` — TypeScript validation

## Design System

The design follows a calm, focused, professional aesthetic with:

- **Colors:** Warm neutral background (`#f7f7f5`), white surfaces, orange accent (`#f97316`)
- **Typography:** Inter font stack, clear hierarchy
- **Spacing:** 4px base unit system
- **Components:** Border-focused separation, minimal shadows, rounded corners

See `design.md` for the full design specification.

## MVP Features

1. Landing page with hero, examples, and how-it-works
2. Idea input with optional product type/platform/audience
3. AI clarification with adaptive questions, suggestions, and skip
4. Generation progress with section-by-section visualization
5. PRD workspace with table of contents, markdown rendering, AI actions
6. Copy to clipboard and Markdown download
7. LocalStorage persistence for drafts
8. Nararouter AI used

## License

MIT