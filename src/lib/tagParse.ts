/** Normalize user input to a slug matching DB constraint `tags.slug_format`. */

export const MAX_TAGS_PER_POST = 8;
export const MAX_TAG_SLUG_LEN = 40;

export function slugifyTag(raw: string): string | null {
  let s: string = raw.trim().toLowerCase().replace(/\s+/g, "-");
  s = s.replace(/[^a-z0-9-]/g, "");
  s = s.replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (s.length < 1 || s.length > MAX_TAG_SLUG_LEN) {
    return null;
  }
  return s;
}

/** Parse comma / semicolon / newline separated tags; dedupe; max 8. */
export function parseTagsFromInput(input: string): string[] {
  const parts: string[] = input.split(/[,;\n]+/).map((s) => s.trim());
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts) {
    if (p.length === 0) {
      continue;
    }
    if (out.length >= MAX_TAGS_PER_POST) {
      break;
    }
    const slug = slugifyTag(p);
    if (!slug || seen.has(slug)) {
      continue;
    }
    seen.add(slug);
    out.push(slug);
  }
  return out;
}
