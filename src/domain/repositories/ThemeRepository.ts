export type ThemeMode = "light" | "dark" | "system";

export interface ThemeRepository {
  /**
   * get current theme mode
   * @returns Current theme mode
   */
  getThemeMode(): ThemeMode;

  /**
   * set theme mode
   * @param mode - Theme mode to set
   */
  setThemeMode(mode: ThemeMode): void;

  /**
   * toggle between light and dark theme
   */
  toggleTheme(): void;
}
