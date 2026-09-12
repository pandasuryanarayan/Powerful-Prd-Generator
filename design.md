# PRD Generator for AI — Design Specification

## 1. Design Direction

The product should feel like a modern AI workspace for thinking and documentation: calm, focused, intelligent, fast, and trustworthy.

The design should communicate:

- **Clarity:** the interface makes complex product thinking feel simple.
- **Confidence:** users can see what the AI knows, inferred, and still needs.
- **Focus:** the UI avoids unnecessary dashboards and decoration.
- **Control:** AI suggestions are visible and reversible.
- **Professionalism:** generated documentation should feel suitable for developers, founders, designers, and stakeholders.

Avoid a generic "AI neon" aesthetic. Do not overuse gradients, glowing borders, floating blobs, or excessive animated effects.

---

## 2. Experience Architecture

The application has five primary experiences:

1. Landing page.
2. Idea and setup flow.
3. AI clarification workspace.
4. Generation progress.
5. PRD editor / viewer.

The transition between these states should feel continuous rather than like separate disconnected pages.

Recommended route structure:

```text
/
/create
/create/questions
/create/generating
/prd/:id
```

For an MVP using local persistence, `:id` can be a local project identifier.

---

## 3. Visual Language

### Overall style

Use a light-first interface with a highly readable content canvas and strong typography hierarchy.

Recommended visual characteristics:

- Warm or neutral page background.
- White or slightly elevated surfaces.
- One strong accent color for primary actions.
- Near-black text.
- Subtle borders.
- Minimal shadows.
- Rounded corners, but avoid making every element pill-shaped.

A dark theme can be supported later or implemented as a parallel token set.

---

## 4. Color System

Use design tokens rather than hardcoded colors throughout the app.

Example semantic tokens:

```css
:root {
  --color-bg: #f7f7f5;
  --color-surface: #ffffff;
  --color-surface-muted: #f1f1ee;
  --color-text: #171717;
  --color-text-muted: #6b6b67;
  --color-border: #deded8;
  --color-border-strong: #c9c9c1;
  --color-primary: #f97316;
  --color-primary-hover: #ea580c;
  --color-primary-soft: #fff1e8;
  --color-success: #16803c;
  --color-warning: #a16207;
  --color-danger: #c2410c;
  --color-info: #2563eb;
}
```

The exact brand color can be changed later without redesigning components.

### Color rules

- Primary color is reserved for important actions and active states.
- Do not use the primary color for large page backgrounds.
- Body text should meet accessible contrast.
- Status should be communicated with icon + text, not color alone.

---

## 5. Typography

Use a modern sans-serif for the UI and documentation, with excellent readability.

Recommended stack:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Scale

```text
Display: 48–64px / 1.05
H1:      36–48px / 1.1
H2:      28–32px / 1.2
H3:      20–24px / 1.25
Body:    16px / 1.55
Small:   14px / 1.45
Caption: 12–13px / 1.4
```

The PRD reading experience should favor a comfortable reading width rather than maximizing line length.

---

## 6. Spacing System

Use a 4px base spacing unit.

```text
4   xs
8   sm
12  md-sm
16  md
20  lg-sm
24  lg
32  xl
40  2xl
48  3xl
64  4xl
80  5xl
```

Use larger spacing between major sections than within a component.

---

## 7. Radius and Elevation

Recommended radii:

```text
Small controls: 8px
Cards:          12–16px
Large panels:   16–20px
Pills/tags:     999px
```

Use shadows sparingly. Borders should carry most of the component separation.

---

## 8. Landing Page

### Header

Desktop navigation:

```text
[Logo]                 How it works   Examples   [Create PRD]
```

Keep the header visually lightweight.

Mobile:

```text
[Logo]                         [Menu]
```

### Hero

The hero should clearly communicate the transformation.

Suggested structure:

```text
Eyebrow
AI PRODUCT SPECIFICATION

Turn your idea into a PRD
AI can actually build from.

Describe what you want to create. Answer a few smart questions.
Get a structured, implementation-ready PRD.

[ Create PRD ]   [ View example ]
```

Under the CTA, add concise trust/value points:

```text
Guided clarification · Structured requirements · Markdown export
```

### Hero input preview

A large example input card can sit below or beside the hero copy.

```text
What are you building?

[ I want to build a ...                              ]

             [ Generate my PRD → ]
```

The visual should make the actual product obvious before the user scrolls.

---

## 9. Example Ideas Section

Use a compact card grid.

Each card contains:

- Category label.
- Idea title.
- One-sentence description.
- `Use idea` action.

Example categories:

```text
SaaS
AI
Mobile
Marketplace
Internal Tools
Consumer
```

Cards should populate the idea input rather than immediately trigger generation.

