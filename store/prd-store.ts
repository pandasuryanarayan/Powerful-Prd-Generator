import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_COLORS } from '@/lib/builder-data';
import { cleanSectionContent } from '@/lib/nara-client';

export interface TechStackConfig {
  frontend: string;
  backend: string;
  database: string;
  customFrontend?: string;
  customBackend?: string;
  customDatabase?: string;
}

export interface ColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface ProductInput {
  idea: string;
  productType?: string;
  category?: 'gaming' | 'fintech' | 'ecommerce' | 'saas' | 'ai' | 'social' | 'education' | 'custom' | string;
  subCategory?: string;
  targetEntities?: string[];
  keyFeatures?: string[];
  userRoles?: string[];
  authModel?: string;
  platform?: 'website' | 'mobile' | 'desktop' | 'custom' | string;
  customPlatform?: string;
  stack?: TechStackConfig;
  designStyle?: string;
  customDesignStyle?: string;
  theme?: 'light' | 'dark' | 'both';
  colors?: ColorTokens;
  gradient?: { name?: string; start: string; end: string } | null;
  font?: string;
  customFont?: string;
  guidingNotes?: string;
  regenChanges?: string;
  maturity?: string;
  audience?: string;
  generationMode?: 'local' | 'ai';
  aiModelUsed?: string;
}

export interface PRDSection {
  id: string;
  key?: 'overview' | 'features' | 'uiux' | 'technical' | string;
  title: string;
  filename?: string;
  content: string;
  status: 'generated' | 'edited' | 'regenerated';
  updatedAt: string;
}

export interface PRDProject {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  input: ProductInput;
  sections: PRDSection[];
  status: 'draft' | 'generating' | 'ready' | 'error';
}

interface PRDStore {
  projects: PRDProject[];
  currentProjectId: string | null;

  createProject: (input: ProductInput) => PRDProject;
  getProject: (id: string) => PRDProject | undefined;
  updateProject: (id: string, updates: Partial<PRDProject>) => void;
  setCurrentProject: (id: string | null) => void;
  setSections: (id: string, sections: PRDSection[]) => void;
  setStatus: (id: string, status: PRDProject['status']) => void;
  exportProject: (id: string) => string;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const usePRDStore = create<PRDStore>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,

      createProject: (input) => {
        const now = new Date().toISOString();
        const initialTitle = input.idea.trim()
          ? input.idea.substring(0, 50) + (input.idea.length > 50 ? '...' : '')
          : (input.productType || 'New PRD Project');

        const project: PRDProject = {
          id: generateId(),
          title: initialTitle,
          createdAt: now,
          updatedAt: now,
          input: {
            ...input,
            platform: input.platform || 'website',
            colors: input.colors || { ...DEFAULT_COLORS },
            font: input.font || 'Poppins',
            theme: input.theme || 'both',
            designStyle: input.designStyle || 'Minimal',
          },
          sections: [],
          status: 'draft',
        };
        set((state) => ({
          projects: [...state.projects, project],
          currentProjectId: project.id,
        }));
        return project;
      },

      getProject: (id) => get().projects.find((p) => p.id === id),

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      setCurrentProject: (id) => set({ currentProjectId: id }),

      setSections: (id, sections) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, sections, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      setStatus: (id, status) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      exportProject: (id) => {
        const project = get().getProject(id);
        if (!project) return '';
        const sections = project.sections
          .map((s) => `## ${s.title}\n\n${cleanSectionContent(s.content)}`)
          .join('\n\n---\n\n');
        return `# ${project.title}\n\n${sections}`;
      },
    }),
    {
      name: 'prd-generator-storage',
    }
  )
);