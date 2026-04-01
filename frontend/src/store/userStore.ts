import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/api/client';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  setAuth: (user: User | null, token: string | null) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: { name?: string; avatar?: string }) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setAuth: (user, token) => set({ user, token }),

      fetchProfile: async () => {
        if (!get().token) return;
        set({ isLoading: true });
        try {
          const profile = await api.users.getProfile();
          set({ user: profile, isLoading: false, error: null });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          if (err.status === 401) get().logout();
        }
      },

      updateProfile: async (data) => {
        if (!get().token) return;

        set({ isLoading: true });
        try {
          const updated = await api.users.updateProfile(data);
          set({ user: updated, isLoading: false, error: null });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      logout: () => set({ user: null, token: null, error: null }),
    }),
    { name: 'delivery-delight-user' }
  )
);
