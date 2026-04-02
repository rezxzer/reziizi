import { describe, expect, it } from "vitest";
import { MIN_PASSWORD_LENGTH, isPasswordLongEnough } from "./passwordPolicy.ts";

describe("isPasswordLongEnough", () => {
  it("accepts at least MIN_PASSWORD_LENGTH", () => {
    expect(isPasswordLongEnough("a".repeat(MIN_PASSWORD_LENGTH))).toBe(true);
  });

  it("rejects shorter", () => {
    expect(isPasswordLongEnough("a".repeat(MIN_PASSWORD_LENGTH - 1))).toBe(false);
  });
});
