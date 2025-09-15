import { MovieRepository } from "@/domain/repositories";
import { Movie, MovieDetails, PaginatedMovies } from "@/domain/entities";
import { MovieMapper } from "../mappers/MovieMapper";
import type {
  TopRatedResponse,
  MovieDetails as TMDBMovieDetails,
  TMDBApiError,
} from "@/types/tmdb";

export class TMDBMovieDataSource implements MovieRepository {
  private readonly baseUrl = "https://api.themoviedb.org/3";
  private readonly imageBaseUrl = "https://image.tmdb.org/t/p";

  constructor(private readonly apiToken: string) {
    if (!apiToken) {
      throw new Error("TMDB API token is required");
    }
  }

  private createHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      "Content-Type": "application/json",
    };
  }

  private async tmdbFetch<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: this.createHeaders(),
      next: {
        revalidate: 300,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

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

  async getTopRatedMovies(page: number = 1): Promise<PaginatedMovies> {
    if (page < 1 || page > 1000) {
      throw new Error("Page must be between 1 and 1000");
    }

    const response = await this.tmdbFetch<TopRatedResponse>(
      `/movie/top_rated?page=${page}`
    );

    return MovieMapper.toPaginatedDomain(response);
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Movie ID must be a positive integer");
    }

    const response = await this.tmdbFetch<TMDBMovieDetails>(`/movie/${id}`);
    return MovieMapper.toDetailsDomain(response);
  }

  buildImageUrl(path: string | null, size: string = "w500"): string | null {
    if (!path) return null;
    return `${this.imageBaseUrl}/${size}${path}`;
  }
}
