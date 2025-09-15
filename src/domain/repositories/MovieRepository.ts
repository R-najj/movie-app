import { Movie, MovieDetails, PaginatedMovies } from "../entities";

export interface MovieRepository {
  /**
   * Get paginated top-rated movies
   * @param page - Page number (1-based)
   * @returns Promise of paginated movies
   */
  getTopRatedMovies(page: number): Promise<PaginatedMovies>;

  /**
   * Get detailed information about a specific movie
   * @param id - Movie ID
   * @returns Promise of movie details
   */
  getMovieDetails(id: number): Promise<MovieDetails>;

  /**
   * Build image URL for TMDB images
   * @param path - Image path from TMDB
   * @param size - Image size (default: w500)
   * @returns Complete image URL or null if no path
   */
  buildImageUrl(path: string | null, size?: string): string | null;
}
