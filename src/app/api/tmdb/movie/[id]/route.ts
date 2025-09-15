import { NextRequest, NextResponse } from "next/server";
import { getMovieDetails } from "@/lib/tmdb-server";
import { MovieDetails, Genre, ProductionCompany } from "@/domain/entities";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: idParam } = await params;

    // parse and validate id
    const id = parseInt(idParam, 10);

    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: "Invalid movie ID. Must be a positive integer." },
        { status: 400 }
      );
    }

    const rawData = await getMovieDetails(id);

    // transform raw TMDB response to domain entity
    const movieDetails = new MovieDetails(
      rawData.id,
      rawData.title,
      rawData.overview,
      rawData.release_date,
      rawData.poster_path,
      rawData.backdrop_path,
      rawData.adult,
      rawData.genre_ids,
      rawData.original_language,
      rawData.original_title,
      rawData.popularity,
      rawData.video,
      rawData.vote_average,
      rawData.vote_count,
      rawData.budget,
      rawData.genres.map((genre) => new Genre(genre.id, genre.name)),
      rawData.homepage,
      rawData.imdb_id,
      rawData.production_companies.map(
        (company) =>
          new ProductionCompany(
            company.id,
            company.logo_path,
            company.name,
            company.origin_country || ""
          )
      ),
      rawData.revenue,
      rawData.runtime,
      rawData.status,
      rawData.tagline
    );

    // serialize the domain entity to a plain object
    const serializedData = movieDetails.toJSON();

    return NextResponse.json(serializedData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    const { id: idParam } = await params;
    console.error(`API Error - movie details (ID: ${idParam}):`, error);

    // handle TMDB errors
    if (error instanceof Error && error.message.includes("404")) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        error: "Failed to fetch movie details",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
