import { describe, expect, it } from "vitest";
import { FEED_AD_VIDEOS_BUCKET, feedAdVideoPublicUrlToStoragePath, validateFeedAdVideoFile } from "./feedAdVideoStorage.ts";

describe("validateFeedAdVideoFile", () => {
  it("rejects wrong mime", () => {
    expect(validateFeedAdVideoFile(new File([], "x.mov", { type: "video/quicktime" }))).toBe("mime");
  });

  it("accepts mp4", () => {
    expect(validateFeedAdVideoFile(new File([new Uint8Array([0])], "x.mp4", { type: "video/mp4" }))).toBe(null);
  });
});

describe("feedAdVideoPublicUrlToStoragePath", () => {
  it("parses public URL", () => {
    const url = `https://example.com/object/public/${FEED_AD_VIDEOS_BUCKET}/feed_top/abc.mp4`;
    expect(feedAdVideoPublicUrlToStoragePath(url)).toBe("feed_top/abc.mp4");
  });

  it("returns null for other buckets", () => {
    expect(feedAdVideoPublicUrlToStoragePath("https://example.com/object/public/post-videos/posts/x/y/z.mp4")).toBe(
      null,
    );
  });
});