---

## 10. How It Works Section

Use three or four steps with a visible progression.

```text
01  Describe
    Start with the idea in your own words.

02  Clarify
    AI asks only what it needs to know.

03  Generate
    Produce the structured PRD.

04  Build
    Review, edit, and export.
```

The visual treatment should be editorial and clear, not overly promotional.

---

## 11. Create Flow

### Layout

Use a centered application shell with a maximum content width around 1100–1200px.

Desktop layout:

```text
┌─────────────────────────────────────────────────────────────┐
│ Logo / New PRD                             Save status      │
├───────────────┬─────────────────────────────────────────────┤
│ Step nav      │ Main content                                │
│               │                                             │
│ 01 Idea       │                                             │
│ 02 Clarify    │                                             │
│ 03 Scope      │                                             │
│ 04 Generate   │                                             │
│ 05 Review     │                                             │
└───────────────┴─────────────────────────────────────────────┘
```

The step navigation should indicate:

- Completed.
- Current.
- Upcoming.
- Blocked.

Do not make the user feel trapped in a wizard. Completed steps should be editable.

---

## 12. Idea Input Screen

Primary layout:

```text
Build something new

Tell us what you want to create.
You do not need to write a PRD first.

┌──────────────────────────────────────────────┐
│ I want to build ...                          │
│                                              │
│                                              │
│                                              │
└──────────────────────────────────────────────┘

Product type
[ Web App ▾ ]

Platform
[ Web ] [ Mobile ] [ Both ]

Audience (optional)
[ Who is this for? ]

                    [ Continue → ]
```

The free-form idea field should dominate visually because it is the starting point.

Provide an unobtrusive character count only if there is a meaningful limit.

---

## 13. Clarification Workspace

This screen is the core interaction and should feel conversational without looking like a general chat application.

### Desktop structure

```text
┌───────────────────┬──────────────────────────────────────────┐
│ Context           │ AI question / answer                    │
│                   │                                          │
│ Product           │ Why does this product need to exist?    │
│ Users             │                                          │
│ Features          │ [ Your answer...                      ] │
│ Constraints       │                                          │
│                   │ [ Suggest an answer ] [ Skip ]          │
│ 3 / 8 answered    │                                          │
└───────────────────┴──────────────────────────────────────────┘
```

The AI question should be the dominant element.

### Question types

Use different controls depending on the question:

- Textarea.
- Single select.
- Multi-select.
- Yes/no.
- Number.
- Tags.

Avoid asking users to repeatedly type information that could be selected.

### AI suggestion

The `Suggest an answer` action should produce a clearly labeled draft answer.

The user should explicitly accept it before it becomes part of the confirmed input model.

---

## 14. Clarification Progress

Use a compact progress indicator such as:

```text
3 of 8
██████░░
```

But avoid communicating false precision if the AI dynamically changes the number of questions.

A better dynamic label can be:

```text
Core context captured
```

with a progress bar and optional `3 sections complete` count.

---

## 15. Scope Confirmation Screen

Before generation, present a "What we'll build" summary.

```text
What we'll build

Problem
Students need a simple way to split and settle shared expenses.

Core features
✓ Create a group
✓ Add expenses
✓ Calculate balances
✓ Settle payments

Out of scope
• Bank account integration
• Corporate expense reporting

Assumptions
• Users authenticate with email or social login

Open questions
• Which payment provider should be used?

[ Back ]                  [ Generate PRD → ]
```

This screen is important because it gives the user a final chance to correct scope before the AI generates the detailed document.

---

## 16. Generation Screen

Generation should feel active and informative.

Instead of one spinner, show a section checklist:

```text
Generating your PRD

✓ Product overview
✓ Users & personas
✓ User journeys
● Core features
○ Acceptance criteria
○ Technical considerations
○ Risks & open questions

Analyzing requirements...
```

The active row may use subtle animation.

Do not display fake progress percentages unless they map to actual generation stages.

Provide a cancel action only if the backend supports safe cancellation.

---

## 17. PRD Workspace

This is the most important screen after generation.

### Desktop layout

```text
┌─────────────────────────────────────────────────────────────────┐
│ Project name        Saved                       Copy  Export   │
├─────────────────┬───────────────────────────────────────────────┤
│ CONTENTS        │ # Product Requirements Document             │
│                 │                                               │
│ Overview        │ ## Executive Summary                         │
│ Problem         │ ...                                           │
│ Goals           │                                               │
│ Users           │ ## Problem Statement                         │
│ Features        │ ...                                           │
│ UX              │                                               │
│ Technical       │ ## Core Features                             │
│ Metrics         │ ...                                           │
│ Risks           │                                               │
│                 │                                               │
│                 │                                AI actions    │
└─────────────────┴───────────────────────────────────────────────┘
```

