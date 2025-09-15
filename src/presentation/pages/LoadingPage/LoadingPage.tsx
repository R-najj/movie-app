import { Container, Skeleton, Box } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { TopBar } from "@/components/TopBar";

export default function LoadingPage() {
  return (
    <>
      <TopBar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
              <Box>
                <Skeleton
                  variant="rectangular"
                  height={180}
                  sx={{ borderRadius: "4px 4px 0 0", mb: 1 }}
                />
                <Skeleton variant="text" sx={{ fontSize: "1rem", mb: 0.5 }} />
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <Skeleton variant="rectangular" width={100} height={20} />
                  <Skeleton
                    variant="text"
                    width={40}
                    sx={{ ml: 1, fontSize: "0.8rem" }}
                  />
                </Box>
                <Skeleton variant="text" sx={{ fontSize: "0.75rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "0.75rem" }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
