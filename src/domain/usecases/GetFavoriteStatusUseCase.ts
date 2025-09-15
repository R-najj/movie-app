import { PreferencesRepository } from "../repositories";

export class GetFavoriteStatusUseCase {
  constructor(private readonly preferencesRepository: PreferencesRepository) {}

  /**
   * execute the use case to check if movie is favorite
   * @param movieId - Movie ID
   * @returns Boolean indicating if movie is favorite
   * @throws Error if movie ID is invalid
   */
  execute(movieId: number): boolean {
    // validate movie ID input
    if (!Number.isInteger(movieId) || movieId <= 0) {
      throw new Error("Movie ID must be a positive integer");
    }

    try {
      return this.preferencesRepository.isFavorite(movieId);
    } catch (error) {
      console.error("GetFavoriteStatusUseCase failed:", {
        movieId,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return false;
    }
  }
}
