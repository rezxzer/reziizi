import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { createElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { useScrollToHashedPost } from "./useScrollToHashedPost.ts";

function makeWrapper(initialEntry: string): (props: { children: ReactNode }) => ReactElement {
  return ({ children }) =>
    createElement(MemoryRouter, { initialEntries: [initialEntry] }, children);
}

describe("useScrollToHashedPost", () => {
  let scrollSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollSpy = vi.fn();
    Element.prototype.scrollIntoView = scrollSpy as unknown as (arg?: boolean | ScrollIntoViewOptions) => void;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("does nothing when there is no hash", () => {
    renderHook(() => useScrollToHashedPost(), { wrapper: makeWrapper("/") });
    vi.runAllTimers();
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("does nothing when the hash is unrelated", () => {
    renderHook(() => useScrollToHashedPost(), { wrapper: makeWrapper("/#section-3") });
    vi.runAllTimers();
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("scrolls the matching post into view immediately when the element exists", () => {
    const article = document.createElement("article");
    article.id = "post-abc-123";
    document.body.appendChild(article);

    renderHook(() => useScrollToHashedPost(), {
      wrapper: makeWrapper("/u/u1#post-abc-123"),
    });

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("retries until the post lands in the DOM (covers infinite-scroll loading)", () => {
    renderHook(() => useScrollToHashedPost(), {
      wrapper: makeWrapper("/u/u1#post-late"),
    });

    // No element yet — first attempt is a no-op.
    expect(scrollSpy).not.toHaveBeenCalled();

    // Three retries elapse, still missing.
    vi.advanceTimersByTime(600);
    expect(scrollSpy).not.toHaveBeenCalled();

    // Mount the article, advance one more interval — should scroll now.
    const article = document.createElement("article");
    article.id = "post-late";
    document.body.appendChild(article);
    vi.advanceTimersByTime(200);
    expect(scrollSpy).toHaveBeenCalledTimes(1);
  });

  it("gives up after the retry budget", () => {
    renderHook(() => useScrollToHashedPost(), {
      wrapper: makeWrapper("/u/u1#post-never"),
    });
    // 10 attempts × 200 ms = 2000 ms; advance well past.
    vi.advanceTimersByTime(5000);
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("uses 'auto' behavior when prefers-reduced-motion is set", () => {
    const matchMediaMock = vi.fn().mockImplementation((q: string) => ({
      matches: q === "(prefers-reduced-motion: reduce)",
      media: q,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
    }));
    Object.defineProperty(window, "matchMedia", {
      value: matchMediaMock,
      configurable: true,
      writable: true,
    });

    const article = document.createElement("article");
    article.id = "post-rm";
    document.body.appendChild(article);

    renderHook(() => useScrollToHashedPost(), {
      wrapper: makeWrapper("/u/u1#post-rm"),
    });

    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: "auto",
      block: "start",
    });
  });

  it("cancels the retry timer on unmount", () => {
    const { unmount } = renderHook(() => useScrollToHashedPost(), {
      wrapper: makeWrapper("/u/u1#post-cancel"),
    });
    unmount();
    // Adding the element after unmount must not trigger a stale scroll.
    const article = document.createElement("article");
    article.id = "post-cancel";
    document.body.appendChild(article);
    vi.advanceTimersByTime(5000);
    expect(scrollSpy).not.toHaveBeenCalled();
  });
});
