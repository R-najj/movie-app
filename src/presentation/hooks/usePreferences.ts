"use client";

import { useCallback, useState, useEffect } from "react";
import { usePrefsStore } from "@/stores/prefs";

/**
 * hook to manage movie favorites
 */
export function useFavorites() {
  const {
    favorites,
    toggleFavorite: storeToggleFavorite,
    isFavorite: storeIsFavorite,
  } = usePrefsStore();
  const [mounted, setMounted] = useState(false);

  // Track mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isFavorite = useCallback(
    (movieId: number): boolean => {
      if (!mounted) return false;
      return storeIsFavorite(movieId);
    },
    [storeIsFavorite, mounted]
  );

  const toggleFavorite = useCallback(
    (movieId: number) => {
      if (!mounted) {
        console.warn("Cannot toggle favorite before component is mounted");
        return { movieId, isFavorite: false };
      }

      const wasLiked = storeIsFavorite(movieId);
      storeToggleFavorite(movieId);
      const isNowLiked = !wasLiked;

      return { movieId, isFavorite: isNowLiked };
    },
    [storeToggleFavorite, storeIsFavorite, mounted]
  );

  return {
    isFavorite,
    toggleFavorite,
    mounted,
    favorites, // Expose the favorites array for debugging
  };
}

export function useSearch() {
  const { q: query, setSearch: setSearchStore } = usePrefsStore();
  const [mounted, setMounted] = useState(false);

  // Track mounted state for SSR compatibility
  useEffect(() => {
    setMounted(true);
  }, []);

  const setSearch = useCallback(
    (newQuery: string) => {
      setSearchStore(newQuery);
    },
    [setSearchStore]
  );

  const clearSearch = useCallback(() => {
    setSearchStore("");
  }, [setSearchStore]);

  return {
    query: mounted ? query : "",
    setSearch,
    clearSearch,
    mounted,
  };
}
