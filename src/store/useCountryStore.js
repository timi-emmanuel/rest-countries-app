import { create } from 'zustand';

export const useCountryStore = create((set) => ({
  countries: [],
  search: '',
  region: '',
  selectedCountry: null,
  theme: 'dark',

  setCountries: (data) => set({ countries: data }),
  setSearch: (search) => set({ search }),
  setRegion: (region) => set({ region }),
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}))

