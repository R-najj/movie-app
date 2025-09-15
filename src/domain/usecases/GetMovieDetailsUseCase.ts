import { MovieRepository } from "../repositories";
import { MovieDetails } from "../entities";

export class GetMovieDetailsUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  /**
   * execute the use case to get movie details
   * @param movieId - Movie ID
   * @returns Promise of movie details
   * @throws Error if movie ID is invalid
   */
  async execute(movieId: number): Promise<MovieDetails> {
    // Business rule: Validate movie ID input
    if (!Number.isInteger(movieId) || movieId <= 0) {
      throw new Error("Movie ID must be a positive integer");
    }

    try {
      return await this.movieRepository.getMovieDetails(movieId);
    } catch (error) {
      console.error("GetMovieDetailsUseCase failed:", {
        movieId,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }
}
