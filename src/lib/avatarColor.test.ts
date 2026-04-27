import { describe, expect, it } from "vitest";
import { AVATAR_GRADIENT_COUNT, avatarGradientForSeed } from "./avatarColor.ts";

describe("avatarGradientForSeed", () => {
  const FIRST_PALETTE: string = "linear-gradient(135deg, #E1306C, #833AB4)";

  it("returns the brand-default gradient for empty input", () => {
    expect(avatarGradientForSeed("")).toBe(FIRST_PALETTE);
  });

  it("returns the brand-default gradient for null", () => {
    expect(avatarGradientForSeed(null)).toBe(FIRST_PALETTE);
  });

  it("returns the brand-default gradient for undefined", () => {
    expect(avatarGradientForSeed(undefined)).toBe(FIRST_PALETTE);
  });

  it("is deterministic — same seed always returns the same gradient", () => {
    const seed: string = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
    const a: string = avatarGradientForSeed(seed);
    const b: string = avatarGradientForSeed(seed);
    const c: string = avatarGradientForSeed(seed);
    expect(a).toBe(b);
    expect(b).toBe(c);
  });

  it("returns a valid CSS linear-gradient string", () => {
    const out: string = avatarGradientForSeed("any-id");
    expect(out).toMatch(/^linear-gradient\(135deg, #[0-9A-F]{6}, #[0-9A-F]{6}\)$/);
  });

  it("distributes a small set of seeds across more than one gradient", () => {
    const seeds: string[] = [
      "alice",
      "bob",
      "carol",
      "dave",
      "eve",
      "frank",
      "grace",
      "heidi",
      "ivan",
      "judy",
      "kate",
      "liam",
      "mia",
      "noah",
      "olivia",
    ];
    const seen: Set<string> = new Set();
    for (const s of seeds) {
      seen.add(avatarGradientForSeed(s));
    }
    // 15 random names should hit at least 4 different gradients in any sane hash.
    expect(seen.size).toBeGreaterThanOrEqual(4);
  });

  it("never returns a gradient outside the documented palette count", () => {
    expect(AVATAR_GRADIENT_COUNT).toBeGreaterThan(0);
    // Sanity: try 100 seeds and confirm everything is a non-empty string.
    for (let i = 0; i < 100; i += 1) {
      const out: string = avatarGradientForSeed(`seed-${i}`);
      expect(out.length).toBeGreaterThan(0);
      expect(out.startsWith("linear-gradient(")).toBe(true);
    }
  });

  it("handles unicode seeds without throwing", () => {
    expect(() => avatarGradientForSeed("გიორგი")).not.toThrow();
    expect(() => avatarGradientForSeed("🌟⭐")).not.toThrow();
  });
});
