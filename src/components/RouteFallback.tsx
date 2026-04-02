import type { ReactElement } from "react";

/** Shown while a lazy-loaded route chunk is loading. */
export function RouteFallback(): ReactElement {
  return (
    <p className="page-loading" role="status">
      Loading…
    </p>
  );
}
