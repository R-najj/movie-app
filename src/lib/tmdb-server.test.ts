import { describe, it, expect } from "vitest";
import { buildImageUrl } from "./tmdb-server";

describe("buildImageUrl", () => {
  it("builds correct image URL with default size", () => {
    expect(buildImageUrl("/path/to/image.jpg")).toBe(
      "https://image.tmdb.org/t/p/w500/path/to/image.jpg"
    );
  });

  it("builds correct image URL with custom size", () => {
    expect(buildImageUrl("/path/to/image.jpg", "w300")).toBe(
      "https://image.tmdb.org/t/p/w300/path/to/image.jpg"
    );
  });

  it("handles null path", () => {
    expect(buildImageUrl(null)).toBe(null);
    expect(buildImageUrl(null, "w300")).toBe(null);
  });

  it("handles empty string path", () => {
    expect(buildImageUrl("")).toBe(null);
    expect(buildImageUrl("", "w300")).toBe(null);
  });

  it("works with different image sizes", () => {
    const path = "/example.jpg";
    expect(buildImageUrl(path, "w92")).toBe(
      "https://image.tmdb.org/t/p/w92/example.jpg"
    );
    expect(buildImageUrl(path, "w154")).toBe(
      "https://image.tmdb.org/t/p/w154/example.jpg"
    );
    expect(buildImageUrl(path, "w185")).toBe(
      "https://image.tmdb.org/t/p/w185/example.jpg"
    );
    expect(buildImageUrl(path, "w342")).toBe(
      "https://image.tmdb.org/t/p/w342/example.jpg"
    );
    expect(buildImageUrl(path, "w500")).toBe(
      "https://image.tmdb.org/t/p/w500/example.jpg"
    );
    expect(buildImageUrl(path, "w780")).toBe(
      "https://image.tmdb.org/t/p/w780/example.jpg"
    );
    expect(buildImageUrl(path, "original")).toBe(
      "https://image.tmdb.org/t/p/original/example.jpg"
    );
  });

  it("handles paths with special characters", () => {
    expect(buildImageUrl("/movie title (2023).jpg")).toBe(
      "https://image.tmdb.org/t/p/w500/movie title (2023).jpg"
    );
  });
});
