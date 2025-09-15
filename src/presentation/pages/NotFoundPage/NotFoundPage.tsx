"use client";

import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <SentimentDissatisfied
          sx={{
            fontSize: 80,
            color: "text.secondary",
            mb: 2,
          }}
        />
        <Typography
          variant="h1"
          sx={{ fontSize: "4rem", fontWeight: 700, mb: 1 }}
        >
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button component={Link} href="/" variant="contained" size="large">
            Go to Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
