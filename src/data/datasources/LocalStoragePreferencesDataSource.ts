import { PreferencesRepository } from "@/domain/repositories";

export class LocalStoragePreferencesDataSource
  implements PreferencesRepository
{
  private readonly storageKey = "movie-app-favorites";

  /**
   * get favorites from localStorage (browser only)
   * TODO: use zustand to store favorites
   */
  private getFavoritesFromStorage(): number[] {
    if (typeof window === "undefined") {
      return []; // SSR safe - return empty array on server
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return [];
    }
  }

  /**
   * Save favorites to localStorage (browser only)
   * TODO: use zustand to store favorites
   */
  private saveFavoritesToStorage(favorites: number[]): void {
    if (typeof window === "undefined") {
      return; // SSR safe - do nothing on server
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }

  isFavorite(movieId: number): boolean {
    const favorites = this.getFavoritesFromStorage();
    return favorites.includes(movieId);
  }

  toggleFavorite(movieId: number): void {
    const favorites = this.getFavoritesFromStorage();
    const index = favorites.indexOf(movieId);

    if (index === -1) {
      favorites.push(movieId);
    } else {
      favorites.splice(index, 1);
    }

    this.saveFavoritesToStorage(favorites);
  }

  getFavorites(): number[] {
    return this.getFavoritesFromStorage();
  }

  addFavorite(movieId: number): void {
    const favorites = this.getFavoritesFromStorage();
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      this.saveFavoritesToStorage(favorites);
    }
  }

  removeFavorite(movieId: number): void {
    const favorites = this.getFavoritesFromStorage();
    const filteredFavorites = favorites.filter((id) => id !== movieId);
    this.saveFavoritesToStorage(filteredFavorites);
  }

  clearFavorites(): void {
    this.saveFavoritesToStorage([]);
  }
}
