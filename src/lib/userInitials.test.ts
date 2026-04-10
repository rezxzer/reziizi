import { describe, expect, it } from "vitest";
import { emailLocalPart, initialsFromVisibleLabel, navAvatarInitialsFromUser } from "./userInitials.ts";

describe("initialsFromVisibleLabel", () => {
  it("uses first and last letter for a single word", () => {
    expect(initialsFromVisibleLabel("Admin")).toBe("AN");
    expect(initialsFromVisibleLabel("Maria")).toBe("MA");
  });

  it("uses first letter of first and last word", () => {
    expect(initialsFromVisibleLabel("John Doe")).toBe("JD");
  });
});

describe("emailLocalPart", () => {
  it("strips domain and plus tag", () => {
    expect(emailLocalPart("user+news@example.com")).toBe("user");
    expect(emailLocalPart("a@b.co")).toBe("a");
  });
});

describe("navAvatarInitialsFromUser", () => {
  it("prefers display name", () => {
    expect(navAvatarInitialsFromUser("Admin", "x@y.com")).toBe("AN");
  });

  it("uses dotted email local as two-part name", () => {
    expect(navAvatarInitialsFromUser(undefined, "john.doe@mail.com")).toBe("JD");
  });

  it("falls back to RZ when empty", () => {
    expect(navAvatarInitialsFromUser(undefined, undefined)).toBe("RZ");
  });
});
