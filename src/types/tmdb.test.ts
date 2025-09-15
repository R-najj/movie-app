import { describe, it, expect } from "vitest";
import type { Movie, MovieDetails, TopRatedResponse } from "./tmdb";

describe("TMDB Types", () => {
  it("Movie type has required properties", () => {
    const mockMovie: Movie = {
      id: 1,
      title: "Test Movie",
      overview: "A test movie",
      release_date: "2023-01-01",
      poster_path: "/test.jpg",
      backdrop_path: "/backdrop.jpg",
      adult: false,
      genre_ids: [1, 2, 3],
      original_language: "en",
      original_title: "Test Movie",
      popularity: 8.5,
      video: false,
      vote_average: 7.5,
      vote_count: 1000,
    };

    expect(mockMovie).toHaveProperty("id");
    expect(mockMovie).toHaveProperty("title");
    expect(mockMovie).toHaveProperty("overview");
    expect(mockMovie).toHaveProperty("release_date");
    expect(mockMovie).toHaveProperty("vote_average");
    expect(mockMovie).toHaveProperty("vote_count");
    expect(typeof mockMovie.id).toBe("number");
    expect(typeof mockMovie.title).toBe("string");
  });

  it("TopRatedResponse type structure", () => {
    const mockResponse: TopRatedResponse = {
      page: 1,
      results: [],
      total_pages: 10,
      total_results: 200,
    };

    expect(mockResponse).toHaveProperty("page");
    expect(mockResponse).toHaveProperty("results");
    expect(mockResponse).toHaveProperty("total_pages");
    expect(mockResponse).toHaveProperty("total_results");
    expect(Array.isArray(mockResponse.results)).toBe(true);
  });

  it("MovieDetails extends Movie", () => {
    const mockDetails: MovieDetails = {
      // Movie properties
      id: 1,
      title: "Test Movie",
      overview: "A test movie",
      release_date: "2023-01-01",
      poster_path: "/test.jpg",
      backdrop_path: "/backdrop.jpg",
      adult: false,
      genre_ids: [1, 2, 3],
      original_language: "en",
      original_title: "Test Movie",
      popularity: 8.5,
      video: false,
      vote_average: 7.5,
      vote_count: 1000,
      // MovieDetails additional properties
      belongs_to_collection: null,
      budget: 1000000,
      genres: [],
      homepage: null,
      imdb_id: "tt1234567",
      production_companies: [],
      production_countries: [],
      revenue: 2000000,
      runtime: 120,
      spoken_languages: [],
      status: "Released",
      tagline: "A great movie",
    };

    // Check it has Movie properties
    expect(mockDetails).toHaveProperty("id");
    expect(mockDetails).toHaveProperty("title");
    expect(mockDetails).toHaveProperty("vote_average");

    // Check it has additional MovieDetails properties
    expect(mockDetails).toHaveProperty("budget");
    expect(mockDetails).toHaveProperty("revenue");
    expect(mockDetails).toHaveProperty("runtime");
    expect(mockDetails).toHaveProperty("genres");
    expect(mockDetails).toHaveProperty("production_companies");
  });
});
