import type { ChangeEvent, ReactElement } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Avatar } from "./Avatar.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
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
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

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

  const label: string = displayQuery.data?.email ?? t("settings.avatarUserFallback");
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
      toast.error(v);
      e.target.value = "";
      return;
    }
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
      toast.success(t("settings.avatarUpdated"));
      await invalidateProfileAndFeed();
    } catch (err: unknown) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  async function handleRemove(): Promise<void> {
    if (!avatarUrl || busy) {
      return;
    }
    if (!window.confirm(t("settings.avatarRemoveConfirm"))) {
      return;
    }
    setBusy(true);
    try {
      const toRemove: string = avatarUrl;
      const { error: upError } = await supabase.from("profiles").update({ avatar_url: null }).eq("id", userId);
      if (upError) {
        throw upError;
      }
      await removeStoredAvatarByPublicUrl(toRemove);
      toast.success(t("settings.avatarRemoved"));
      await invalidateProfileAndFeed();
    } catch (err: unknown) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card">
      <h2 className="card__title">{t("settings.avatarSectionTitle")}</h2>
      <div className="card__body">
        <p className="muted">{t("settings.avatarFormatHint")}</p>
        {displayQuery.isPending ? (
          <p className="page-loading" role="status">
            {t("pages.common.loading")}
          </p>
        ) : (
          <div className="avatar-settings">
            <Avatar imageUrl={avatarUrl} label={label} seed={userId} size="lg" />
            <div className="avatar-settings__actions">
              <input
                ref={fileRef}
                className="post-form__file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                aria-label={t("settings.avatarChooseAria")}
                disabled={busy}
                onChange={(ev) => void handleFileChange(ev)}
              />
              <button
                type="button"
                className="btn btn--small"
                disabled={busy}
                onClick={() => fileRef.current?.click()}
              >
                {busy ? "…" : t("settings.avatarUpload")}
              </button>
              {avatarUrl ? (
                <button type="button" className="btn btn--small btn--danger" disabled={busy} onClick={() => void handleRemove()}>
                  {t("settings.avatarRemove")}
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
