import { describe, expect, it } from "vitest";
import { MAX_TAG_SLUG_LEN, parseTagsFromInput, slugifyTag } from "./tagParse.ts";

describe("slugifyTag", () => {
  it("normalizes spaces and case", () => {
    expect(slugifyTag("  Hello World  ")).toBe("hello-world");
  });

  it("returns null for invalid or empty", () => {
    expect(slugifyTag("!!!")).toBe(null);
    expect(slugifyTag("")).toBe(null);
  });

  it("returns null when slug too long", () => {
    const long = "a".repeat(MAX_TAG_SLUG_LEN + 1);
    expect(slugifyTag(long)).toBe(null);
  });
});

describe("parseTagsFromInput", () => {
  it("dedupes and caps at 8", () => {
    const out = parseTagsFromInput("a, b, a, c, d, e, f, g, h, i, j");
    expect(out).toHaveLength(8);
    expect(out[0]).toBe("a");
    expect(out).not.toContain("j");
  });
});
