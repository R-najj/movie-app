/**
 * server-side dependency container
 * Used for SSR where we can't use React hooks or client-side storage
 */
import {
  GetTopRatedMoviesUseCase,
  GetMovieDetailsUseCase,
  GetImageUrlUseCase,
} from "@/domain/usecases";
import { TMDBMovieDataSource } from "@/data/datasources";
import { AppConfig } from "../config/AppConfig";

export class ServerContainer {
  private static instance: ServerContainer;
  private movieRepository: TMDBMovieDataSource;
  private _getTopRatedMoviesUseCase: GetTopRatedMoviesUseCase;
  private _getMovieDetailsUseCase: GetMovieDetailsUseCase;
  private _getImageUrlUseCase: GetImageUrlUseCase;

  private constructor() {
    // initialize with server-side config
    const config = AppConfig.getAppConfigSafe();
    this.movieRepository = new TMDBMovieDataSource(config.tmdbApiToken);

    // initialize use cases
    this._getTopRatedMoviesUseCase = new GetTopRatedMoviesUseCase(
      this.movieRepository
    );
    this._getMovieDetailsUseCase = new GetMovieDetailsUseCase(
      this.movieRepository
    );
    this._getImageUrlUseCase = new GetImageUrlUseCase(this.movieRepository);
  }

  /**
   * get singleton instance
   */
  static getInstance(): ServerContainer {
    if (!ServerContainer.instance) {
      ServerContainer.instance = new ServerContainer();
    }
    return ServerContainer.instance;
  }

  /**
   * get top-rated movies use case
   */
  get getTopRatedMoviesUseCase(): GetTopRatedMoviesUseCase {
    return this._getTopRatedMoviesUseCase;
  }

  /**
   * get movie details use case
   */
  get getMovieDetailsUseCase(): GetMovieDetailsUseCase {
    return this._getMovieDetailsUseCase;
  }

  /**
   * get image url use case
   */
  get getImageUrlUseCase(): GetImageUrlUseCase {
    return this._getImageUrlUseCase;
  }
}
