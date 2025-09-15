import { Movie } from "./Movie";

export class PaginatedMovies {
  constructor(
    public readonly page: number,
    public readonly movies: Movie[],
    public readonly totalPages: number,
    public readonly totalResults: number
  ) {}

  get hasNextPage(): boolean {
    return this.page < this.totalPages;
  }

  get nextPage(): number | null {
    return this.hasNextPage ? this.page + 1 : null;
  }

  /**
   * convert to plain object for serialization (Next.js Client Component compatibility)
   */
  toJSON() {
    return {
      page: this.page,
      movies: this.movies.map((movie) => movie.toJSON()),
      totalPages: this.totalPages,
      totalResults: this.totalResults,
      hasNextPage: this.hasNextPage,
      nextPage: this.nextPage,
    };
  }
}
