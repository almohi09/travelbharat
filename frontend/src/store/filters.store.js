import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFilterStore = create(
  persist(
    (set) => ({
      filters: {
        search: '',
        state: '',
        city: '',
        category: '',
        featured: false,
        sort: 'popular',
      },

      setFilter: (filterName, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [filterName]: value,
          },
        })),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
          },
        })),

      resetFilters: () =>
        set({
          filters: {
            search: '',
            state: '',
            city: '',
            category: '',
            featured: false,
            sort: 'popular',
          },
        }),

      clearSearch: () =>
        set((state) => ({
          filters: {
            ...state.filters,
            search: '',
          },
        })),

      getFilterQueryParams: () => {
        return (get) => {
          const { filters } = get();
          const params = new URLSearchParams();

          if (filters.search) params.append('search', filters.search);
          if (filters.state) params.append('state', filters.state);
          if (filters.city) params.append('city', filters.city);
          if (filters.category) params.append('category', filters.category);
          if (filters.featured) params.append('featured', 'true');
          if (filters.sort) params.append('sort', filters.sort);

          return params.toString();
        };
      },
    }),
    {
      name: 'filter-store',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
);
