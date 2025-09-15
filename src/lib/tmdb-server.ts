import { TopRatedResponse, MovieDetails, TMDBApiError } from "@/types/tmdb";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Helper to ensure we have required environment variables
function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Create headers for TMDB API requests
function createHeaders(): HeadersInit {
  const token = getRequiredEnvVar("TMDB_V4_TOKEN");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// Generic TMDB fetch with error handling
async function tmdbFetch<T>(endpoint: string): Promise<T> {
  const url = `${TMDB_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: createHeaders(),
      next: {
        // Cache for 5 minutes by default
        revalidate: 300,
      },
    });

    if (!response.ok) {
      const errorData = (await response.json()) as TMDBApiError;
      throw new Error(
        `TMDB API Error: ${errorData.status_message || response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`TMDB API Error for ${endpoint}:`, error);
    throw error;
  }
}

// Get top-rated movies with pagination
export async function getTopRatedMovies(
  page: number = 1
): Promise<TopRatedResponse> {
  if (page < 1 || page > 1000) {
    throw new Error("Page must be between 1 and 1000");
  }

  return tmdbFetch<TopRatedResponse>(`/movie/top_rated?page=${page}`);
}

// Get movie details by ID
export async function getMovieDetails(id: number): Promise<MovieDetails> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Movie ID must be a positive integer");
  }

  return tmdbFetch<MovieDetails>(`/movie/${id}`);
}

// Helper to construct TMDB image URLs
export function buildImageUrl(
  path: string | null,
  size: string = "w500"
): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
