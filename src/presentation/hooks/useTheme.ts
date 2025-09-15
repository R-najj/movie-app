"use client";

import { useCallback, useState, useEffect } from "react";
import { useThemeStore } from "@/stores/theme";

/**
 * hook to manage application theme
 */
export function useAppTheme() {
  const { mode, toggleMode: storeToggleMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setTheme = useCallback((newMode: "light" | "dark") => {
    useThemeStore.setState({ mode: newMode });
  }, []);

  const toggleTheme = useCallback(() => {
    storeToggleMode();
  }, [storeToggleMode]);

  return {
    mode,
    setMode: setTheme,
    toggleMode: toggleTheme,
    mounted,
  };
}
