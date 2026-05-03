import { describe, expect, it } from "vitest";
import {
  EMOJI_GLYPH,
  EMOJI_ORDER,
  type EmojiCode,
} from "./emojiReactions.ts";

describe("emojiReactions catalog", () => {
  it("has a glyph for every code in EMOJI_ORDER", () => {
    for (const code of EMOJI_ORDER) {
      expect(EMOJI_GLYPH[code]).toBeTruthy();
      expect(EMOJI_GLYPH[code].length).toBeGreaterThan(0);
    }
  });

  it("EMOJI_ORDER has no duplicates", () => {
    expect(new Set(EMOJI_ORDER).size).toBe(EMOJI_ORDER.length);
  });

  it("EMOJI_ORDER and EMOJI_GLYPH expose the same set of codes", () => {
    const orderSet = new Set(EMOJI_ORDER);
    const glyphSet = new Set(Object.keys(EMOJI_GLYPH) as EmojiCode[]);
    expect(orderSet.size).toBe(glyphSet.size);
    for (const code of orderSet) {
      expect(glyphSet.has(code)).toBe(true);
    }
  });

  it("EMOJI_ORDER is frozen so consumers cannot mutate it", () => {
    expect(Object.isFrozen(EMOJI_ORDER)).toBe(true);
    expect(Object.isFrozen(EMOJI_GLYPH)).toBe(true);
  });

  it("includes the seven baseline reactions and nothing else", () => {
    expect(EMOJI_ORDER).toEqual([
      "thumbs_up",
      "heart",
      "laugh",
      "wow",
      "fire",
      "celebrate",
      "clap",
    ]);
  });
});
