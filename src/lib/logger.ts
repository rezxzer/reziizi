const PREFIX: string = "[metafeed]";

function isDev(): boolean {
  return import.meta.env.DEV;
}

/** Client-side logging with `[metafeed]` prefix; `debug`/`info`/`warnDev` are dev-only. */
export const logger = {
  debug(...args: unknown[]): void {
    if (!isDev()) {
      return;
    }
    console.debug(PREFIX, ...args);
  },

  info(...args: unknown[]): void {
    if (!isDev()) {
      return;
    }
    console.info(PREFIX, ...args);
  },

  /** Dev-only warnings (e.g. TanStack Query failures while debugging). */
  warnDev(...args: unknown[]): void {
    if (!isDev()) {
      return;
    }
    console.warn(PREFIX, ...args);
  },

  /** Always logged (misconfiguration, deprecations). */
  warn(...args: unknown[]): void {
    console.warn(PREFIX, ...args);
  },

  error(...args: unknown[]): void {
    console.error(PREFIX, ...args);
  },
};
