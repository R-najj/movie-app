import { MovieRepository } from "../repositories";

export class GetImageUrlUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  /**
   * execute the use case to build image URL
   * @param imagePath - Image path from TMDB
   * @param size - Image size (optional, defaults to w500)
   * @returns Complete image URL or null
   */
  execute(imagePath: string | null, size?: string): string | null {
    try {
      return this.movieRepository.buildImageUrl(imagePath, size);
    } catch (error) {
      console.error("GetImageUrlUseCase failed:", {
        imagePath,
        size,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return null;
    }
  }
}
