import { useEffect } from "react";

/**
 * Pause a feed video when it scrolls out of view, and pause it when any other
 * video on the page starts playing. Solves the mobile UX where multiple feed
 * videos play simultaneously and audio bleeds across cards.
 *
 * Pass the element via a setState ref so the effect re-runs when the video
 * mounts in a conditional render (e.g. once async ad data loads):
 *
 * ```tsx
 * const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
 * useFeedVideoBehavior(videoEl);
 * return <video ref={setVideoEl} ... />;
 * ```
 */
export function useFeedVideoBehavior(video: HTMLVideoElement | null): void {
  useEffect(() => {
    if (!video) {
      return;
    }

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting && !video.paused) {
              video.pause();
            }
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(video);
    }

    const onAnyPlay = (event: Event): void => {
      const target = event.target;
      if (target instanceof HTMLVideoElement && target !== video && !video.paused) {
        video.pause();
      }
    };
    document.addEventListener("play", onAnyPlay, true);

    return () => {
      observer?.disconnect();
      document.removeEventListener("play", onAnyPlay, true);
    };
  }, [video]);
}
