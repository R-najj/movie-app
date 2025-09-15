import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PrefsStore {
  // Filters
  q: string;
  setSearch: (q: string) => void;

  // Favorites
  favorites: number[];
  toggleFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const usePrefsStore = create<PrefsStore>()(
  persist(
    (set, get) => ({
      // Filters
      q: "",
      setSearch: (q) => set({ q }),

      // Favorites
      favorites: [],
      toggleFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.includes(movieId)
            ? state.favorites.filter((id) => id !== movieId)
            : [...state.favorites, movieId],
        })),
      isFavorite: (movieId) => get().favorites.includes(movieId),
    }),
    {
      name: "prefs-storage",
    }
  )
);
