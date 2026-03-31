import { create } from 'zustand';
import { api } from '@/api/client';
import type { Product, Shop, SortOption } from '@/types';

interface ShopState {
  shops: Shop[];
  products: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  selectedShopId: string | null;
  selectedCategories: string[];
  sortOption: SortOption;
  ratingFilter: [number, number];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;

  fetchShops: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  setSelectedShop: (id: string | null) => void;
  toggleCategory: (category: string) => void;
  clearCategories: () => void;
  setSortOption: (option: SortOption) => void;
  setRatingFilter: (range: [number, number]) => void;
  setCurrentPage: (page: number) => void;
  getFilteredShops: () => Shop[];
}

export const useShopStore = create<ShopState>()((set, get) => ({
  shops: [],
  products: [],
  categories: [],
  isLoading: false,
  error: null,
  selectedShopId: null,
  selectedCategories: [],
  sortOption: 'rating-desc',
  ratingFilter: [1, 5],
  currentPage: 1,
  itemsPerPage: 6,
  totalItems: 0,
  totalPages: 0,

  fetchShops: async () => {
    set({ isLoading: true });
    try {
      const shops = await api.shops.list();
      set({ shops, isLoading: false, error: null });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchProducts: async () => {
    const { currentPage, itemsPerPage, selectedShopId, sortOption } = get();
    const [sortBy, sortOrder] = sortOption.split('-') as [string, 'asc' | 'desc'];

    set({ isLoading: true });
    try {
      const data = await api.products.list({
        page: currentPage,
        limit: itemsPerPage,
        shopId: selectedShopId || undefined,
        sortBy,
        sortOrder,
      });
      
      const categories = Array.from(new Set(data.items.map(p => p.category)));
      set({ 
        products: data.items, 
        totalItems: data.total, 
        totalPages: data.totalPages, 
        categories,
        isLoading: false, 
        error: null 
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  setSelectedShop: (id) => {
    set({ selectedShopId: id, currentPage: 1 });
    get().fetchProducts();
  },

  toggleCategory: (category) => {
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
      currentPage: 1,
    }));
    get().fetchProducts();
  },

  clearCategories: () => {
    set({ selectedCategories: [], currentPage: 1 });
    get().fetchProducts();
  },

  setSortOption: (option) => {
    set({ sortOption: option, currentPage: 1 });
    get().fetchProducts();
  },

  setRatingFilter: (range) => {
    set({ ratingFilter: range, currentPage: 1 });
    get().fetchShops();
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    get().fetchProducts();
  },

  getFilteredShops: () => {
    const { shops, ratingFilter } = get();
    return shops.filter((s) => s.rating >= ratingFilter[0] && s.rating <= ratingFilter[1]);
  },
}));
