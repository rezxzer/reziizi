import { logger } from "./logger.ts";
import { supabase } from "./supabaseClient.ts";

/** Must match `storage.buckets.id` in migration `20260401280000_add_storage_post_images.sql`. */
export const POST_IMAGES_BUCKET = "post-images";

const ALLOWED_MIME: ReadonlySet<string> = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/** Matches bucket `file_size_limit` (5 MiB). */
const MAX_BYTES = 5 * 1024 * 1024;

export function validatePostImageFile(file: File): string | null {
  if (!ALLOWED_MIME.has(file.type)) {
    return "Only JPEG, PNG, WebP, or GIF images are allowed.";
  }
  if (file.size > MAX_BYTES) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

function extensionForMime(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}

/** Path: `posts/{userId}/{postId}/{uuid}.{ext}` — must match Storage RLS. */
export function buildPostImageStoragePath(userId: string, postId: string, file: File): string {
  const ext: string = extensionForMime(file.type);
  const id: string = crypto.randomUUID();
  return `posts/${userId}/${postId}/${id}.${ext}`;
}

export type UploadedPostImage = {
  publicUrl: string;
  path: string;
};

export async function uploadPostImage(
  file: File,
  userId: string,
  postId: string,
): Promise<UploadedPostImage> {
  const path: string = buildPostImageStoragePath(userId, postId, file);
  const { error } = await supabase.storage.from(POST_IMAGES_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from(POST_IMAGES_BUCKET).getPublicUrl(path);
  return { publicUrl: data.publicUrl, path };
}

export async function removePostImageObject(path: string): Promise<void> {
  const { error } = await supabase.storage.from(POST_IMAGES_BUCKET).remove([path]);
  if (error) {
    throw error;
  }
}

/**
 * Parses object path from Supabase public URL:
 * `.../storage/v1/object/public/post-images/posts/...` → `posts/...`
 */
export function postImagePublicUrlToStoragePath(publicUrl: string): string | null {
  const marker: string = `/object/public/${POST_IMAGES_BUCKET}/`;
  const idx: number = publicUrl.indexOf(marker);
  if (idx === -1) {
    return null;
  }
  let path: string = publicUrl.slice(idx + marker.length);
  path = path.split("?")[0] ?? path;
  if (path.includes("..") || !path.startsWith("posts/")) {
    return null;
  }
  return path;
}

/**
 * Remove stored file after post row is gone (or on best-effort cleanup). Does not throw.
 */
export async function removeStoredPostImageByPublicUrl(publicUrl: string | null): Promise<void> {
  if (!publicUrl) {
    return;
  }
  const path: string | null = postImagePublicUrlToStoragePath(publicUrl);
  if (!path) {
    logger.warn("removeStoredPostImageByPublicUrl: could not parse storage path from URL");
    return;
  }
  try {
    await removePostImageObject(path);
  } catch (e: unknown) {
    logger.warn("removeStoredPostImageByPublicUrl: storage remove failed", e);
  }
}
