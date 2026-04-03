import { describe, expect, it } from "vitest";
import { postVideoPublicUrlToStoragePath, POST_VIDEOS_BUCKET } from "./postVideoStorage.ts";

describe("postVideoPublicUrlToStoragePath", () => {
  it("parses public object URL", () => {
    const url: string = `https://abc.supabase.co/storage/v1/object/public/${POST_VIDEOS_BUCKET}/posts/u1/p1/x.mp4`;
    expect(postVideoPublicUrlToStoragePath(url)).toBe("posts/u1/p1/x.mp4");
  });

  it("strips query string", () => {
    const url: string = `https://x.supabase.co/storage/v1/object/public/${POST_VIDEOS_BUCKET}/posts/a/b/c.webm?v=1`;
    expect(postVideoPublicUrlToStoragePath(url)).toBe("posts/a/b/c.webm");
  });

  it("returns null for wrong bucket or path", () => {
    expect(
      postVideoPublicUrlToStoragePath(
        `https://x.supabase.co/storage/v1/object/public/post-images/posts/a/x.jpg`,
      ),
    ).toBeNull();
    expect(postVideoPublicUrlToStoragePath("https://example.com/posts/a/x.mp4")).toBeNull();
  });
});
