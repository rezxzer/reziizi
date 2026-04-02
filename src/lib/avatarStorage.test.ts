import { describe, expect, it } from "vitest";
import { avatarPublicUrlToStoragePath, AVATARS_BUCKET } from "./avatarStorage.ts";

describe("avatarPublicUrlToStoragePath", () => {
  it("extracts path from public object URL", () => {
    const url: string = `https://abc.supabase.co/storage/v1/object/public/${AVATARS_BUCKET}/avatars/u1/x.jpg`;
    expect(avatarPublicUrlToStoragePath(url)).toBe("avatars/u1/x.jpg");
  });

  it("returns null for non-avatars path", () => {
    expect(
      avatarPublicUrlToStoragePath(
        `https://x.supabase.co/storage/v1/object/public/${AVATARS_BUCKET}/other/x.jpg`,
      ),
    ).toBeNull();
  });
});
