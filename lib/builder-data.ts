export interface PlatformOption {
  id: 'website' | 'mobile' | 'desktop' | 'custom';
  label: string;
  description: string;
  iconName: string;
}

export const PLATFORMS: PlatformOption[] = [
  { id: 'website', label: 'Website / Web App', description: 'Responsive web apps, SaaS platforms, portals', iconName: 'Globe' },
  { id: 'mobile', label: 'Mobile App', description: 'iOS & Android native or cross-platform apps', iconName: 'Smartphone' },
  { id: 'desktop', label: 'Desktop App', description: 'Cross-platform native or hybrid desktop tools', iconName: 'Monitor' },
  { id: 'custom', label: 'Custom Platform', description: 'Browser extension, CLI, embedded, or multi-platform', iconName: 'Layers' },
];

export interface RecommendedStack {
  frontend: string;
  backend: string;
  database?: string;
  label: string;
  desc: string;
}

export const RECOMMENDED_STACKS: Record<string, RecommendedStack> = {
  website: {
    frontend: 'Next.js',
    backend: 'Node.js',
    database: 'PostgreSQL',
    label: 'Next.js + Node.js + PostgreSQL',
    desc: 'Modern, high-performance full-stack web stack',
  },
  mobile: {
    frontend: 'Flutter',
    backend: 'Firebase',
    label: 'Flutter + Firebase',
    desc: 'Cross-platform mobile with real-time sync & auth',
  },
  desktop: {
    frontend: 'Electron + React',
    backend: 'SQLite (local)',
    label: 'Electron + React + SQLite',
    desc: 'Versatile desktop app with robust offline storage',
  },
  custom: {
    frontend: 'React',
    backend: 'Node.js',
    database: 'PostgreSQL',
    label: 'React + Node.js + PostgreSQL',
    desc: 'Modular and extensible foundation',
  },
};

