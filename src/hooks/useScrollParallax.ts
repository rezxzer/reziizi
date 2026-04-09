import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/prefersReducedMotion";

/**
 * Attach to a scroll container to apply `data-parallax="visible"` to
 * `.post-card` elements as they scroll into view (staggered).
 * Uses IntersectionObserver for performance.
 */
export function useScrollParallax(): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const container = ref.current ?? document;
    const observer = new IntersectionObserver(
      (entries) => {
        let delay = 0;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (!el.dataset.parallax) {
              setTimeout(() => {
                el.dataset.parallax = "visible";
              }, delay);
              delay += 60; // stagger 60ms between each card
            }
            observer.unobserve(el);
          }
        }
      },
      {
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.05,
      },
    );

    // Observe all post-cards
    const cards = (container === document ? document : container).querySelectorAll(".post-card");
    cards.forEach((card) => observer.observe(card));

    // Also observe future cards via MutationObserver
    const mutObs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList.contains("post-card")) {
              observer.observe(node);
            }
            node.querySelectorAll?.(".post-card").forEach((c) => observer.observe(c));
          }
        }
      }
    });

    const root = container === document ? document.body : container;
    mutObs.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObs.disconnect();
    };
  }, []);

  return ref;
}
