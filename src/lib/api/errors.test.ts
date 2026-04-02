import { describe, expect, it } from "vitest";
import { errorMessage, isPostgrestError } from "./errors.ts";

describe("errorMessage", () => {
  it("returns string input", () => {
    expect(errorMessage("oops")).toBe("oops");
  });

  it("returns Error.message", () => {
    expect(errorMessage(new Error("failed"))).toBe("failed");
  });

  it("returns Postgrest-like object message", () => {
    expect(errorMessage({ message: "rls" })).toBe("rls");
  });

  it("returns fallback when PostgREST-shaped error has empty message", () => {
    expect(errorMessage({ message: "", code: "PGRST116" })).toBe(
      "Something went wrong. Please try again.",
    );
  });

  it("returns fallback for unknown", () => {
    expect(errorMessage(null)).toBe("Something went wrong. Please try again.");
    expect(errorMessage({})).toBe("Something went wrong. Please try again.");
  });
});

describe("isPostgrestError", () => {
  it("narrows object with message and code strings", () => {
    const e = { message: "x", code: "PGRST" };
    expect(isPostgrestError(e)).toBe(true);
  });

  it("rejects message-only objects (not PostgREST errors)", () => {
    expect(isPostgrestError({ message: "x" })).toBe(false);
  });

  it("rejects non-objects", () => {
    expect(isPostgrestError("x")).toBe(false);
  });
});
