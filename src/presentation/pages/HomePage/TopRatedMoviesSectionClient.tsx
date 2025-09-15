"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import MovieCard from "@/components/MovieCard";
import {
  useSearch,
  useTopRatedMovies,
  useDebounced,
} from "@/presentation/hooks";
import { SerializedPaginatedMovies } from "@/lib/serialization";

interface TopRatedMoviesSectionClientProps {
  initialData: SerializedPaginatedMovies;
}

export default function TopRatedMoviesSectionClient({
  initialData,
}: TopRatedMoviesSectionClientProps) {
  const { query } = useSearch();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const debouncedQ = useDebounced(query.trim(), 300);

  // cache normalized search terms
  const normalizedQuery = useMemo(() => debouncedQ.toLowerCase(), [debouncedQ]);

  // check if user is currently searching (use non-debounced for immediate UI updates)
  const isSearching = query.trim() !== "";
  const isActuallySearching = debouncedQ !== "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useTopRatedMovies(!isActuallySearching);

  // Use initial data if no query data, otherwise use query data
  const effectiveData = data ? data : { pages: [initialData] };

  // computed state for showing loading indicators (using debounced values)
  const shouldShowLoadingIndicator =
    !isActuallySearching &&
    debouncedQ === "" &&
    isFetchingNextPage &&
    hasNextPage;

  // debug logging optimized to avoid render-time execution
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("TopRatedMoviesSection state:", {
        originalQuery: query,
        debouncedQ,
        isSearching,
        isActuallySearching,
        isFetchingNextPage,
        hasNextPage,
        shouldShowLoadingIndicator,
      });
    }
  }, [
    query,
    debouncedQ,
    isSearching,
    isActuallySearching,
    isFetchingNextPage,
    hasNextPage,
    shouldShowLoadingIndicator,
  ]);

  // intersection Observer for infinite scroll (disabled when searching)
  useEffect(() => {
    // disable infinite scroll when there's an active search query
    if (debouncedQ !== "" || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [debouncedQ, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // handle search state changes while fetching
  useEffect(() => {
    if (isSearching && isFetchingNextPage) {
      // NOTE: React Query doesn't provide a direct cancel method for infinite queries (but the loading states will be managed by the shouldShowLoadingIndicators logic)
      //TODO: add a cancel method for infinite queries
    }
  }, [isSearching, isFetchingNextPage]);

  const filteredMovies = useMemo(() => {
    if (!effectiveData) return [];

    const allMovies = effectiveData.pages.flatMap((page) => page.movies);

    // early return if no search filter applied
    if (!normalizedQuery) {
      return allMovies;
    }

    // apply search filter using pre-normalized query
    return allMovies.filter((movie) => {
      const normalizedTitle = movie.title.toLowerCase();
      return normalizedTitle.includes(normalizedQuery);
    });
  }, [effectiveData, normalizedQuery]);

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Error loading movies. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {filteredMovies.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No movies found matching your criteria
          </Typography>
          {debouncedQ && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your filters
            </Typography>
          )}
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {filteredMovies.map((movie) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {hasNextPage && debouncedQ === "" && (
            <Box
              ref={loadMoreRef}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 4,
                mb: 4,
                minHeight: 60,
              }}
            >
              {shouldShowLoadingIndicator && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CircularProgress size={30} />
                  <Typography variant="body1" color="text.secondary">
                    Loading more movies...
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {isSearching && filteredMovies.length > 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredMovies.length} movies matching &quot;
                {query.trim()}
                &quot; from loaded content.
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                Clear search to load more movies
              </Typography>
              {query.trim() !== debouncedQ && (
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ mt: 1, display: "block" }}
                >
                  Filtering as you type...
                </Typography>
              )}
            </Box>
          )}

          {/* show message when all movies are loaded and not searching */}
          {!hasNextPage && debouncedQ === "" && filteredMovies.length > 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                You&apos;ve reached the end! {filteredMovies.length} movies
                loaded.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
