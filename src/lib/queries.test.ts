import { describe, it, expect, vi } from "vitest";
import { QUERY_KEYS, QUERY_OPTIONS, getQueryClient } from "./queries";

describe("QUERY_KEYS", () => {
  it("has correct topRated key", () => {
    expect(QUERY_KEYS.topRated).toEqual(["movies", "top-rated"]);
  });

  it("generates correct movieDetails key", () => {
    expect(QUERY_KEYS.movieDetails(123)).toEqual(["movies", "details", 123]);
    expect(QUERY_KEYS.movieDetails(456)).toEqual(["movies", "details", 456]);
  });

  it("movieDetails returns readonly array", () => {
    const key = QUERY_KEYS.movieDetails(789);
    expect(key).toHaveLength(3);
    expect(key[0]).toBe("movies");
    expect(key[1]).toBe("details");
    expect(key[2]).toBe(789);
  });
});

describe("QUERY_OPTIONS", () => {
  it("has correct staleTime", () => {
    expect(QUERY_OPTIONS.staleTime).toBe(5 * 60 * 1000);
  });

  it("has correct gcTime", () => {
    expect(QUERY_OPTIONS.gcTime).toBe(10 * 60 * 1000);
  });
});

describe("getQueryClient", () => {
  it("returns a QueryClient instance", () => {
    const client = getQueryClient();

    expect(client).toBeDefined();
    expect(typeof client.getQueryData).toBe("function");
    expect(typeof client.setQueryData).toBe("function");
    expect(typeof client.invalidateQueries).toBe("function");
  });

  it("has correct default options", () => {
    const client = getQueryClient();
    const defaultOptions = client.getDefaultOptions();

    expect(defaultOptions.queries?.staleTime).toBe(QUERY_OPTIONS.staleTime);
    expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(false);
  });

  it("returns QueryClient instances", () => {
    const client1 = getQueryClient();
    const client2 = getQueryClient();

    expect(client1).toBeDefined();
    expect(client2).toBeDefined();
    expect(client1.getDefaultOptions().queries?.staleTime).toBe(
      client2.getDefaultOptions().queries?.staleTime
    );
  });
});
