"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { formatRating } from "@/lib/format";
import { useFavorites, useImageUrl } from "@/presentation/hooks";
import { SerializedMovie } from "@/lib/serialization";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

interface MovieCardProps {
  movie: SerializedMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const getImageUrl = useImageUrl();
  const { isFavorite, toggleFavorite } = useFavorites();

  const posterUrl = getImageUrl(movie.posterPath, "w300");
  const releaseYear = movie.releaseYear;

  // only check favorite status after mounting to prevent hydration mismatch
  const favorited = isFavorite(movie.id);

  const handleFavoriteClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie.id);
  };

  return (
    <Link href={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 8px 28px rgba(0,0,0,0.28)",
          },
          cursor: "pointer",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleFavoriteClick}
          aria-label={
            favorited
              ? `Remove ${movie.title} from favorites`
              : `Add ${movie.title} to favorites`
          }
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            bgcolor: "background.paper",
            opacity: 0.9,
            "&:hover": {
              bgcolor: "background.paper",
              opacity: 1,
            },
          }}
          size="small"
        >
          {favorited ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: {
              xs: 140, // Fixed height on mobile
              sm: 160, // Fixed height on tablets
              md: 180, // Fixed height on desktop
            },
            overflow: "hidden",
            borderRadius: "4px 4px 0 0",
            bgcolor: "grey.100",
          }}
        >
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={`${movie.title} poster`}
              fill
              style={{
                objectFit: "contain",
                objectPosition: "center top",
              }}
              sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
            />
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.200",
                color: "grey.500",
              }}
            >
              <Typography variant="caption">No Image</Typography>
            </Box>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, p: { xs: 0.5, sm: 0.75, md: 1 } }}>
          <Typography
            variant="body2"
            component="h2"
            sx={{
              fontWeight: 600,
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: { xs: 1, sm: 2 },
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              mb: { xs: 0.5, sm: 0.75 },
            }}
          >
            {movie.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: { xs: 0.5, sm: 0.75 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                value={movie.ratingOutOfFive}
                precision={0.1}
                size="small"
                readOnly
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  ml: 0.5,
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
                  fontWeight: 500,
                }}
              >
                {formatRating(movie.voteAverage)}
              </Typography>
            </Box>
            <Chip
              label={releaseYear}
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.75rem" },
                height: { xs: 20, sm: 24, md: 28 },
              }}
            />
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: { xs: "none", sm: "-webkit-box" },
              WebkitLineClamp: { sm: 2, md: 3 },
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.3,
              fontSize: { sm: "0.7rem", md: "0.75rem" },
            }}
          >
            {movie.overview}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
