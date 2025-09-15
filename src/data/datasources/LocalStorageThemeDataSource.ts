import { ThemeRepository, ThemeMode } from "@/domain/repositories";

export class LocalStorageThemeDataSource implements ThemeRepository {
  private readonly storageKey = "movie-app-theme";
  private readonly defaultTheme: ThemeMode = "system";

  private getThemeFromStorage(): ThemeMode {
    if (typeof window === "undefined") {
      return this.defaultTheme;
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored && ["light", "dark", "system"].includes(stored)) {
        return stored as ThemeMode;
      }
      return this.defaultTheme;
    } catch (error) {
      console.error("Error reading theme from localStorage:", error);
      return this.defaultTheme;
    }
  }

  private saveThemeToStorage(theme: ThemeMode): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  }

  getThemeMode(): ThemeMode {
    return this.getThemeFromStorage();
  }

  setThemeMode(mode: ThemeMode): void {
    this.saveThemeToStorage(mode);
  }

  toggleTheme(): void {
    const currentTheme = this.getThemeMode();
    const nextTheme: ThemeMode = currentTheme === "light" ? "dark" : "light";
    this.setThemeMode(nextTheme);
  }
}
