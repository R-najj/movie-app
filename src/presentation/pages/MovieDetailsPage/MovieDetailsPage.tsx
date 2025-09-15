"use client";

import { useParams } from "next/navigation";
import React from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Rating,
  Card,
  CardContent,
  Skeleton,
  Alert,
  Button,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { formatRating, formatInt, formatCurrency } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowBack,
  CalendarToday,
  Schedule,
  Star,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import {
  useMovieDetails,
  useFavorites,
  useImageUrl,
} from "@/presentation/hooks";

export default function MovieDetailsPage() {
  const params = useParams();
  const movieId = parseInt(params.id as string, 10);
  const { isFavorite, toggleFavorite, mounted } = useFavorites();
  const getImageUrl = useImageUrl();

  const {
    data: movie,
    isLoading,
    error,
  } = useMovieDetails(movieId, !isNaN(movieId) && movieId > 0);

  // invalid ID
  if (isNaN(movieId) || movieId <= 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Invalid movie ID
        </Alert>
        <Button component={Link} href="/" startIcon={<ArrowBack />}>
          Back to Home
        </Button>
      </Container>
    );
  }

  // loading state
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Skeleton
              variant="rectangular"
              height={600}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={40} width="60%" />
            <Box sx={{ my: 2 }}>
              <Skeleton variant="rectangular" height={24} width={120} />
            </Box>
            <Skeleton variant="text" height={100} />
            <Box sx={{ mt: 3 }}>
              <Skeleton variant="text" height={40} width="30%" />
              <Skeleton variant="text" height={200} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>

        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>

        <Button variant="outlined" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Container>
    );
  }

  // movie not found (shouldn't happen but for safety)
  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>

        <Alert severity="info">Movie not found</Alert>
      </Container>
    );
  }

  const posterUrl = getImageUrl(movie.posterPath, "w500");
  const backdropUrl = getImageUrl(movie.backdropPath, "w1280");
  const releaseYear = movie.releaseYear;
  const runtime = movie.formattedRuntime || "Runtime unknown";
  const budget = formatCurrency(movie.budget);
  const revenue = formatCurrency(movie.revenue);

  return (
    <>
      {backdropUrl && (
        <Box
          sx={{
            position: "relative",
            height: "40vh",
            minHeight: 300,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${backdropUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Container maxWidth="lg" sx={{ pb: 4 }}>
            <Button
              component={Link}
              href="/"
              startIcon={<ArrowBack />}
              sx={{
                mb: 2,
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
              variant="outlined"
            >
              Back to Home
            </Button>
            <Typography
              variant="h2"
              component="h1"
              sx={{ color: "white", fontWeight: 700 }}
            >
              {movie.title}
            </Typography>
            {movie.tagline && (
              <Typography
                variant="h6"
                sx={{ color: "grey.300", fontStyle: "italic" }}
              >
                {movie.tagline}
              </Typography>
            )}
          </Container>
        </Box>
      )}

      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        {!backdropUrl && (
          <Box sx={{ mb: 4 }}>
            <Button
              component={Link}
              href="/"
              startIcon={<ArrowBack />}
              sx={{ mb: 3 }}
            >
              Back to Home
            </Button>
            <Typography variant="h2" component="h1" gutterBottom>
              {movie.title}
            </Typography>
            {movie.tagline && (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                {movie.tagline}
              </Typography>
            )}
          </Box>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            {posterUrl ? (
              <Box sx={{ position: "relative", aspectRatio: "2/3" }}>
                <Image
                  src={posterUrl}
                  alt={`${movie.title} poster`}
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  priority
                />
              </Box>
            ) : (
              <Box
                sx={{
                  aspectRatio: "2/3",
                  bgcolor: "grey.200",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  No Poster Available
                </Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating
                  value={movie.ratingOutOfFive}
                  precision={0.1}
                  readOnly
                />
                <Typography variant="h6" sx={{ ml: 1, mr: 2 }}>
                  {formatRating(movie.voteAverage)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({formatInt(movie.voteCount)} votes)
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="outlined"
                  startIcon={
                    mounted && isFavorite(movie.id) ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorder />
                    )
                  }
                  onClick={() => toggleFavorite(movie.id)}
                  color={mounted && isFavorite(movie.id) ? "error" : "primary"}
                >
                  {mounted && isFavorite(movie.id)
                    ? "Favorited"
                    : "Add to Favorites"}
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                <Chip icon={<CalendarToday />} label={releaseYear} />
                <Chip icon={<Schedule />} label={runtime} />
                <Chip
                  icon={<Star />}
                  label={movie.status}
                  color={movie.status === "Released" ? "success" : "default"}
                />
              </Box>

              {movie.genres.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  {movie.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            <Typography variant="h5" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              {movie.overview || "No overview available."}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Production Details
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Budget
                      </Typography>
                      <Typography variant="body1">{budget}</Typography>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Revenue
                      </Typography>
                      <Typography variant="body1">{revenue}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Original Language
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ textTransform: "uppercase" }}
                      >
                        {movie.originalLanguage}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {movie.productionCompanies.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Production Companies
                      </Typography>
                      {movie.productionCompanies.slice(0, 5).map((company) => (
                        <Typography
                          key={company.id}
                          variant="body2"
                          sx={{ mb: 0.5 }}
                        >
                          {company.name}
                          {company.originCountry &&
                            ` (${company.originCountry})`}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
