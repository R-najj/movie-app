"use client";

import { useCallback } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { MovieDetails } from "@/domain/entities";
import { SerializedPaginatedMovies } from "@/lib/serialization";
import { QUERY_KEYS, QUERY_OPTIONS } from "@/lib/queries";

/**
 * hook to get top-rated movies with infinite scrolling
 */
export function useTopRatedMovies(enabled: boolean = true) {
  return useInfiniteQuery<SerializedPaginatedMovies>({
    queryKey: QUERY_KEYS.topRated,
    queryFn: async ({ pageParam = 1 }) => {
      // Call the Next.js API route instead of using the use case directly
      const response = await fetch(`/api/tmdb/top-rated?page=${pageParam}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
    enabled,
    ...QUERY_OPTIONS,
  });
}

/**
 * hook to get movie details by ID
 */
export function useMovieDetails(movieId: number, enabled: boolean = true) {
  return useQuery<MovieDetails>({
    queryKey: QUERY_KEYS.movieDetails(movieId),
    queryFn: async () => {
      // Call the Next.js API route instead of using the use case directly
      const response = await fetch(`/api/tmdb/movie/${movieId}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch movie details: ${response.statusText}`
        );
      }
      const data = await response.json();
      return data;
    },
    enabled: enabled && movieId > 0,
    ...QUERY_OPTIONS,
  });
}

/**
 * hook to get image URL from path
 */
export function useImageUrl() {
  return useCallback((path: string | null, size?: string) => {
    if (!path) return null;
    const imageSize = size || "w500";
    return `https://image.tmdb.org/t/p/${imageSize}${path}`;
  }, []);
}
