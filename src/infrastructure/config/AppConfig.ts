export class AppConfig {
  /**
   * get required environment variable
   * @param name - Environment variable name
   * @returns Environment variable value
   * @throws Error if variable is not set
   */
  private static getRequiredEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
  }

  /**
   * get environment variable with fallback
   * @param name - Environment variable name
   * @param fallback - Fallback value if not set
   * @returns Environment variable value or fallback
   */
  private static getEnvVar(name: string, fallback: string): string {
    return process.env[name] || fallback;
  }

  /**
   * get TMDB API token (V4 Bearer token)
   */
  static getTmdbApiToken(): string {
    return this.getRequiredEnvVar("TMDB_V4_TOKEN");
  }

  /**
   * get TMDB API token with fallback for build time
   */
  static getTmdbApiTokenSafe(): string {
    return this.getEnvVar("TMDB_V4_TOKEN", "dummy-token-for-build");
  }

  /**
   * get application configuration for DI container
   */
  static getAppConfig() {
    return {
      tmdbApiToken: this.getTmdbApiToken(),
    };
  }

  /**
   * get application configuration for DI container with fallback for build time
   */
  static getAppConfigSafe() {
    return {
      tmdbApiToken: this.getTmdbApiTokenSafe(),
    };
  }
}
