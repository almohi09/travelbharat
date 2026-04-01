import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      setUser: (user) =>
        set({
          user,
          error: null,
        }),

      setToken: (token) =>
        set({
          token,
        }),

      setLoading: (loading) =>
        set({
          loading,
        }),

      setError: (error) =>
        set({
          error,
        }),

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          // This will be called by the auth service
          set({ loading: false });
        } catch (error) {
          set({
            loading: false,
            error: error.message,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          error: null,
        });
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          // This will be called by the auth service
          set({ loading: false });
        } catch (error) {
          set({
            loading: false,
            error: error.message,
          });
          throw error;
        }
      },

      isAuthenticated: () => {
        return get().user !== null && get().token !== null;
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin' || user?.isAdmin === true;
      },

      clearError: () =>
        set({
          error: null,
        }),
    }),
    {
      name: 'auth-store',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
