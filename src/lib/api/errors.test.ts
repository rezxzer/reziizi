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

  it("returns fallback for unknown", () => {
    expect(errorMessage(null)).toBe("Something went wrong. Please try again.");
    expect(errorMessage({})).toBe("Something went wrong. Please try again.");
  });
});

describe("isPostgrestError", () => {
  it("narrows object with message string", () => {
    const e = { message: "x", code: "PGRST" };
    expect(isPostgrestError(e)).toBe(true);
  });

  it("rejects non-objects", () => {
    expect(isPostgrestError("x")).toBe(false);
  });
});
