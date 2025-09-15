import {
  MovieRepository,
  PreferencesRepository,
  ThemeRepository,
} from "@/domain/repositories";

import {
  GetTopRatedMoviesUseCase,
  GetMovieDetailsUseCase,
  ToggleFavoriteUseCase,
  GetFavoriteStatusUseCase,
  GetImageUrlUseCase,
  GetThemeUseCase,
  SetThemeUseCase,
} from "@/domain/usecases";

import {
  TMDBMovieDataSource,
  LocalStoragePreferencesDataSource,
  LocalStorageThemeDataSource,
} from "@/data/datasources";

/**
 * dependency injection container
 * Manages all dependencies and their lifecycles
 */
export class Container {
  private static instance: Container;

  // repositories
  private _movieRepository?: MovieRepository;
  private _preferencesRepository?: PreferencesRepository;
  private _themeRepository?: ThemeRepository;

  // use cases
  private _getTopRatedMoviesUseCase?: GetTopRatedMoviesUseCase;
  private _getMovieDetailsUseCase?: GetMovieDetailsUseCase;
  private _toggleFavoriteUseCase?: ToggleFavoriteUseCase;
  private _getFavoriteStatusUseCase?: GetFavoriteStatusUseCase;
  private _getImageUrlUseCase?: GetImageUrlUseCase;
  private _getThemeUseCase?: GetThemeUseCase;
  private _setThemeUseCase?: SetThemeUseCase;

  private constructor() {}

  /**
   * get singleton instance
   */
  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  /**
   * initialize container with environment variables
   * Must be called before using any dependencies
   */
  initialize(config: { tmdbApiToken: string }) {
    if (!config.tmdbApiToken) {
      throw new Error("TMDB API token is required for initialization");
    }

    // initialize repositories with their data sources
    this._movieRepository = new TMDBMovieDataSource(config.tmdbApiToken);
    this._preferencesRepository = new LocalStoragePreferencesDataSource();
    this._themeRepository = new LocalStorageThemeDataSource();

    // initialize use cases with their dependencies
    this._getTopRatedMoviesUseCase = new GetTopRatedMoviesUseCase(
      this._movieRepository
    );
    this._getMovieDetailsUseCase = new GetMovieDetailsUseCase(
      this._movieRepository
    );
    this._toggleFavoriteUseCase = new ToggleFavoriteUseCase(
      this._preferencesRepository
    );
    this._getFavoriteStatusUseCase = new GetFavoriteStatusUseCase(
      this._preferencesRepository
    );
    this._getImageUrlUseCase = new GetImageUrlUseCase(this._movieRepository);
    this._getThemeUseCase = new GetThemeUseCase(this._themeRepository);
    this._setThemeUseCase = new SetThemeUseCase(this._themeRepository);
  }

  /**
   * check if container is initialized
   */
  get isInitialized(): boolean {
    return !!this._movieRepository;
  }

  // repository getters
  get movieRepository(): MovieRepository {
    this.ensureInitialized();
    return this._movieRepository!;
  }

  get preferencesRepository(): PreferencesRepository {
    this.ensureInitialized();
    return this._preferencesRepository!;
  }

  get themeRepository(): ThemeRepository {
    this.ensureInitialized();
    return this._themeRepository!;
  }

  // use case getters
  get getTopRatedMoviesUseCase(): GetTopRatedMoviesUseCase {
    this.ensureInitialized();
    return this._getTopRatedMoviesUseCase!;
  }

  get getMovieDetailsUseCase(): GetMovieDetailsUseCase {
    this.ensureInitialized();
    return this._getMovieDetailsUseCase!;
  }

  get toggleFavoriteUseCase(): ToggleFavoriteUseCase {
    this.ensureInitialized();
    return this._toggleFavoriteUseCase!;
  }

  get getFavoriteStatusUseCase(): GetFavoriteStatusUseCase {
    this.ensureInitialized();
    return this._getFavoriteStatusUseCase!;
  }

  get getImageUrlUseCase(): GetImageUrlUseCase {
    this.ensureInitialized();
    return this._getImageUrlUseCase!;
  }

  get getThemeUseCase(): GetThemeUseCase {
    this.ensureInitialized();
    return this._getThemeUseCase!;
  }

  get setThemeUseCase(): SetThemeUseCase {
    this.ensureInitialized();
    return this._setThemeUseCase!;
  }

  /**
   * ensure container is initialized before accessing dependencies
   */
  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error(
        "Container must be initialized before accessing dependencies"
      );
    }
  }

  /**
   * reset container (useful for testing)
   */
  reset(): void {
    this._movieRepository = undefined;
    this._preferencesRepository = undefined;
    this._themeRepository = undefined;
    this._getTopRatedMoviesUseCase = undefined;
    this._getMovieDetailsUseCase = undefined;
    this._toggleFavoriteUseCase = undefined;
    this._getFavoriteStatusUseCase = undefined;
    this._getImageUrlUseCase = undefined;
    this._getThemeUseCase = undefined;
    this._setThemeUseCase = undefined;
  }
}
