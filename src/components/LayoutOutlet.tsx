import { QueryErrorResetBoundary } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useEffect, useMemo, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext.tsx";
import { RouteErrorBoundary } from "./RouteErrorBoundary.tsx";

type TransitionKind = "none" | "page-turn" | "route-glide" | "route-card" | "route-minimal";

const NAV_ORDER: readonly string[] = [
  "/",
  "/search",
  "/messages",
  "/notifications",
  "/profile",
  "/settings",
  "/admin",
  "/security",
  "/legal",
];

function normalizeTransitionPath(pathname: string): string | null {
  if (pathname === "/") {
    return "/";
  }
  if (pathname.startsWith("/search")) {
    return "/search";
  }
  if (pathname.startsWith("/messages")) {
    return "/messages";
  }
  if (pathname.startsWith("/notifications")) {
    return "/notifications";
  }
  if (pathname.startsWith("/profile")) {
    return "/profile";
  }
  if (pathname.startsWith("/settings")) {
    return "/settings";
  }
  if (pathname.startsWith("/admin")) {
    return "/admin";
  }
  if (pathname.startsWith("/security")) {
    return "/security";
  }
  if (pathname.startsWith("/legal")) {
    return "/legal";
  }
  return null;
}

function resolveTransitionKind(previousPathname: string, pathname: string): TransitionKind {
  const prev = normalizeTransitionPath(previousPathname);
  const next = normalizeTransitionPath(pathname);
  if (!prev || !next || prev === next) {
    return "none";
  }
  if ((prev === "/" && next === "/search") || (prev === "/search" && next === "/")) {
    return "page-turn";
  }
  if (
    prev === "/admin" ||
    next === "/admin" ||
    prev === "/security" ||
    next === "/security" ||
    prev === "/legal" ||
    next === "/legal"
  ) {
    return "route-minimal";
  }
  if (prev === "/messages" || next === "/messages" || prev === "/notifications" || next === "/notifications") {
    return "route-glide";
  }
  if (prev === "/profile" || next === "/profile" || prev === "/settings" || next === "/settings") {
    return "route-card";
  }
  return "route-glide";
}

function resolveDirectionClass(previousPathname: string, pathname: string): "forward" | "backward" {
  const prev = normalizeTransitionPath(previousPathname);
  const next = normalizeTransitionPath(pathname);
  const prevIndex = prev ? NAV_ORDER.indexOf(prev) : -1;
  const nextIndex = next ? NAV_ORDER.indexOf(next) : -1;
  if (prevIndex === -1 || nextIndex === -1) {
    return "forward";
  }
  return nextIndex >= prevIndex ? "forward" : "backward";
}

/** Main content: route outlet + query reset + render error recovery. */
export function LayoutOutlet(): ReactElement {
  const { t } = useI18n();
  const location = useLocation();
  const previousPathRef = useRef<string>(location.pathname);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioUnlockedRef = useRef<boolean>(false);
  const previousPathname = previousPathRef.current;
  const pathname = location.pathname;
  const transitionKind: TransitionKind = resolveTransitionKind(previousPathname, pathname);
  const directionClass: "forward" | "backward" = resolveDirectionClass(previousPathname, pathname);
  const showTransition = transitionKind !== "none";
  const motionDebugEnabled = useMemo<boolean>(() => {
    if (!import.meta.env.DEV) {
      return false;
    }
    try {
      return window.localStorage.getItem("metafeed.motionDebug") === "1";
    } catch {
      return false;
    }
  }, []);
  const transitionClassName = showTransition
    ? `route-shell route-shell--${transitionKind} route-shell--${transitionKind}-${directionClass}`
    : "route-shell";

  useEffect(() => {
    previousPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    function unlockAudio(): void {
      audioUnlockedRef.current = true;
    }

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  useEffect(() => {
    if (!showTransition || !audioUnlockedRef.current) {
      return;
    }

    const AudioContextCtor: typeof AudioContext | undefined =
      window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }

    const context = audioContextRef.current ?? new AudioContextCtor();
    audioContextRef.current = context;
    if (context.state === "suspended") {
      void context.resume();
    }

    const now = context.currentTime;
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.connect(context.destination);

    if (transitionKind === "page-turn") {
      /* ── Cinematic whoosh: filtered noise-like sweep via two detuned oscs ── */
      master.gain.exponentialRampToValueAtTime(0.10, now + 0.03);
      master.gain.exponentialRampToValueAtTime(0.06, now + 0.18);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      /* Low body sweep */
      const body = context.createOscillator();
      body.type = "sine";
      body.frequency.setValueAtTime(260, now);
      body.frequency.exponentialRampToValueAtTime(120, now + 0.34);
      body.connect(master);
      body.start(now);
      body.stop(now + 0.38);

      /* Airy overtone for "whoosh" texture */
      const air = context.createOscillator();
      air.type = "triangle";
      air.frequency.setValueAtTime(880, now);
      air.frequency.exponentialRampToValueAtTime(340, now + 0.28);
      const airGain = context.createGain();
      airGain.gain.setValueAtTime(0.04, now);
      airGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      air.connect(airGain);
      airGain.connect(context.destination);
      air.start(now);
      air.stop(now + 0.38);
    } else if (transitionKind === "route-card") {
      /* ── Soft pop-up thud ── */
      master.gain.exponentialRampToValueAtTime(0.09, now + 0.01);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      const body = context.createOscillator();
      body.type = "sine";
      body.frequency.setValueAtTime(320, now);
      body.frequency.exponentialRampToValueAtTime(180, now + 0.15);
      body.connect(master);
      body.start(now);
      body.stop(now + 0.18);
    } else if (transitionKind === "route-minimal") {
      /* ── Tiny tick ── */
      master.gain.exponentialRampToValueAtTime(0.04, now + 0.008);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      const body = context.createOscillator();
      body.type = "sine";
      body.frequency.setValueAtTime(640, now);
      body.frequency.exponentialRampToValueAtTime(520, now + 0.06);
      body.connect(master);
      body.start(now);
      body.stop(now + 0.07);
    } else {
      /* ── Glide: smooth lateral swish ── */
      master.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.20);

      const body = context.createOscillator();
      body.type = "sine";
      body.frequency.setValueAtTime(440, now);
      body.frequency.exponentialRampToValueAtTime(240, now + 0.17);
      body.connect(master);
      body.start(now);
      body.stop(now + 0.20);
    }
  }, [showTransition, transitionKind]);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <RouteErrorBoundary
          onReset={reset}
          title={t("errors.routeTitle")}
          body={t("errors.routeBody")}
          retryLabel={t("errors.tryAgain")}
          homeLink={t("errors.homeLink")}
        >
          <div
            key={location.key}
            className={motionDebugEnabled ? `${transitionClassName} route-shell--debug` : transitionClassName}
            data-transition-kind={transitionKind}
            data-transition-direction={directionClass}
          >
            <Outlet />
          </div>
        </RouteErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
