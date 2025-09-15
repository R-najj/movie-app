// Server-side query helpers for SSR using Clean Architecture
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import { ServerContainer } from "@/infrastructure/server";
import { PaginatedMovies, MovieDetails } from "@/domain/entities";

// server-only function (fetches first page of top-rated movies)
export async function getTopRatedMoviesSSR(): Promise<PaginatedMovies> {
  try {
    const serverContainer = ServerContainer.getInstance();
    return await serverContainer.getTopRatedMoviesUseCase.execute(1);
  } catch (error) {
    console.error("SSR Error - top-rated movies:", error);
    throw error;
  }
}

// server-only function fetches movie details
export async function getMovieDetailsSSR(id: number): Promise<MovieDetails> {
  try {
    const serverContainer = ServerContainer.getInstance();
    return await serverContainer.getMovieDetailsUseCase.execute(id);
  } catch (error) {
    console.error(`SSR Error - movie details (ID: ${id}):`, error);
    throw error;
  }
}

// RQ configuration constants
export const QUERY_KEYS = {
  topRated: ["movies", "top-rated"] as const,
  movieDetails: (id: number) => ["movies", "details", id] as const,
} as const;

// RQ options for consistent caching
export const QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000, // (cacheTime)
} as const;

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          ...QUERY_OPTIONS,
          refetchOnWindowFocus: false,
        },
      },
    })
);