### Left navigation

The table of contents should be sticky on desktop and collapsible on smaller screens.

Selecting a section should scroll to that heading.

The active section should be clearly indicated.

---

## 18. PRD Reading Experience

The document canvas should resemble a professional documentation editor rather than a chat transcript.

Recommended content width:

- Desktop: 720–820px reading column.
- Tablet: 100% with 32px side padding.
- Mobile: 100% with 16–20px side padding.

Use generous vertical spacing between headings.

Tables should scroll horizontally inside their own container on small screens rather than causing the entire page to overflow.

Code blocks should use a distinct surface and include a copy button.

Mermaid or diagram blocks should have a safe fallback to plain text if rendering fails.

---

## 19. Editing Model

The default reading view should be clean.

Editing can happen through either:

- `Edit` mode for the whole document.
- Inline edit for a selected section.

When the user edits a section manually, show a subtle indicator such as:

```text
Edited manually
```

Do not visually punish manual edits.

---

## 20. AI Actions

When a section is selected, show an action menu:

```text
Ask AI
──────────────
Rewrite
Make concise
Add edge cases
Improve acceptance criteria
Expand technical detail
Regenerate section
```

The action menu should appear contextually, not permanently beside every paragraph.

Before a destructive regeneration:

```text
Replace this section?
Your manual edits in this section will be replaced.

[ Cancel ] [ Replace section ]
```

---

## 21. Header Actions

Recommended actions in the PRD workspace:

```text
[ Back ]  Project name     Saved       [ Copy ] [ Export ▾ ]
```

Export menu:

```text
Download Markdown
Copy Markdown
Print / Save PDF
```

Future options can include DOCX and AI-agent packages.

The primary visible action should remain `Export`, not an oversized collection of buttons.

---

## 22. Save States

Show save status in a small, quiet location:

```text
Saved locally
Saving...
Saved just now
Offline — saved locally
```

Never use alarming UI for normal local persistence behavior.

---

## 23. Notifications / Toasts

Use brief toasts for transient actions.

Examples:

```text
Copied to clipboard
Markdown downloaded
Section regenerated
Draft restored
```

Toasts should not contain critical information that disappears before the user can act.

---

## 24. Empty States

### No project

```text
Nothing here yet.
Start with one product idea and we'll build the PRD from there.

[ Create PRD ]
```

### No search results

```text
No matching sections found.
Try a different keyword.
```

### Missing section data

```text
This section needs more information.
[ Ask AI to fill the gap ]
```

---

## 25. Error States

Errors should explain what happened and what the user can do next.

Bad:

```text
Generation failed.
```

Better:

```text
We couldn't finish generating the PRD.
Your answers are safe. You can retry without starting over.

[ Retry ]
```

Technical details should be available behind an optional `Details` disclosure for debugging.

---

## 26. Responsive Breakpoints

Recommended breakpoints:

