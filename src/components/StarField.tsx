import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/prefersReducedMotion";

/** Ambient floating star particles. Pure canvas, zero dependencies. */
export function StarField(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let mounted = true;

    /* ── Responsive sizing ── */
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

    /* ── Particle pool ── */
    const COUNT = Math.min(70, Math.round((window.innerWidth * window.innerHeight) / 18000));

    interface Star {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
      hue: number;
    }

    const stars: Star[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.008 + 0.003,
      hue: Math.random() < 0.3 ? 210 : Math.random() < 0.5 ? 330 : 270,
    }));

    /* ── Mouse interaction ── */
    let mouseX = -9999;
    let mouseY = -9999;

    function onMouse(e: MouseEvent): void {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    window.addEventListener("mousemove", onMouse, { passive: true });

    /* ── Render loop ── */
    function draw(): void {
      if (!mounted || !ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        /* Drift */
        s.x += s.vx;
        s.y += s.vy;

        /* Wrap edges */
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;

        /* Pulse */
        s.pulse += s.pulseSpeed;
        const pulseAlpha = s.alpha + Math.sin(s.pulse) * 0.18;

        /* Mouse proximity glow */
        const dx = s.x - mouseX;
        const dy = s.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 180);
        const finalAlpha = Math.min(1, pulseAlpha + proximity * 0.5);
        const finalR = s.r + proximity * 1.8;

        /* Draw */
        ctx.beginPath();
        ctx.arc(s.x, s.y, finalR, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 75%, ${finalAlpha})`;
        ctx.fill();

        /* Outer glow for brighter/closer stars */
        if (finalAlpha > 0.45) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, finalR * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 80%, 75%, ${finalAlpha * 0.12})`;
          ctx.fill();
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
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
