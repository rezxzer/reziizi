import type { ReactElement } from "react";

type InlineErrorProps = {
  message: string | null | undefined;
};

/** Shared alert line for query/form failures (uses `.form__error`). */
export function InlineError({ message }: InlineErrorProps): ReactElement | null {
  if (message == null || message === "") {
    return null;
  }
  return (
    <p className="form__error" role="alert">
      {message}
    </p>
  );
}
