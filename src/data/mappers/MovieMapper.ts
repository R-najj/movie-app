import {
  Movie,
  MovieDetails,
  PaginatedMovies,
  Genre,
  ProductionCompany,
} from "@/domain/entities";
import type {
  Movie as TMDBMovie,
  MovieDetails as TMDBMovieDetails,
  TopRatedResponse,
  Genre as TMDBGenre,
  ProductionCompany as TMDBProductionCompany,
} from "@/types/tmdb";

export class MovieMapper {
  /**
   * mapers from TMDB to domain (entity)
   */
  static toDomain(tmdbMovie: TMDBMovie): Movie {
    return new Movie(
      tmdbMovie.id,
      tmdbMovie.title,
      tmdbMovie.overview,
      tmdbMovie.release_date,
      tmdbMovie.poster_path,
      tmdbMovie.backdrop_path,
      tmdbMovie.adult,
      tmdbMovie.genre_ids,
      tmdbMovie.original_language,
      tmdbMovie.original_title,
      tmdbMovie.popularity,
      tmdbMovie.video,
      tmdbMovie.vote_average,
      tmdbMovie.vote_count
    );
  }

  static toDetailsDomain(tmdbMovieDetails: TMDBMovieDetails): MovieDetails {
    return new MovieDetails(
      tmdbMovieDetails.id,
      tmdbMovieDetails.title,
      tmdbMovieDetails.overview,
      tmdbMovieDetails.release_date,
      tmdbMovieDetails.poster_path,
      tmdbMovieDetails.backdrop_path,
      tmdbMovieDetails.adult,
      tmdbMovieDetails.genre_ids,
      tmdbMovieDetails.original_language,
      tmdbMovieDetails.original_title,
      tmdbMovieDetails.popularity,
      tmdbMovieDetails.video,
      tmdbMovieDetails.vote_average,
      tmdbMovieDetails.vote_count,
      tmdbMovieDetails.budget,
      tmdbMovieDetails.genres.map(this.genreToDomain),
      tmdbMovieDetails.homepage,
      tmdbMovieDetails.imdb_id,
      tmdbMovieDetails.production_companies.map(this.productionCompanyToDomain),
      tmdbMovieDetails.revenue,
      tmdbMovieDetails.runtime,
      tmdbMovieDetails.status,
      tmdbMovieDetails.tagline
    );
  }

  static toPaginatedDomain(tmdbResponse: TopRatedResponse): PaginatedMovies {
    return new PaginatedMovies(
      tmdbResponse.page,
      tmdbResponse.results.map(this.toDomain),
      tmdbResponse.total_pages,
      tmdbResponse.total_results
    );
  }

  private static genreToDomain(tmdbGenre: TMDBGenre): Genre {
    return new Genre(tmdbGenre.id, tmdbGenre.name);
  }

  private static productionCompanyToDomain(
    tmdbCompany: TMDBProductionCompany
  ): ProductionCompany {
    return new ProductionCompany(
      tmdbCompany.id,
      tmdbCompany.logo_path,
      tmdbCompany.name,
      tmdbCompany.origin_country
    );
  }
}
