import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      registeredUsers: [],

      register: (userData) => {
        set((state) => ({
          registeredUsers: [...state.registeredUsers, userData],
          user: userData,
        }));
      },

      login: (credentials) => {
        const match = get().registeredUsers.find(
          (u) =>
            u.phone === credentials.phone &&
            u.name.trim().toLowerCase() === credentials.name.trim().toLowerCase()
        );
        if (!match) return false;
        set({ user: match });
        return true;
      },

      logout: () => set({ user: null }),
    }),
    { name: 'addis-eats-auth' }
  )
);