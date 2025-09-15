import { MovieRepository } from "../repositories";
import { PaginatedMovies } from "../entities";

export class GetTopRatedMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  /**
   * execute the use case to get top-rated movies
   * @param page - Page number (defaults to 1)
   * @returns Promise of paginated movies
   * @throws Error if page is invalid
   */
  async execute(page: number = 1): Promise<PaginatedMovies> {
    if (!Number.isInteger(page) || page < 1) {
      throw new Error("Page must be a positive integer");
    }

    if (page > 1000) {
      throw new Error("Page cannot exceed 1000");
    }

    try {
      return await this.movieRepository.getTopRatedMovies(page);
    } catch (error) {
      console.error("GetTopRatedMoviesUseCase failed:", {
        page,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }
}
