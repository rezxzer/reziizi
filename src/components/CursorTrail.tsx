import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/prefersReducedMotion";

interface TrailDot {
  x: number;
  y: number;
  age: number;
  hue: number;
  size: number;
}

const MAX_DOTS = 28;
const DOT_LIFETIME = 32; // frames (~530ms at 60fps)

/**
 * Mouse-following particle trail. Canvas overlay, zero layout impact.
 * Disabled when `prefers-reduced-motion` is set.
 */
export function CursorTrail(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Only show on devices with a fine pointer (no touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let mounted = true;
    const dots: TrailDot[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let lastX = -9999;
    let lastY = -9999;
    let hueShift = 210;

    function resize(): void {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouse(e: MouseEvent): void {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    window.addEventListener("mousemove", onMouse, { passive: true });

    function draw(): void {
      if (!mounted || !ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Spawn new dots when mouse moves
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3 && mouseX > 0 && mouseY > 0) {
        hueShift = (hueShift + 0.5) % 360;
        dots.push({
          x: mouseX + (Math.random() - 0.5) * 4,
          y: mouseY + (Math.random() - 0.5) * 4,
          age: 0,
          hue: hueShift,
          size: Math.random() * 2.5 + 1.5,
        });
        if (dots.length > MAX_DOTS) {
          dots.shift();
        }
      }
      lastX = mouseX;
      lastY = mouseY;

      // Render & age
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.age++;
        if (d.age > DOT_LIFETIME) {
          dots.splice(i, 1);
          continue;
        }

        const progress = d.age / DOT_LIFETIME;
        const alpha = (1 - progress) * 0.6;
        const r = d.size * (1 - progress * 0.5);

        // Inner glow
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue}, 80%, 72%, ${alpha})`;
        ctx.fill();

        // Soft outer glow
        if (alpha > 0.2) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${d.hue}, 80%, 72%, ${alpha * 0.1})`;
          ctx.fill();
        }
      }

      // Draw connecting lines between recent dots
      if (dots.length > 1) {
        ctx.beginPath();
        ctx.moveTo(dots[0].x, dots[0].y);
        for (let i = 1; i < dots.length; i++) {
          const progress = dots[i].age / DOT_LIFETIME;
          ctx.strokeStyle = `hsla(${dots[i].hue}, 60%, 65%, ${(1 - progress) * 0.12})`;
          ctx.lineWidth = 1;
          ctx.lineTo(dots[i].x, dots[i].y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
        }
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
