"use client";

import { useEffect } from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // TODO: log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

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
        <ErrorOutline
          sx={{
            fontSize: 64,
            color: "error.main",
            mb: 2,
          }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Something went wrong!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          We encountered an unexpected error. Please try again.
        </Typography>
        {error.message && (
          <Box
            sx={{
              p: 2,
              mb: 3,
              bgcolor: "grey.100",
              borderRadius: 1,
              maxHeight: 200,
              overflow: "auto",
            }}
          >
            <Typography
              variant="body2"
              component="pre"
              sx={{
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {error.message}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" onClick={reset}>
            Try Again
          </Button>
          <Button variant="outlined" href="/">
            Go Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
