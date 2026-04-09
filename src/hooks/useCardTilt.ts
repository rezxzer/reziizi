import { useEffect } from "react";
import { prefersReducedMotion } from "../lib/prefersReducedMotion";

const TILT_MAX = 4; // degrees
const PERSPECTIVE = 800; // px

/**
 * Adds interactive 3D tilt to `.card` elements on mouse hover.
 * The card subtly rotates toward the mouse position.
 * Disabled for `prefers-reduced-motion` and touch devices.
 */
export function useCardTilt(): void {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function handleMouseMove(e: MouseEvent): void {
      const target = (e.target as HTMLElement).closest?.(".card");
      if (!target || !(target instanceof HTMLElement)) return;

      const rect = target.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1

      const rotateX = (0.5 - y) * TILT_MAX; // mouse at top → tilt up
      const rotateY = (x - 0.5) * TILT_MAX; // mouse at right → tilt right

      target.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    }

    function handleMouseLeave(e: MouseEvent): void {
      const target = (e.target as HTMLElement).closest?.(".card");
      if (!target || !(target instanceof HTMLElement)) return;

      target.style.transform = "";
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true, capture: true });

    // Also handle mouseleave on card boundaries
    function handleOut(e: MouseEvent): void {
      const relTarget = e.relatedTarget as HTMLElement | null;
      const card = (e.target as HTMLElement).closest?.(".card");
      if (!card || !(card instanceof HTMLElement)) return;

      // Check if mouse left the card
      if (!relTarget || !card.contains(relTarget)) {
        card.style.transform = "";
      }
    }
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave, { capture: true });
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);
}
