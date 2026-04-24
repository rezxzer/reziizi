import { logger } from "./logger.ts";
import { supabase } from "./supabaseClient.ts";

/** Must match `storage.buckets.id` in migration `20260401320000_add_post_videos_storage_and_video_url.sql`. */
export const POST_VIDEOS_BUCKET = "post-videos";

const ALLOWED_MIME: ReadonlySet<string> = new Set(["video/mp4", "video/webm"]);

/** Matches bucket `file_size_limit` (50 MiB). */
const MAX_BYTES = 50 * 1024 * 1024;

export function validatePostVideoFile(file: File): string | null {
  if (!ALLOWED_MIME.has(file.type)) {
    return "Only MP4 or WebM video is allowed.";
  }
  if (file.size > MAX_BYTES) {
    return "Video must be 50 MB or smaller.";
  }
  return null;
}

function extensionForMime(mime: string): string {
  switch (mime) {
    case "video/mp4":
      return "mp4";
    case "video/webm":
      return "webm";
    default:
      return "bin";
  }
}

/** Path: `posts/{userId}/{postId}/{uuid}.{ext}` — must match Storage RLS. */
export function buildPostVideoStoragePath(userId: string, postId: string, file: File): string {
  const ext: string = extensionForMime(file.type);
  const id: string = crypto.randomUUID();
  return `posts/${userId}/${postId}/${id}.${ext}`;
}

export type UploadedPostVideo = {
  publicUrl: string;
  path: string;
};

export async function uploadPostVideo(
  file: File,
  userId: string,
  postId: string,
): Promise<UploadedPostVideo> {
  const path: string = buildPostVideoStoragePath(userId, postId, file);
  const { error } = await supabase.storage.from(POST_VIDEOS_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from(POST_VIDEOS_BUCKET).getPublicUrl(path);
  if (!data?.publicUrl) {
    void supabase.storage.from(POST_VIDEOS_BUCKET).remove([path]);
    throw new Error("Failed to resolve public URL for uploaded video");
  }
  return { publicUrl: data.publicUrl, path };
}

export async function removePostVideoObject(path: string): Promise<void> {
  const { error } = await supabase.storage.from(POST_VIDEOS_BUCKET).remove([path]);
  if (error) {
    throw error;
  }
}

export function postVideoPublicUrlToStoragePath(publicUrl: string): string | null {
  const marker: string = `/object/public/${POST_VIDEOS_BUCKET}/`;
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

export async function removeStoredPostVideoByPublicUrl(publicUrl: string | null): Promise<void> {
  if (!publicUrl) {
    return;
  }
  const path: string | null = postVideoPublicUrlToStoragePath(publicUrl);
  if (!path) {
    logger.warn("removeStoredPostVideoByPublicUrl: could not parse storage path from URL");
    return;
  }
  try {
    await removePostVideoObject(path);
  } catch (e: unknown) {
    logger.warn("removeStoredPostVideoByPublicUrl: storage remove failed", e);
  }
}
