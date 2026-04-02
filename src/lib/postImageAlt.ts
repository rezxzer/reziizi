/** Accessible `alt` for post images: first line of body (truncated) or fallback. */
export function postImageAltFromBody(body: string): string {
  const firstLine: string = body.trim().split(/\r?\n/)[0] ?? "";
  const t: string = firstLine.slice(0, 80);
  return t.length > 0 ? t : "Post image";
}