```text
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Mobile behavior

- Step navigation becomes a compact progress bar.
- Sidebars become drawers.
- Primary actions become full-width where appropriate.
- Header actions collapse into an overflow menu.
- PRD content remains the dominant surface.
- Textareas should grow vertically.
- Avoid fixed-height panels that make mobile editing painful.

---

## 27. Accessibility

### Keyboard

All interactive controls must be reachable with keyboard navigation.

Suggested shortcuts for power users:

```text
Cmd/Ctrl + Enter   Submit answer
Cmd/Ctrl + S       Save draft
Cmd/Ctrl + K       Open AI actions
Cmd/Ctrl + Shift + C Copy PRD
```

Only activate shortcuts when they do not conflict with normal browser/editor behavior.

### Screen readers

- Use semantic heading levels.
- Label form fields.
- Announce generation progress with an appropriate live region.
- Announce successful copy/export actions.

### Focus

Every dialog should return focus to the triggering control when closed.

---

## 28. Motion

Animation should communicate state, not decoration.

Use:

- Subtle fade/slide transitions.
- Progress-state transitions.
- Button loading states.
- Smooth sidebar opening.

Avoid:

- Constant floating animation.
- Excessive parallax.
- Long transitions.
- Decorative animations during writing/editing.

Respect `prefers-reduced-motion`.

---

## 29. Component Inventory

Create reusable components for:

### Global

- `AppHeader`
- `Logo`
- `Button`
- `IconButton`
- `Badge`
- `Tooltip`
- `Toast`
- `Modal`
- `Dropdown`
- `Tabs`

### Form / Creation

- `IdeaInput`
- `ProductTypeSelector`
- `OptionChip`
- `QuestionCard`
- `QuestionProgress`
- `ScopeSummary`
- `AssumptionList`
- `OpenQuestionList`

### Generation

- `GenerationProgress`
- `GenerationStep`
- `GenerationStatus`

### PRD

- `PRDLayout`
- `PRDSidebar`
- `PRDTableOfContents`
- `PRDSection`
- `PRDHeading`
- `PRDParagraph`
- `PRDTable`
- `PRDCodeBlock`
- `PRDCallout`
- `PRDSectionActions`
- `EditSectionDialog`

### Export

- `ExportMenu`
- `CopyButton`
- `DownloadButton`

---

## 30. Button Hierarchy

### Primary

One primary action per major screen.

Examples:

```text
Create PRD
Continue
Generate PRD
Save changes
```

### Secondary

For reversible/supporting actions:

```text
Back
Preview
Suggest answer
```

### Tertiary

For low-emphasis actions:

```text
Skip
Cancel
Learn more
```

### Destructive

Use only for irreversible actions such as deleting a cloud project in a future version.

---

## 31. Form Design Rules

- Labels remain visible.
- Placeholder text does not replace labels.
- Required/optional state is explicit.
- Errors appear near the affected field.
- Preserve entered content when validation fails.
- Avoid giant multi-field forms when the AI can ask adaptively.

Textarea guidance:

- Minimum visual height around 140px for the primary idea field.
- Auto-grow for longer answers.
- Clear focus state.

---

## 32. Markdown Rendering Rules

Render generated Markdown safely.

Support:

- Headings.
- Paragraphs.
- Lists.
- Tables.
- Links.
- Code blocks.
- Blockquotes.
- Task lists.
- Mermaid diagrams where supported.

Sanitize all user/AI-generated HTML before rendering.

Links should open safely and should not permit unsafe protocols.

---

## 33. PRD Status Indicators

Use semantic labels:

```text
Draft
Generating
Ready
Edited
Needs review
```

Use icons + text rather than color-only indicators.

Example:

```text
● Saved locally
✓ Ready
! Needs review
```

---

## 34. Trust & Transparency UI

One of the strongest differentiators should be visible AI transparency.

The generated PRD can show small labels for content origin:

```text
Confirmed by you
AI inferred
Open question
```

These should be subtle and optional so the PRD still reads professionally.

A `Review assumptions` control should open a compact list of inferred decisions.

---

## 35. Landing Page Copy Style

Voice should be:

- Direct.
- Smart.
- Helpful.
- Non-corporate.
- Confident without exaggerated AI claims.

Prefer:

> Turn a rough idea into a build-ready PRD.

Avoid:

> Revolutionize your product development with our next-generation intelligent AI ecosystem.

The product should sound like a practical tool used by builders.

---

## 36. Loading & Streaming Design

When content streams in, avoid layout jumps.

Recommended behavior:

- Reserve space for section headings.
- Fade in completed sections.
- Keep the generated text readable during streaming.
- Allow the user to stop reading without locking the interface.

The UI should never simulate streaming when the backend is not actually streaming.

---

## 37. Performance Requirements

Targets for the frontend:

- Fast initial page render.
- Minimize JavaScript on the landing page.
- Lazy-load heavy PRD rendering features when needed.
- Debounce autosave.
- Avoid re-rendering the entire document after editing one section.

Large PRDs should remain scrollable and editable without obvious lag.

---

## 38. Design Tokens Structure

Keep tokens centralized.

Suggested files:

```text
styles/
  tokens.css
  theme.css
  components.css
```

Or, for a Tailwind-based implementation, map semantic tokens into the Tailwind theme rather than scattering hex values through JSX.

---

## 39. Suggested Page States

### `/`

Landing, examples, explanation, CTA.

### `/create`

Idea entry.

### `/create/questions`

AI clarification.

### `/create/generating`

Generation progress.

### `/prd/:id`

PRD viewer/editor.

### Future

```text
/projects
/projects/:id
/settings
/login
```

---

## 40. Recommended Visual QA Checklist

Before release, verify:

- Primary CTA is obvious above the fold.
- No horizontal scrolling at 320px width.
- Long PRDs remain readable.
- Sidebar does not obscure content.
- Tables scroll independently on mobile.
- Focus states are visible.
- Loading and generation states do not shift layout unexpectedly.
- Error states preserve user content.
- Manual edits are visually distinguishable internally but still look professional in the exported document.
- Exported Markdown has correct heading hierarchy.
- No unsafe HTML is rendered from AI output.

---

## 41. Design North Star

The finished experience should feel like:

> **Notion-level document clarity + a focused AI product interview + a developer-ready specification viewer.**

The UI should make the user feel that the hard part of turning an idea into a precise product definition has been reduced to a guided, understandable process.
