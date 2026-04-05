import { describe, expect, it } from "vitest";
import {
  getMaxTagsPerPost,
  MAX_TAG_SLUG_LEN,
  MAX_TAGS_PER_POST_FREE,
  MAX_TAGS_PER_POST_PREMIUM,
  parseTagsFromInput,
  slugifyTag,
} from "./tagParse.ts";

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

describe("getMaxTagsPerPost", () => {
  it("returns 8 for premium or admin, 4 for free", () => {
    expect(getMaxTagsPerPost(false, false)).toBe(MAX_TAGS_PER_POST_FREE);
    expect(getMaxTagsPerPost(true, false)).toBe(MAX_TAGS_PER_POST_PREMIUM);
    expect(getMaxTagsPerPost(false, true)).toBe(MAX_TAGS_PER_POST_PREMIUM);
  });
});

describe("parseTagsFromInput", () => {
  it("dedupes and caps at default max (8)", () => {
    const out = parseTagsFromInput("a, b, a, c, d, e, f, g, h, i, j");
    expect(out).toHaveLength(8);
    expect(out[0]).toBe("a");
    expect(out).not.toContain("j");
  });

  it("respects custom maxTags", () => {
    expect(parseTagsFromInput("a, b, c, d, e, f", 4)).toEqual(["a", "b", "c", "d"]);
  });
});
