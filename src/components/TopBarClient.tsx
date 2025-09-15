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

export function TopBarClient() {
  const { mode, toggleMode } = useAppTheme();
  const { query, setSearch } = useSearch();

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
          Movies
        </Typography>

        <TextField
          size="small"
          placeholder="Search movies..."
          value={query}
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
          aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
        >
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
