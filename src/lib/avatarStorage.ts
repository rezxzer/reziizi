import { logger } from "./logger.ts";
import { supabase } from "./supabaseClient.ts";

/** Must match `storage.buckets.id` in migration `20260401300000_add_profiles_avatar_url_and_storage_avatars.sql`. */
export const AVATARS_BUCKET = "avatars";

const ALLOWED_MIME: ReadonlySet<string> = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/** Matches bucket `file_size_limit` (2 MiB). */
const MAX_BYTES = 2 * 1024 * 1024;

export function validateAvatarFile(file: File): string | null {
  if (!ALLOWED_MIME.has(file.type)) {
    return "Only JPEG, PNG, WebP, or GIF images are allowed.";
  }
  if (file.size > MAX_BYTES) {
    return "Image must be 2 MB or smaller.";
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

/** Path: `avatars/{userId}/{uuid}.{ext}` — must match Storage RLS. */
export function buildAvatarStoragePath(userId: string, file: File): string {
  const ext: string = extensionForMime(file.type);
  const id: string = crypto.randomUUID();
  return `avatars/${userId}/${id}.${ext}`;
}

export type UploadedAvatar = {
  publicUrl: string;
  path: string;
};

export async function uploadAvatarImage(file: File, userId: string): Promise<UploadedAvatar> {
  const path: string = buildAvatarStoragePath(userId, file);
  const { error } = await supabase.storage.from(AVATARS_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from(AVATARS_BUCKET).getPublicUrl(path);
  return { publicUrl: data.publicUrl, path };
}

export async function removeAvatarObject(path: string): Promise<void> {
  const { error } = await supabase.storage.from(AVATARS_BUCKET).remove([path]);
  if (error) {
    throw error;
  }
}

export function avatarPublicUrlToStoragePath(publicUrl: string): string | null {
  const marker: string = `/object/public/${AVATARS_BUCKET}/`;
  const idx: number = publicUrl.indexOf(marker);
  if (idx === -1) {
    return null;
  }
  let path: string = publicUrl.slice(idx + marker.length);
  path = path.split("?")[0] ?? path;
  if (path.includes("..") || !path.startsWith("avatars/")) {
    return null;
  }
  return path;
}

/** Best-effort remove after profile no longer references URL. Does not throw. */
export async function removeStoredAvatarByPublicUrl(publicUrl: string | null): Promise<void> {
  if (!publicUrl) {
    return;
  }
  const path: string | null = avatarPublicUrlToStoragePath(publicUrl);
  if (!path) {
    logger.warn("removeStoredAvatarByPublicUrl: could not parse storage path from URL");
    return;
  }
  try {
    await removeAvatarObject(path);
  } catch (e: unknown) {
    logger.warn("removeStoredAvatarByPublicUrl: storage remove failed", e);
  }
}
