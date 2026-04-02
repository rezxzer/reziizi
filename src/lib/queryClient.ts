import { MutationCache, QueryCache, QueryClient, isCancelledError } from "@tanstack/react-query";
import { errorMessage } from "./api/errors.ts";
import { logger } from "./logger.ts";

function logDevQueryFailure(err: unknown): void {
  if (isCancelledError(err)) {
    return;
  }
  logger.warnDev("[query]", errorMessage(err));
}

/** Default cache: reduce redundant Supabase reads; tune per-query if needed. */
export const queryClient: QueryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: logDevQueryFailure,
  }),
  mutationCache: new MutationCache({
    onError: logDevQueryFailure,
  }),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});
