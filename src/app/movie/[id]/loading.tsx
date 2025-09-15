import { Container, Skeleton, Box, Button } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

export default function MovieDetailsLoading() {
  return (
    <>
      <Skeleton
        variant="rectangular"
        sx={{
          height: "40vh",
          minHeight: 300,
        }}
      />

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
              sx={{
                aspectRatio: "2/3",
                borderRadius: 2,
              }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Skeleton variant="text" sx={{ fontSize: "2.5rem", mb: 1 }} />

            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem", mb: 2 }}
              width="60%"
            />

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Skeleton variant="rectangular" width={120} height={24} />
              <Skeleton variant="text" width={60} sx={{ ml: 2 }} />
              <Skeleton variant="text" width={100} sx={{ ml: 2 }} />
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Skeleton variant="rounded" width={80} height={32} />
              <Skeleton variant="rounded" width={80} height={32} />
              <Skeleton variant="rounded" width={80} height={32} />
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={70} height={24} />
              <Skeleton variant="rounded" width={65} height={24} />
            </Box>

            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", mb: 1 }}
              width={120}
            />

            <Skeleton variant="text" sx={{ mb: 0.5 }} />
            <Skeleton variant="text" sx={{ mb: 0.5 }} />
            <Skeleton variant="text" sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="80%" sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Skeleton
                  variant="rectangular"
                  height={150}
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton
                  variant="rectangular"
                  height={150}
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
