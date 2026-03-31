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
  isLoading: boolean;
  error: string | null;
  
  setUser: (user: User | null) => void;
  fetchProfile: (email: string) => Promise<void>;
  updateProfile: (data: { name?: string; avatar?: string }) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),

      fetchProfile: async (email) => {
        set({ isLoading: true });
        try {
          const profile = await api.users.get(email);
          set({ user: profile, isLoading: false, error: null });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      updateProfile: async (data) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({ isLoading: true });
        try {
          const updated = await api.users.upsert({
            email: currentUser.email,
            ...data,
          });
          set({ user: updated, isLoading: false, error: null });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      logout: () => set({ user: null, error: null }),
    }),
    { name: 'delivery-delight-user' }
  )
);
