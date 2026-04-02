import { describe, expect, it } from "vitest";
import { postImagePublicUrlToStoragePath, POST_IMAGES_BUCKET } from "./postImageStorage.ts";

describe("postImagePublicUrlToStoragePath", () => {
  it("extracts path from public object URL", () => {
    const url: string = `https://abc.supabase.co/storage/v1/object/public/${POST_IMAGES_BUCKET}/posts/u1/p1/x.jpg`;
    expect(postImagePublicUrlToStoragePath(url)).toBe("posts/u1/p1/x.jpg");
  });

  it("strips query string", () => {
    const url: string = `https://x.supabase.co/storage/v1/object/public/${POST_IMAGES_BUCKET}/posts/a/b/c.png?v=1`;
    expect(postImagePublicUrlToStoragePath(url)).toBe("posts/a/b/c.png");
  });

  it("returns null for wrong bucket or path", () => {
    expect(postImagePublicUrlToStoragePath("https://evil.com/other/posts/x")).toBeNull();
    expect(
      postImagePublicUrlToStoragePath(
        `https://x.supabase.co/storage/v1/object/public/${POST_IMAGES_BUCKET}/other/x.jpg`,
      ),
    ).toBeNull();
  });
});
