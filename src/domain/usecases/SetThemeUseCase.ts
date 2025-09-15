import { ThemeRepository, ThemeMode } from "../repositories";

export class SetThemeUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  /**
   * execute the use case to set theme
   * @param mode - Theme mode to set
   * @throws Error if theme mode is invalid
   */
  execute(mode: ThemeMode): void {
    if (!this.isValidThemeMode(mode)) {
      throw new Error(
        `Invalid theme mode: ${mode}. Must be 'light', 'dark', or 'system'`
      );
    }

    try {
      this.themeRepository.setThemeMode(mode);
    } catch (error) {
      console.error("SetThemeUseCase failed:", {
        mode,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }

  /**
   * validate theme mode
   */
  private isValidThemeMode(mode: string): mode is ThemeMode {
    return ["light", "dark", "system"].includes(mode);
  }
}
