import { describe, expect, it } from "vitest";
import { canShowEmail } from "./profileView.ts";

describe("canShowEmail", () => {
  const base = {
    id: "u1",
    email: "a@b.com",
    avatar_url: null,
    display_name: null,
    bio: null,
    searchable: false,
    is_private: false,
    is_banned: false,
  };

  it("shows for owner", () => {
    expect(canShowEmail(base, "u1")).toBe(true);
  });

  it("shows for others when searchable", () => {
    expect(canShowEmail({ ...base, searchable: true }, "u2")).toBe(true);
  });

  it("hides for others when not searchable", () => {
    expect(canShowEmail(base, "u2")).toBe(false);
  });

  it("hides when logged out and not searchable", () => {
    expect(canShowEmail(base, null)).toBe(false);
  });

  it("shows when logged out and searchable", () => {
    expect(canShowEmail({ ...base, searchable: true }, null)).toBe(true);
  });
});