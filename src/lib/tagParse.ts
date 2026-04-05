/** Normalize user input to a slug matching DB constraint `tags.slug_format`. */

/** Free tier — must stay in sync with `post_tags_enforce_tier_limit` (migration `20260401351400_post_tags_tier_limit.sql`). */
export const MAX_TAGS_PER_POST_FREE = 4;

/** Premium / admin — matches DB trigger upper bound. */
export const MAX_TAGS_PER_POST_PREMIUM = 8;

/** @deprecated Use `MAX_TAGS_PER_POST_PREMIUM` or `getMaxTagsPerPost`. */
export const MAX_TAGS_PER_POST = MAX_TAGS_PER_POST_PREMIUM;

export const MAX_TAG_SLUG_LEN = 40;

export function getMaxTagsPerPost(isPremium: boolean, isAdmin: boolean): number {
  if (isAdmin) {
    return MAX_TAGS_PER_POST_PREMIUM;
  }
  return isPremium ? MAX_TAGS_PER_POST_PREMIUM : MAX_TAGS_PER_POST_FREE;
}

export function slugifyTag(raw: string): string | null {
  let s: string = raw.trim().toLowerCase().replace(/\s+/g, "-");
  s = s.replace(/[^a-z0-9-]/g, "");
  s = s.replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (s.length < 1 || s.length > MAX_TAG_SLUG_LEN) {
    return null;
  }
  return s;
}

/** Parse comma / semicolon / newline separated tags; dedupe; capped by `maxTags`. */
export function parseTagsFromInput(
  input: string,
  maxTags: number = MAX_TAGS_PER_POST_PREMIUM,
): string[] {
  const cap: number = Math.max(1, Math.min(maxTags, MAX_TAGS_PER_POST_PREMIUM));
  const parts: string[] = input.split(/[,;\n]+/).map((s) => s.trim());
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts) {
    if (p.length === 0) {
      continue;
    }
    if (out.length >= cap) {
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
