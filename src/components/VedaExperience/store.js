import { create } from 'zustand';

export const useVedaStore = create((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
