import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFeedVideoBehavior } from "./useFeedVideoBehavior.ts";

type IntersectionCallback = (entries: Pick<IntersectionObserverEntry, "isIntersecting">[]) => void;

class FakeIntersectionObserver {
  static lastInstance: FakeIntersectionObserver | null = null;
  callback: IntersectionCallback;
  observed: Element | null = null;
  disconnected = false;
  constructor(callback: IntersectionCallback) {
    this.callback = callback;
    FakeIntersectionObserver.lastInstance = this;
  }
  observe(target: Element): void {
    this.observed = target;
  }
  disconnect(): void {
    this.disconnected = true;
  }
  unobserve(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

function makeFakeVideo(): HTMLVideoElement {
  const video = document.createElement("video");
  let paused = true;
  Object.defineProperty(video, "paused", {
    get: () => paused,
    configurable: true,
  });
  video.pause = vi.fn(() => {
    paused = true;
  });
  // Allow tests to flip paused on without calling real play().
  (video as unknown as { __setPlaying: (v: boolean) => void }).__setPlaying = (v: boolean) => {
    paused = !v;
  };
  return video;
}

describe("useFeedVideoBehavior", () => {
  beforeEach(() => {
    FakeIntersectionObserver.lastInstance = null;
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("does nothing when no video element is provided", () => {
    renderHook(() => useFeedVideoBehavior(null));
    expect(FakeIntersectionObserver.lastInstance).toBeNull();
  });

  it("observes the video element when provided", () => {
    const video = makeFakeVideo();
    renderHook(() => useFeedVideoBehavior(video));
    expect(FakeIntersectionObserver.lastInstance).not.toBeNull();
    expect(FakeIntersectionObserver.lastInstance?.observed).toBe(video);
  });

  it("pauses the video when it leaves the viewport while playing", () => {
    const video = makeFakeVideo();
    (video as unknown as { __setPlaying: (v: boolean) => void }).__setPlaying(true);
    renderHook(() => useFeedVideoBehavior(video));
    const observer = FakeIntersectionObserver.lastInstance;
    expect(observer).not.toBeNull();
    observer?.callback([{ isIntersecting: false }]);
    expect(video.pause).toHaveBeenCalledTimes(1);
  });

  it("does not call pause when the video is already paused", () => {
    const video = makeFakeVideo();
    renderHook(() => useFeedVideoBehavior(video));
    const observer = FakeIntersectionObserver.lastInstance;
    observer?.callback([{ isIntersecting: false }]);
    expect(video.pause).not.toHaveBeenCalled();
  });

  it("pauses this video when another video starts playing", () => {
    const ourVideo = makeFakeVideo();
    const otherVideo = makeFakeVideo();
    document.body.append(ourVideo, otherVideo);
    (ourVideo as unknown as { __setPlaying: (v: boolean) => void }).__setPlaying(true);
    renderHook(() => useFeedVideoBehavior(ourVideo));

    // Simulate a `play` event on the other video bubbling through capture phase.
    const event = new Event("play", { bubbles: true });
    Object.defineProperty(event, "target", { value: otherVideo, writable: false });
    document.dispatchEvent(event);

    expect(ourVideo.pause).toHaveBeenCalledTimes(1);

    ourVideo.remove();
    otherVideo.remove();
  });

  it("ignores its own play event", () => {
    const video = makeFakeVideo();
    document.body.append(video);
    (video as unknown as { __setPlaying: (v: boolean) => void }).__setPlaying(true);
    renderHook(() => useFeedVideoBehavior(video));

    const event = new Event("play", { bubbles: true });
    Object.defineProperty(event, "target", { value: video, writable: false });
    document.dispatchEvent(event);

    expect(video.pause).not.toHaveBeenCalled();

    video.remove();
  });

  it("disconnects observer and removes listener on unmount", () => {
    const video = makeFakeVideo();
    const removeSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useFeedVideoBehavior(video));
    const observer = FakeIntersectionObserver.lastInstance;
    unmount();
    expect(observer?.disconnected).toBe(true);
    expect(removeSpy).toHaveBeenCalledWith("play", expect.any(Function), true);
  });
});
