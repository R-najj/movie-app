import { NextRequest, NextResponse } from "next/server";
import { getTopRatedMovies } from "@/lib/tmdb-server";
import { serializePaginatedMovies } from "@/lib/serialization";
import { PaginatedMovies, Movie } from "@/domain/entities";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get("page");

    // parse and validate page parameter
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    if (isNaN(page) || page < 1 || page > 1000) {
      return NextResponse.json(
        { error: "Invalid page parameter. Must be between 1 and 1000." },
        { status: 400 }
      );
    }

    const rawData = await getTopRatedMovies(page);

    // transform raw TMDB response to domain entity
    const paginatedMovies = new PaginatedMovies(
      rawData.page,
      rawData.results.map(
        (movie) =>
          new Movie(
            movie.id,
            movie.title,
            movie.overview,
            movie.release_date,
            movie.poster_path,
            movie.backdrop_path,
            movie.adult,
            movie.genre_ids,
            movie.original_language,
            movie.original_title,
            movie.popularity,
            movie.video,
            movie.vote_average,
            movie.vote_count
          )
      ),
      rawData.total_pages,
      rawData.total_results
    );

    // serialize the domain entity to a plain object
    const serializedData = serializePaginatedMovies(paginatedMovies);

    return NextResponse.json(serializedData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("API Error - top-rated movies:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch top-rated movies",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
