export interface PreferencesRepository {
  /**
   * check if a movie is marked as favorite
   * @param movieId - Movie ID
   * @returns Boolean indicating if movie is favorite
   */
  isFavorite(movieId: number): boolean;

  /**
   * toggle favorite status of a movie
   * @param movieId - Movie ID
   */
  toggleFavorite(movieId: number): void;

  /**
   * get all favorite movie IDs
   * @returns Array of movie IDs
   */
  getFavorites(): number[];

  /**
   * add movie to favorites
   * @param movieId - Movie ID
   */
  addFavorite(movieId: number): void;

  /**
   * remove movie from favorites
   * @param movieId - Movie ID
   */
  removeFavorite(movieId: number): void;

  /**
   * clear all favorites
   */
  clearFavorites(): void;
}
