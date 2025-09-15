import { ThemeRepository, ThemeMode } from "../repositories";

export class GetThemeUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  /**
   * execute the use case to get current theme
   * @returns Current theme mode
   */
  execute(): ThemeMode {
    try {
      return this.themeRepository.getThemeMode();
    } catch (error) {
      console.error("GetThemeUseCase failed:", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return "system";
    }
  }
}
