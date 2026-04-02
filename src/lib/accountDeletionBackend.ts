/**
 * Shared account-deletion logic for server runtimes (e.g. Vercel `/api/delete-account`).
 * Edge Function (`supabase/functions/delete-account`) duplicates this for Deno deploy.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

const AVATARS_BUCKET: string = "avatars";
const POST_IMAGES_BUCKET: string = "post-images";
const REMOVE_CHUNK: number = 50;

function isFolder(item: { metadata: Record<string, unknown> | null }): boolean {
  return item.metadata === null;
}

async function collectFilePaths(
  admin: SupabaseClient,
  bucket: string,
  prefix: string,
): Promise<string[]> {
  const out: string[] = [];
  let offset = 0;
  const limit = 1000;
  for (;;) {
    const { data, error } = await admin.storage.from(bucket).list(prefix, {
      limit,
      offset,
      sortBy: { column: "name", order: "asc" },
    });
    if (error) {
      throw error;
    }
    const batch = data ?? [];
    if (batch.length === 0) {
      break;
    }
    for (const item of batch) {
      const childPath = prefix ? `${prefix}/${item.name}` : item.name;
      if (isFolder(item)) {
        const nested = await collectFilePaths(admin, bucket, childPath);
        out.push(...nested);
      } else {
        out.push(childPath);
      }
    }
    if (batch.length < limit) {
      break;
    }
    offset += limit;
  }
  return out;
}

async function removePaths(admin: SupabaseClient, bucket: string, paths: string[]): Promise<void> {
  for (let i = 0; i < paths.length; i += REMOVE_CHUNK) {
    const slice = paths.slice(i, i + REMOVE_CHUNK);
    const { error } = await admin.storage.from(bucket).remove(slice);
    if (error) {
      throw error;
    }
  }
}

export async function deleteUserStorage(admin: SupabaseClient, userId: string): Promise<void> {
  const avatarPrefix = `avatars/${userId}`;
  const postPrefix = `posts/${userId}`;
  const avatarPaths = await collectFilePaths(admin, AVATARS_BUCKET, avatarPrefix);
  await removePaths(admin, AVATARS_BUCKET, avatarPaths);
  const postPaths = await collectFilePaths(admin, POST_IMAGES_BUCKET, postPrefix);
  await removePaths(admin, POST_IMAGES_BUCKET, postPaths);
}

export async function deleteAuthUser(admin: SupabaseClient, userId: string): Promise<void> {
  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) {
    throw error;
  }
}
