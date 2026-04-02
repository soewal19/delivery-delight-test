import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/api/client';
import type { Product } from '@/types';

interface FavoriteState {
  favorites: Product[];
  isLoading: boolean;
  error: string | null;

  fetchFavorites: () => Promise<void>;
  toggleFavorite: (product: Product) => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isLoading: false,
      error: null,

      fetchFavorites: async () => {
        set({ isLoading: true });
        try {
          const favorites = await api.favorites.list();
          set({ favorites, isLoading: false, error: null });
        } catch (err: any) {
          console.error('Failed to fetch favorites:', err);
          set({ isLoading: false });
        }
      },

      toggleFavorite: async (product) => {
        const isFav = get().isFavorite(product.id);
        
        // Optimistic update
        set((state) => ({
          favorites: isFav
            ? state.favorites.filter((p) => p.id !== product.id)
            : [...state.favorites, product],
        }));

        try {
          await api.favorites.toggle(product.id);
        } catch (err) {
          console.error('Failed to toggle favorite:', err);
          // Rollback on error
          set((state) => ({
            favorites: isFav
              ? [...state.favorites, product]
              : state.favorites.filter((p) => p.id !== product.id),
          }));
        }
      },

      isFavorite: (productId) => {
        return get().favorites.some((p) => p.id === productId);
      },
    }),
    { name: 'food-delivery-favorites' }
  )
);
