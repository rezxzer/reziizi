import type { ChangeEvent, ReactElement } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Avatar } from "./Avatar.tsx";
import {
  removeStoredAvatarByPublicUrl,
  uploadAvatarImage,
  validateAvatarFile,
} from "../lib/avatarStorage.ts";
import { errorMessage } from "../lib/errors.ts";
import { queryKeys } from "../lib/queryKeys.ts";
import { supabase } from "../lib/supabaseClient.ts";

type AvatarUploadSectionProps = {
  userId: string;
};

export function AvatarUploadSection({ userId }: AvatarUploadSectionProps): ReactElement {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const displayQuery = useQuery({
    queryKey: queryKeys.profile.display(userId),
    queryFn: async (): Promise<{ email: string | null; avatar_url: string | null }> => {
      const { data: row, error: qError } = await supabase
        .from("profiles")
        .select("email, avatar_url")
        .eq("id", userId)
        .maybeSingle();
      if (qError) {
        throw qError;
      }
      const r = row as { email: string | null; avatar_url: string | null } | null;
      return {
        email: r?.email ?? null,
        avatar_url: r?.avatar_url ?? null,
      };
    },
    enabled: userId.length > 0,
  });

  const label: string = displayQuery.data?.email ?? "User";
  const avatarUrl: string | null = displayQuery.data?.avatar_url ?? null;

  async function invalidateProfileAndFeed(): Promise<void> {
    await queryClient.invalidateQueries({ queryKey: queryKeys.profile.display(userId) });
    await queryClient.invalidateQueries({ queryKey: queryKeys.profile.flags(userId) });
    await queryClient.invalidateQueries({ queryKey: queryKeys.feed.all });
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file: File | undefined = e.target.files?.[0];
    if (!file) {
      return;
    }
    const v = validateAvatarFile(file);
    if (v) {
      setError(v);
      e.target.value = "";
      return;
    }
    setError(null);
    setMsg(null);
    setBusy(true);
    try {
      const previousUrl: string | null = avatarUrl;
      const { publicUrl } = await uploadAvatarImage(file, userId);
      const { error: upError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);
      if (upError) {
        await removeStoredAvatarByPublicUrl(publicUrl);
        throw upError;
      }
      if (previousUrl && previousUrl !== publicUrl) {
        await removeStoredAvatarByPublicUrl(previousUrl);
      }
      setMsg("Profile photo updated.");
      await invalidateProfileAndFeed();
    } catch (err: unknown) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  async function handleRemove(): Promise<void> {
    if (!avatarUrl || busy) {
      return;
    }
    if (!window.confirm("Remove your profile photo?")) {
      return;
    }
    setError(null);
    setMsg(null);
    setBusy(true);
    try {
      const toRemove: string = avatarUrl;
      const { error: upError } = await supabase.from("profiles").update({ avatar_url: null }).eq("id", userId);
      if (upError) {
        throw upError;
      }
      await removeStoredAvatarByPublicUrl(toRemove);
      setMsg("Profile photo removed.");
      await invalidateProfileAndFeed();
    } catch (err: unknown) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card">
      <h2 className="card__title">Profile photo</h2>
      <div className="card__body">
        <p className="muted">JPEG, PNG, WebP, or GIF — max 2 MB.</p>
        {displayQuery.isPending ? (
          <p className="page-loading" role="status">
            Loading…
          </p>
        ) : (
          <div className="avatar-settings">
            <Avatar imageUrl={avatarUrl} label={label} size="lg" />
            <div className="avatar-settings__actions">
              <input
                ref={fileRef}
                className="post-form__file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                aria-label="Choose profile photo"
                disabled={busy}
                onChange={(ev) => void handleFileChange(ev)}
              />
              <button
                type="button"
                className="btn btn--small"
                disabled={busy}
                onClick={() => fileRef.current?.click()}
              >
                {busy ? "…" : "Upload photo"}
              </button>
              {avatarUrl ? (
                <button type="button" className="btn btn--small btn--danger" disabled={busy} onClick={() => void handleRemove()}>
                  Remove photo
                </button>
              ) : null}
            </div>
          </div>
        )}
        {error ? (
          <p className="form__error" role="alert">
            {error}
          </p>
        ) : null}
        {msg ? (
          <p className="form__success" role="status">
            {msg}
          </p>
        ) : null}
      </div>
    </section>
  );
}
