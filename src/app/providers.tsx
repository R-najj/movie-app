"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getTheme } from "@/lib/mui/theme";
import { useThemeStore } from "@/stores/theme";
import { DependencyProvider } from "@/infrastructure";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 6 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const mode = useThemeStore((state) => state.mode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // prevent hydration mismatch by using the default theme until mounted
  const theme = getTheme(mounted ? mode : "light");

  return (
    <AppRouterCacheProvider>
      <QueryClientProvider client={queryClient}>
        <DependencyProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </DependencyProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}
