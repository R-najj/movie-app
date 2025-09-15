import { PaginatedMovies, Movie, MovieDetails, Genre, ProductionCompany } from "@/domain/entities";

/**
 * Serialize domain entities to plain objects for Next.js Client Component compatibility
 * This avoids the "Objects with toJSON methods are not supported" error
 */

// Types for serialized data
export type SerializedMovie = {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string | null;
  backdropPath: string | null;
  adult: boolean;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  popularity: number;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  releaseYear: number;
  hasPoster: boolean;
  hasBackdrop: boolean;
  ratingOutOfFive: number;
};

export type SerializedPaginatedMovies = {
  page: number;
  movies: SerializedMovie[];
  totalPages: number;
  totalResults: number;
  hasNextPage: boolean;
  nextPage: number | null;
};

export function serializeMovie(movie: Movie) {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.releaseDate,
    posterPath: movie.posterPath,
    backdropPath: movie.backdropPath,
    adult: movie.adult,
    genreIds: movie.genreIds,
    originalLanguage: movie.originalLanguage,
    originalTitle: movie.originalTitle,
    popularity: movie.popularity,
    video: movie.video,
    voteAverage: movie.voteAverage,
    voteCount: movie.voteCount,
    // Include computed properties as plain values
    releaseYear: movie.releaseYear,
    hasPoster: movie.hasPoster,
    hasBackdrop: movie.hasBackdrop,
    ratingOutOfFive: movie.ratingOutOfFive,
  };
}

export function serializeGenre(genre: Genre) {
  return {
    id: genre.id,
    name: genre.name,
  };
}

export function serializeProductionCompany(company: ProductionCompany) {
  return {
    id: company.id,
    logoPath: company.logoPath,
    name: company.name,
    originCountry: company.originCountry,
    hasLogo: company.hasLogo,
  };
}

export function serializeMovieDetails(movieDetails: MovieDetails) {
  return {
    // Include all Movie properties
    id: movieDetails.id,
    title: movieDetails.title,
    overview: movieDetails.overview,
    releaseDate: movieDetails.releaseDate,
    posterPath: movieDetails.posterPath,
    backdropPath: movieDetails.backdropPath,
    adult: movieDetails.adult,
    genreIds: movieDetails.genreIds,
    originalLanguage: movieDetails.originalLanguage,
    originalTitle: movieDetails.originalTitle,
    popularity: movieDetails.popularity,
    video: movieDetails.video,
    voteAverage: movieDetails.voteAverage,
    voteCount: movieDetails.voteCount,
    releaseYear: movieDetails.releaseYear,
    hasPoster: movieDetails.hasPoster,
    hasBackdrop: movieDetails.hasBackdrop,
    ratingOutOfFive: movieDetails.ratingOutOfFive,
    // Include MovieDetails specific properties
    budget: movieDetails.budget,
    genres: movieDetails.genres.map(serializeGenre),
    homepage: movieDetails.homepage,
    imdbId: movieDetails.imdbId,
    productionCompanies: movieDetails.productionCompanies.map(serializeProductionCompany),
    revenue: movieDetails.revenue,
    runtime: movieDetails.runtime,
    status: movieDetails.status,
    tagline: movieDetails.tagline,
    // Include computed properties as plain values
    isProfitable: movieDetails.isProfitable,
    profit: movieDetails.profit,
    formattedRuntime: movieDetails.formattedRuntime,
    hasImdbLink: movieDetails.hasImdbLink,
    imdbUrl: movieDetails.imdbUrl,
  };
}

export function serializePaginatedMovies(paginatedMovies: PaginatedMovies) {
  return {
    page: paginatedMovies.page,
    movies: paginatedMovies.movies.map(serializeMovie),
    totalPages: paginatedMovies.totalPages,
    totalResults: paginatedMovies.totalResults,
    hasNextPage: paginatedMovies.hasNextPage,
    nextPage: paginatedMovies.nextPage,
  };
}
