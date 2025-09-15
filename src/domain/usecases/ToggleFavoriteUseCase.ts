import { PreferencesRepository } from "../repositories";

export interface ToggleFavoriteResult {
  movieId: number;
  isFavorite: boolean;
}

export class ToggleFavoriteUseCase {
  constructor(private readonly preferencesRepository: PreferencesRepository) {}

  /**
   * execute the use case to toggle favorite status
   * @param movieId - Movie ID
   * @returns Result with movie ID and new favorite status
   * @throws Error if movie ID is invalid
   */
  execute(movieId: number): ToggleFavoriteResult {
    if (!Number.isInteger(movieId) || movieId <= 0) {
      throw new Error("Movie ID must be a positive integer");
    }

    try {
      this.preferencesRepository.toggleFavorite(movieId);

      const isFavorite = this.preferencesRepository.isFavorite(movieId);

      return {
        movieId,
        isFavorite,
      };
    } catch (error) {
      console.error("ToggleFavoriteUseCase failed:", {
        movieId,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }
}
