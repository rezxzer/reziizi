/** Minimal typings for Supabase Edge Functions (Deno). Runtime provides full APIs. */
declare namespace Deno {
  namespace env {
    function get(key: string): string | undefined;
  }
  function serve(handler: (request: Request) => Response | Promise<Response>): void;
}
