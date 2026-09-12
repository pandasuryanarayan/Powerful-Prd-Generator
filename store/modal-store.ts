import { create } from 'zustand';

interface CreateModalStore {
  isOpen: boolean;
  prefillIdea?: string;
  openCreateModal: (prefillIdea?: string) => void;
  closeCreateModal: () => void;
}

export const useCreateModalStore = create<CreateModalStore>((set) => ({
  isOpen: false,
  prefillIdea: undefined,
  openCreateModal: (prefillIdea) => set({ isOpen: true, prefillIdea }),
  closeCreateModal: () => set({ isOpen: false, prefillIdea: undefined }),
}));

