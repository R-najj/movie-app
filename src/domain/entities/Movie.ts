export class Movie {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly overview: string,
    public readonly releaseDate: string,
    public readonly posterPath: string | null,
    public readonly backdropPath: string | null,
    public readonly adult: boolean,
    public readonly genreIds: number[],
    public readonly originalLanguage: string,
    public readonly originalTitle: string,
    public readonly popularity: number,
    public readonly video: boolean,
    public readonly voteAverage: number,
    public readonly voteCount: number
  ) {}

  get releaseYear(): number {
    return new Date(this.releaseDate).getFullYear();
  }

  get hasPoster(): boolean {
    return this.posterPath !== null;
  }

  get hasBackdrop(): boolean {
    return this.backdropPath !== null;
  }

  get ratingOutOfFive(): number {
    return this.voteAverage / 2;
  }

  /**
   * convert to plain object for serialization (Next.js Client Component compatibility)
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      overview: this.overview,
      releaseDate: this.releaseDate,
      posterPath: this.posterPath,
      backdropPath: this.backdropPath,
      adult: this.adult,
      genreIds: this.genreIds,
      originalLanguage: this.originalLanguage,
      originalTitle: this.originalTitle,
      popularity: this.popularity,
      video: this.video,
      voteAverage: this.voteAverage,
      voteCount: this.voteCount,
      // include computed properties as plain values
      releaseYear: this.releaseYear,
      hasPoster: this.hasPoster,
      hasBackdrop: this.hasBackdrop,
      ratingOutOfFive: this.ratingOutOfFive,
    };
  }
}
