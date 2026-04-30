import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  copyToClipboard,
  getPostAbsoluteUrl,
  getPublicProfileAbsoluteUrl,
  sharePostUrl,
} from "./copyToClipboard.ts";

describe("getPublicProfileAbsoluteUrl", () => {
  it("returns origin + /u/:userId when window is available", () => {
    expect(getPublicProfileAbsoluteUrl("u-1")).toBe(`${window.location.origin}/u/u-1`);
  });
});

describe("getPostAbsoluteUrl", () => {
  it("returns origin + /u/:userId#post-:postId when window is available", () => {
    expect(getPostAbsoluteUrl("u-1", "p-9")).toBe(`${window.location.origin}/u/u-1#post-p-9`);
  });
});

describe("copyToClipboard", () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls navigator.clipboard.writeText with the input", async () => {
    await copyToClipboard("hello world");
    expect(writeText).toHaveBeenCalledWith("hello world");
  });

  it("throws when the clipboard API is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
      writable: true,
    });
    await expect(copyToClipboard("x")).rejects.toThrow();
  });
});

describe("sharePostUrl", () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
      writable: true,
    });
    Object.defineProperty(navigator, "share", {
      value: undefined,
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("falls back to clipboard when navigator.share is unavailable", async () => {
    const outcome = await sharePostUrl("https://x/u/1#post-2", "title");
    expect(outcome).toBe("copied");
    expect(writeText).toHaveBeenCalledWith("https://x/u/1#post-2");
  });

  it("returns 'shared' when navigator.share resolves", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      value: share,
      configurable: true,
      writable: true,
    });
    const outcome = await sharePostUrl("https://x/p", "title");
    expect(outcome).toBe("shared");
    expect(share).toHaveBeenCalledWith({ url: "https://x/p", title: "title" });
    expect(writeText).not.toHaveBeenCalled();
  });

  it("returns 'cancelled' when the user dismisses the share sheet (AbortError)", async () => {
    const share = vi.fn().mockRejectedValue(
      Object.assign(new DOMException("user cancelled", "AbortError")),
    );
    Object.defineProperty(navigator, "share", {
      value: share,
      configurable: true,
      writable: true,
    });
    const outcome = await sharePostUrl("https://x/p", "title");
    expect(outcome).toBe("cancelled");
    expect(writeText).not.toHaveBeenCalled();
  });

  it("falls through to clipboard when share() rejects with a non-Abort error", async () => {
    const share = vi.fn().mockRejectedValue(new Error("not allowed"));
    Object.defineProperty(navigator, "share", {
      value: share,
      configurable: true,
      writable: true,
    });
    const outcome = await sharePostUrl("https://x/p", "title");
    expect(outcome).toBe("copied");
    expect(writeText).toHaveBeenCalledWith("https://x/p");
  });
});
