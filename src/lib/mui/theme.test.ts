import { describe, it, expect } from "vitest";
import { getTheme } from "./theme";

describe("getTheme", () => {
  it("creates light theme", () => {
    const theme = getTheme("light");

    expect(theme.palette.mode).toBe("light");
    expect(theme).toHaveProperty("breakpoints");
    expect(theme).toHaveProperty("spacing");
    expect(theme).toHaveProperty("typography");
  });

  it("creates dark theme", () => {
    const theme = getTheme("dark");

    expect(theme.palette.mode).toBe("dark");
    expect(theme).toHaveProperty("breakpoints");
    expect(theme).toHaveProperty("spacing");
    expect(theme).toHaveProperty("typography");
  });

  it("themes have different palette configurations", () => {
    const lightTheme = getTheme("light");
    const darkTheme = getTheme("dark");

    expect(lightTheme.palette.mode).not.toBe(darkTheme.palette.mode);
    expect(lightTheme.palette.primary).toBeDefined();
    expect(darkTheme.palette.primary).toBeDefined();
  });

  it("creates proper MUI theme objects", () => {
    const theme = getTheme("light");

    // essential MUI theme properties
    expect(theme).toHaveProperty("palette.primary");
    expect(theme).toHaveProperty("palette.secondary");
    expect(theme).toHaveProperty("palette.error");
    expect(theme).toHaveProperty("palette.warning");
    expect(theme).toHaveProperty("palette.info");
    expect(theme).toHaveProperty("palette.success");
    expect(theme).toHaveProperty("typography.h1");
    expect(theme).toHaveProperty("breakpoints.up");
    expect(typeof theme.spacing).toBe("function");
  });
});