export const TECH_OPTIONS = {
  website: {
    frontend: ['React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'HTML/CSS/JS', 'PHP + HTML', 'WordPress', 'Other'],
    backend: ['Node.js', 'Python (Django/Flask)', 'Firebase Functions', 'Supabase', 'PHP', 'Ruby on Rails', 'Go', 'Other'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL/SQL', 'Firestore', 'Supabase', 'SQLite', 'Redis', 'Other'],
  },
  mobile: {
    frontend: ['Flutter', 'React Native', 'iOS Native (Swift)', 'Android Native (Kotlin)', 'Other'],
    backend: ['Firebase', 'Supabase', 'Node.js + SQL', 'PHP + SQL', 'Other'],
    database: ['Firestore', 'SQLite (local)', 'Supabase', 'PostgreSQL', 'Other'],
  },
  desktop: {
    frontend: ['Electron + React', 'Tauri', 'Flutter Desktop', '.NET MAUI', 'Java (JavaFX)', 'Other'],
    backend: ['Firebase', 'SQLite (local)', 'Node.js + SQL', 'C++ / Rust Native', 'Other'],
    database: ['SQLite (local)', 'Firestore', 'PostgreSQL', 'IndexedDB', 'Other'],
  },
  custom: {
    frontend: ['React', 'Next.js', 'Vue', 'Flutter', 'Other'],
    backend: ['Node.js', 'Python', 'Go', 'Supabase', 'Other'],
    database: ['PostgreSQL', 'MongoDB', 'SQLite', 'Firestore', 'Other'],
  },
};

export const DESIGN_STYLES = [
  { id: 'Minimal', label: 'Minimal', desc: 'Clean, airy, ample whitespace, high typography focus' },
  { id: 'Gradient', label: 'Gradient', desc: 'Vibrant color flows, modern startup aesthetic' },
  { id: 'Glassmorphism', label: 'Glassmorphism', desc: 'Translucent frosted glass layers with soft borders' },
  { id: 'Neumorphism', label: 'Neumorphism', desc: 'Soft dual-shadow extruded tactile surface feel' },
  { id: 'Corporate', label: 'Corporate', desc: 'Structured, trustworthy, refined enterprise look' },
  { id: 'Playful', label: 'Playful', desc: 'Rounded pills, friendly shapes, vibrant joyful accents' },
  { id: 'Dark-Tech', label: 'Dark-Tech', desc: 'Cyber dark backdrops with vivid neon highlights' },
  { id: 'Retro', label: 'Retro', desc: 'Vintage warm tones, nostalgic editorial vibe' },
  { id: 'Brutalist', label: 'Brutalist', desc: 'Bold high-contrast borders, solid shadows, raw vibe' },
  { id: 'Material', label: 'Material', desc: 'Layered elevations, responsive ripples, tactile paper cards' },
  { id: 'Flat', label: 'Flat', desc: 'Pure geometric solids, crisp edges, distraction-free' },
  { id: 'Custom', label: 'Custom', desc: 'Specify custom art direction and aesthetics' },
];

export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export const PRESET_PALETTES: ColorPalette[] = [
  { name: 'Tailwind Blue', primary: '#3B82F6', secondary: '#64748B', accent: '#06B6D4', background: '#0F172A', surface: '#1E293B', text: '#F8FAFC' },
  { name: 'Spotify Dark', primary: '#1DB954', secondary: '#535353', accent: '#1ED760', background: '#191414', surface: '#282828', text: '#FFFFFF' },
  { name: 'Stripe Indigo', primary: '#635BFF', secondary: '#0A2540', accent: '#00D4AA', background: '#F6F9FC', surface: '#FFFFFF', text: '#0A2540' },
  { name: 'Vercel Black', primary: '#0070F3', secondary: '#71717A', accent: '#00D4AA', background: '#000000', surface: '#111111', text: '#EDEDED' },
  { name: 'Linear Purple', primary: '#5E6AD2', secondary: '#1B1B1B', accent: '#F2C94C', background: '#18181B', surface: '#27272A', text: '#FAFAFA' },
  { name: 'Notion Gray', primary: '#2EAADC', secondary: '#9B9A97', accent: '#DDBA4B', background: '#FFFFFF', surface: '#F7F6F3', text: '#37352F' },
  { name: 'GitHub Dark', primary: '#58A6FF', secondary: '#8B949E', accent: '#3FB950', background: '#0D1117', surface: '#161B22', text: '#C9D1D9' },
  { name: 'Figma Rainbow', primary: '#0ACF83', secondary: '#A259FF', accent: '#F24E1E', background: '#2C2C2C', surface: '#3C3C3C', text: '#FFFFFF' },
  { name: 'Supabase Green', primary: '#3ECF8E', secondary: '#8B8B8B', accent: '#1C1C1C', background: '#1C1C1C', surface: '#2A2A2A', text: '#ECECEC' },
  { name: 'Slack Green', primary: '#2EB67D', secondary: '#611F69', accent: '#ECB22E', background: '#FFFFFF', surface: '#F8F8F8', text: '#1D1C1D' },
  { name: 'Discord Blue', primary: '#5865F2', secondary: '#99AAB5', accent: '#EB459E', background: '#23272A', surface: '#2C2F33', text: '#FFFFFF' },
  { name: 'Netflix Red', primary: '#E50914', secondary: '#808080', accent: '#B81D24', background: '#141414', surface: '#1F1F1F', text: '#FFFFFF' },
  { name: 'Instagram Pink', primary: '#E1306C', secondary: '#8E8E8E', accent: '#F77737', background: '#FAFAFA', surface: '#FFFFFF', text: '#262626' },
  { name: 'Twitter Blue', primary: '#1DA1F2', secondary: '#8899A6', accent: '#17BF63', background: '#15202B', surface: '#192734', text: '#FFFFFF' },
  { name: 'YouTube Red', primary: '#FF0000', secondary: '#AAAAAA', accent: '#FF4E45', background: '#0F0F0F', surface: '#212121', text: '#F1F1F1' },
  { name: 'Framer Blue', primary: '#0055FF', secondary: '#666666', accent: '#BB44FF', background: '#111111', surface: '#1A1A1A', text: '#F5F5F5' },
  { name: 'Clerk Purple', primary: '#6C47FF', secondary: '#6C6C8A', accent: '#FF6B6B', background: '#1A1A2E', surface: '#22223A', text: '#E8E8F0' },
  { name: 'Shadcn Dark', primary: '#3B82F6', secondary: '#A1A1AA', accent: '#F97316', background: '#0A0A0A', surface: '#171717', text: '#FAFAFA' },
];

export interface GradientOption {
  name: string;
  start: string;
  end: string;
  background: string;
  surface: string;
  text: string;
}

export const GRADIENT_PALETTES: GradientOption[] = [
  { name: 'Sunset', start: '#F97316', end: '#EC4899', background: '#FFF7ED', surface: '#FFFFFF', text: '#1C1917' },
  { name: 'Ocean', start: '#0EA5E9', end: '#14B8A6', background: '#F0F9FF', surface: '#FFFFFF', text: '#0C4A6E' },
  { name: 'Purple Dream', start: '#8B5CF6', end: '#D946EF', background: '#FAF5FF', surface: '#FFFFFF', text: '#3B0764' },
  { name: 'Mint Fresh', start: '#22C55E', end: '#14B8A6', background: '#F0FDF4', surface: '#FFFFFF', text: '#052E16' },
];

export const COLOR_KEYS: { key: keyof ColorPalette; label: string; desc: string }[] = [
  { key: 'primary', label: 'Primary', desc: 'Main brand color, primary buttons, accents' },
  { key: 'secondary', label: 'Secondary', desc: 'Secondary elements, subheadings, muted borders' },
  { key: 'accent', label: 'Accent', desc: 'Interactive highlights, badges, key CTAs' },
  { key: 'background', label: 'Background', desc: 'Application foundation & canvas canvas background' },
  { key: 'surface', label: 'Surface', desc: 'Cards, sheets, containers, dialog panels' },
  { key: 'text', label: 'Text', desc: 'Primary typography & high-contrast content' },
];

export const DEFAULT_COLORS: ColorPalette = {
  name: 'Tailwind Blue',
  primary: '#3B82F6',
  secondary: '#64748B',
  accent: '#06B6D4',
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F8FAFC',
};

export interface FontOption {
  name: string;
  family: string;
  category: string;
  description: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { name: 'Poppins', family: "'Poppins', sans-serif", category: 'Geometric Sans', description: 'Friendly, geometric, modern digital products' },
  { name: 'Inter', family: "'Inter', sans-serif", category: 'Clean Sans', description: 'Industry standard for web apps & dashboards' },
  { name: 'DM Sans', family: "'DM Sans', sans-serif", category: 'Modern Sans', description: 'Contemporary, high readability on screens' },
  { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif", category: 'Professional Sans', description: 'Premium modern SaaS & fintech look' },
  { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", category: 'Tech Mono-Sans', description: 'Futuristic, developer-first, web3 aesthetic' },
  { name: 'Sora', family: "'Sora', sans-serif", category: 'Startup Sans', description: 'Dynamic, high-energy tech startup branding' },
  { name: 'Manrope', family: "'Manrope', sans-serif", category: 'Geometric Modern', description: 'Clean neo-grotesque with great legibility' },
  { name: 'Outfit', family: "'Outfit', sans-serif", category: 'Display Sans', description: 'Bold and confident branding presence' },
  { name: 'Lexend', family: "'Lexend', sans-serif", category: 'Readability Sans', description: 'Engineered specifically for peak reading fluency' },
  { name: 'Urbanist', family: "'Urbanist', sans-serif", category: 'Geometric Clean', description: 'Sharp, minimalistic, architectural feel' },
];

export interface GenerationStep {
  id: string;
  label: string;
  description: string;
}

export const GENERATION_STEPS: GenerationStep[] = [
  { id: 'validate', label: 'Validating input parameters', description: 'Checking platform, tech stack & theme options' },
  { id: 'requirements', label: 'Synthesizing product specifications', description: 'Aligning problem scope with business objectives' },
  { id: 'connect', label: 'Connecting to PRD generation engine', description: 'Structuring prompt pipeline for AI coding tools' },
  { id: 'generate', label: 'Generating modular specification files', description: 'Building 4-file developer-ready structure' },
  { id: 'parse', label: 'Parsing feature matrix & acceptance criteria', description: 'Extracting user stories and Given-When-Then rules' },
  { id: 'design_system', label: 'Compiling UI/UX design tokens', description: 'Binding colors, typography & layout principles' },
  { id: 'zip', label: 'Packaging multi-file ZIP archive', description: 'Creating individual Markdown files and master PRD' },
  { id: 'save', label: 'Persisting project to local workspace', description: 'Saving full state and configuration history' },
  { id: 'download', label: 'Preparing package download', description: 'Finalizing developer-ready artifact' },
];

export const PRD_4_SECTIONS = [
  {
    id: 'overview',
    title: 'Product Overview',
    filename: '01-PRODUCT-OVERVIEW.md',
    desc: 'Executive summary, vision, problem statement, goals & KPIs',
  },
  {
    id: 'features',
    title: 'Features & Requirements',
    filename: '02-FEATURES-REQUIREMENTS.md',
    desc: 'MVP feature matrix, user stories with acceptance criteria & edge cases',
  },
  {
    id: 'uiux',
    title: 'UI/UX Requirements',
    filename: '03-UI-UX-REQUIREMENTS.md',
    desc: 'Design system, color tokens, typography & screen flows',
  },
  {
    id: 'technical',
    title: 'Technical Requirements',
    filename: '04-TECHNICAL-REQUIREMENTS.md',
    desc: 'Tech stack, architecture diagram, API specs, schemas & security',
  },
];

export * from './category-data';


