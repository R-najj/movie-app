import { describe, it, expect } from "vitest";
import { formatRating, formatInt, formatCurrency } from "./format";

describe("formatRating", () => {
  it("formats rating with 1 decimal place", () => {
    expect(formatRating(8.5)).toBe("8.5/10");
    expect(formatRating(7.234)).toBe("7.2/10");
    expect(formatRating(10)).toBe("10.0/10");
    expect(formatRating(0)).toBe("0.0/10");
  });

  it("handles edge case ratings", () => {
    expect(formatRating(0.0)).toBe("0.0/10");
    expect(formatRating(10.0)).toBe("10.0/10");
    expect(formatRating(5.55)).toBe("5.5/10");
    expect(formatRating(9.95)).toBe("9.9/10");
    expect(formatRating(1.01)).toBe("1.0/10");
    expect(formatRating(9.99)).toBe("10.0/10");
  });

  it("handles negative ratings", () => {
    expect(formatRating(-1)).toBe("-1.0/10");
    expect(formatRating(-0.5)).toBe("-0.5/10");
  });

  it("handles invalid values", () => {
    expect(formatRating(NaN)).toBe("N/A");
    expect(formatRating(null as unknown as number)).toBe("N/A");
    expect(formatRating(undefined as unknown as number)).toBe("N/A");
  });
});

describe("formatInt", () => {
  it("formats integers with thousand separators", () => {
    expect(formatInt(1000)).toBe("1,000");
    expect(formatInt(1234567)).toBe("1,234,567");
    expect(formatInt(42)).toBe("42");
    expect(formatInt(0)).toBe("0");
  });

  it("handles edge cases", () => {
    expect(formatInt(-1000)).toBe("-1,000");
    expect(formatInt(1000000000)).toBe("1,000,000,000");
    expect(formatInt(1)).toBe("1");
    expect(formatInt(-1)).toBe("-1");
    expect(formatInt(999)).toBe("999");
    expect(formatInt(-999)).toBe("-999");
  });

  it("handles decimal numbers by formatting as integers", () => {
    expect(formatInt(1000.5)).toBe("1,000.5");
    expect(formatInt(1234.99)).toBe("1,234.99");
  });

  it("handles invalid values", () => {
    expect(formatInt(NaN)).toBe("N/A");
    expect(formatInt(null as unknown as number)).toBe("N/A");
    expect(formatInt(undefined as unknown as number)).toBe("N/A");
  });
});

describe("formatCurrency", () => {
  it("formats small amounts", () => {
    expect(formatCurrency(999)).toBe("$999");
    expect(formatCurrency(100)).toBe("$100");
    expect(formatCurrency(1)).toBe("$1");
    expect(formatCurrency(50)).toBe("$50");
  });

  it("formats thousands with K suffix", () => {
    expect(formatCurrency(1000)).toBe("$1K");
    expect(formatCurrency(5500)).toBe("$6K");
    expect(formatCurrency(999999)).toBe("$1000K");
    expect(formatCurrency(1500)).toBe("$2K");
    expect(formatCurrency(10000)).toBe("$10K");
  });

  it("formats millions with M suffix", () => {
    expect(formatCurrency(1000000)).toBe("$1.0M");
    expect(formatCurrency(5500000)).toBe("$5.5M");
    expect(formatCurrency(999999999)).toBe("$1000.0M");
    expect(formatCurrency(2300000)).toBe("$2.3M");
    expect(formatCurrency(150000000)).toBe("$150.0M");
  });

  it("formats billions with B suffix", () => {
    expect(formatCurrency(1000000000)).toBe("$1.0B");
    expect(formatCurrency(2500000000)).toBe("$2.5B");
    expect(formatCurrency(10000000000)).toBe("$10.0B");
  });

  it("handles negative values", () => {
    expect(formatCurrency(-1000)).toBe("$-1,000");
    expect(formatCurrency(-1)).toBe("$-1");
    expect(formatCurrency(-500)).toBe("$-500");
  });

  it("handles edge cases around thresholds", () => {
    expect(formatCurrency(999)).toBe("$999");
    expect(formatCurrency(1000)).toBe("$1K");
    expect(formatCurrency(999999)).toBe("$1000K");
    expect(formatCurrency(1000000)).toBe("$1.0M");
    expect(formatCurrency(999999999)).toBe("$1000.0M");
    expect(formatCurrency(1000000000)).toBe("$1.0B");
  });

  it("handles invalid or zero values", () => {
    expect(formatCurrency(0)).toBe("N/A");
    expect(formatCurrency(NaN)).toBe("N/A");
    expect(formatCurrency(null as unknown as number)).toBe("N/A");
    expect(formatCurrency(undefined as unknown as number)).toBe("N/A");
  });
});
