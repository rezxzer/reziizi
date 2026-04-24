/**
 * Returns `input` as a canonical URL string if it parses as http(s),
 * otherwise `null`. Use for any user-submitted URL that will be rendered
 * as an `href`, to block `javascript:`, `data:`, `file:`, etc.
 */
export function safeHttpUrl(input: string | null | undefined): string | null {
  if (!input) {
    return null;
  }
  const trimmed: string = input.trim();
  if (trimmed.length === 0) {
    return null;
  }
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return null;
  }
  return parsed.toString();
}
