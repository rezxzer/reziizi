import { supabase } from "./supabaseClient";

const MAX_TAG_SLUG_LEN = 40;

export async function attachTagsToPost(postId: string, slugs: string[]): Promise<void> {
  for (const slug of [...new Set(slugs)]) {
    if (slug.length < 1 || slug.length > MAX_TAG_SLUG_LEN) {
      continue;
    }
    const { data: row, error: upsertError } = await supabase
      .from("tags")
      .upsert({ slug }, { onConflict: "slug" })
      .select("id")
      .single();

    if (upsertError || !row) {
      throw upsertError ?? new Error("Failed to upsert tag");
    }

    const { error: linkError } = await supabase.from("post_tags").insert({
      post_id: postId,
      tag_id: row.id,
    });

    if (linkError) {
      throw linkError;
    }
  }
}

export async function fetchTagSlugsForPostIds(postIds: string[]): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  if (postIds.length === 0) {
    return map;
  }

  const { data, error } = await supabase
    .from("post_tags")
    .select("post_id, tags(slug)")
    .in("post_id", postIds);

  if (error) {
    throw error;
  }

  for (const row of data ?? []) {
    const pid = row.post_id as string;
    const embed = row.tags as unknown;
    let slug: string | undefined;
    if (Array.isArray(embed)) {
      slug = (embed[0] as { slug?: string } | undefined)?.slug;
    } else if (embed && typeof embed === "object" && "slug" in embed) {
      slug = (embed as { slug: string }).slug;
    }
    if (!slug) {
      continue;
    }
    const arr = map.get(pid) ?? [];
    arr.push(slug);
    map.set(pid, arr);
  }

  for (const [pid, slugs] of map) {
    map.set(pid, [...new Set(slugs)].sort());
  }

  return map;
}
