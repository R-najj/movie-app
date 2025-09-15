import { Movie } from "./Movie";
import { Genre } from "./Genre";
import { ProductionCompany } from "./ProductionCompany";

export class MovieDetails extends Movie {
  constructor(
    id: number,
    title: string,
    overview: string,
    releaseDate: string,
    posterPath: string | null,
    backdropPath: string | null,
    adult: boolean,
    genreIds: number[],
    originalLanguage: string,
    originalTitle: string,
    popularity: number,
    video: boolean,
    voteAverage: number,
    voteCount: number,
    public readonly budget: number,
    public readonly genres: Genre[],
    public readonly homepage: string | null,
    public readonly imdbId: string | null,
    public readonly productionCompanies: ProductionCompany[],
    public readonly revenue: number,
    public readonly runtime: number | null,
    public readonly status: string,
    public readonly tagline: string | null
  ) {
    super(
      id,
      title,
      overview,
      releaseDate,
      posterPath,
      backdropPath,
      adult,
      genreIds,
      originalLanguage,
      originalTitle,
      popularity,
      video,
      voteAverage,
      voteCount
    );
  }

  get isProfitable(): boolean {
    return this.budget > 0 && this.revenue > this.budget;
  }

  get profit(): number {
    return this.revenue - this.budget;
  }

  get formattedRuntime(): string | null {
    if (!this.runtime) return null;
    const hours = Math.floor(this.runtime / 60);
    const minutes = this.runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  get hasImdbLink(): boolean {
    return this.imdbId !== null;
  }

  get imdbUrl(): string | null {
    return this.imdbId ? `https://www.imdb.com/title/${this.imdbId}` : null;
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
      releaseYear: this.releaseYear,
      hasPoster: this.hasPoster,
      hasBackdrop: this.hasBackdrop,
      ratingOutOfFive: this.ratingOutOfFive,
      budget: this.budget,
      genres: this.genres.map((genre) => genre.toJSON()),
      homepage: this.homepage,
      imdbId: this.imdbId,
      productionCompanies: this.productionCompanies.map((company) =>
        company.toJSON()
      ),
      revenue: this.revenue,
      runtime: this.runtime,
      status: this.status,
      tagline: this.tagline,
      //  add computed properties as plain values
      isProfitable: this.isProfitable,
      profit: this.profit,
      formattedRuntime: this.formattedRuntime,
      hasImdbLink: this.hasImdbLink,
      imdbUrl: this.imdbUrl,
    };
  }
}
