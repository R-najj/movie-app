"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAppTheme, useSearch } from "@/presentation/hooks";
import { useEffect, useState } from "react";

export function TopBar() {
  const [isClient, setIsClient] = useState(false);
  const { mode, toggleMode, mounted } = useAppTheme();
  const { query, setSearch, mounted: searchMounted } = useSearch();

  // ensure this only runs on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // use the mounted state from either hook (both should be true when ready)
  const isReady = isClient && mounted && searchMounted;

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
          Movies
        </Typography>

        <TextField
          size="small"
          placeholder="Search movies..."
          value={isReady ? query : ""}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            minWidth: 200,
            bgcolor: "background.paper",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          onClick={toggleMode}
          color="inherit"
          aria-label={`Switch to ${
            isReady && mode === "dark" ? "light" : "dark"
          } mode`}
        >
          {isReady && mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
