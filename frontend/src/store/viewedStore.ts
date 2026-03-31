import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface ViewedState {
  viewedIds: string[];
  addViewed: (id: string) => void;
  getRecentlyViewed: (products: Product[]) => Product[];
}

export const useViewedStore = create<ViewedState>()(
  persist(
    (set, get) => ({
      viewedIds: [],

      addViewed: (id) =>
        set((state) => {
          const filtered = state.viewedIds.filter((v) => v !== id);
          return { viewedIds: [id, ...filtered].slice(0, 20) };
        }),

      getRecentlyViewed: (products) => {
        const { viewedIds } = get();
        return viewedIds
          .map((id) => products.find((p) => p.id === id))
          .filter(Boolean) as Product[];
      },
    }),
    { name: 'food-delivery-viewed' }
  )
);
