import { logger } from "./logger.ts";
import { supabase } from "./supabaseClient.ts";

/** Matches `storage.buckets.id` in migration `20260401352500_add_ad_slots_video_url_and_storage.sql`. */
export const FEED_AD_VIDEOS_BUCKET = "feed-ad-videos";

const ALLOWED_MIME: ReadonlySet<string> = new Set(["video/mp4", "video/webm"]);

/** Matches bucket `file_size_limit` (50 MiB). */
const MAX_BYTES = 50 * 1024 * 1024;

export type FeedAdVideoValidationError = "mime" | "size";

export function validateFeedAdVideoFile(file: File): FeedAdVideoValidationError | null {
  if (!ALLOWED_MIME.has(file.type)) {
    return "mime";
  }
  if (file.size > MAX_BYTES) {
    return "size";
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

/** Path must match Storage RLS: `feed_top/{uuid}.{ext}` */
export function buildFeedAdVideoStoragePath(file: File): string {
  const ext: string = extensionForMime(file.type);
  return `feed_top/${crypto.randomUUID()}.${ext}`;
}

export type UploadedFeedAdVideo = {
  publicUrl: string;
  path: string;
};

export async function uploadFeedAdVideo(file: File): Promise<UploadedFeedAdVideo> {
  const path: string = buildFeedAdVideoStoragePath(file);
  const { error } = await supabase.storage.from(FEED_AD_VIDEOS_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from(FEED_AD_VIDEOS_BUCKET).getPublicUrl(path);
  if (!data?.publicUrl) {
    void supabase.storage.from(FEED_AD_VIDEOS_BUCKET).remove([path]);
    throw new Error("Failed to resolve public URL for uploaded ad video");
  }
  return { publicUrl: data.publicUrl, path };
}

export async function removeFeedAdVideoObject(path: string): Promise<void> {
  const { error } = await supabase.storage.from(FEED_AD_VIDEOS_BUCKET).remove([path]);
  if (error) {
    throw error;
  }
}

export function feedAdVideoPublicUrlToStoragePath(publicUrl: string): string | null {
  const marker: string = `/object/public/${FEED_AD_VIDEOS_BUCKET}/`;
  const idx: number = publicUrl.indexOf(marker);
  if (idx === -1) {
    return null;
  }
  let path: string = publicUrl.slice(idx + marker.length);
  path = path.split("?")[0] ?? path;
  if (path.includes("..") || !path.startsWith("feed_top/")) {
    return null;
  }
  return path;
}

export async function removeStoredFeedAdVideoByPublicUrl(publicUrl: string | null): Promise<void> {
  if (!publicUrl) {
    return;
  }
  const path: string | null = feedAdVideoPublicUrlToStoragePath(publicUrl);
  if (!path) {
    logger.warn("removeStoredFeedAdVideoByPublicUrl: could not parse storage path from URL");
    return;
  }
  try {
    await removeFeedAdVideoObject(path);
  } catch (e: unknown) {
    logger.warn("removeStoredFeedAdVideoByPublicUrl: storage remove failed", e);
  }
}
