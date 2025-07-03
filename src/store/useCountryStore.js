import { create } from 'zustand';

export const useCountryStore = create((set) => ({
  countries: [],
  search: '',
  region: '',
  searchBy: 'name',
  selectedCountry: null,
  theme: 'dark',

  setCountries: (data) => set({ countries: data }),
  setSearch: (search) => set({ search }),
  setRegion: (region) => set({ region }),
  setSearchBy: (field) => set({ searchBy: field }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}))

