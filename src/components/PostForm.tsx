import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { errorMessage } from "../lib/errors.ts";
import {
  removePostImageObject,
  uploadPostImage,
  validatePostImageFile,
} from "../lib/postImageStorage.ts";
import {
  removePostVideoObject,
  uploadPostVideo,
  validatePostVideoFile,
} from "../lib/postVideoStorage.ts";
import { getMaxTagsPerPost, parseTagsFromInput } from "../lib/tagParse.ts";
import { attachTagsToPost } from "../lib/tags.ts";
import { getPostBodyMaxLength } from "../lib/postBodyLimits.ts";
import { supabase } from "../lib/supabaseClient.ts";

type PostFormProps = {
  onPosted: () => void;
};

export function PostForm({ onPosted }: PostFormProps): ReactElement {
  const { t } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const { isBanned, isPremium, isAdmin, loading: flagsLoading } = useProfileFlags();
  const maxLen: number = useMemo(
    () => getPostBodyMaxLength(isPremium, isAdmin),
    [isPremium, isAdmin],
  );
  const maxTagCount: number = useMemo(
    () => getMaxTagsPerPost(isPremium, isAdmin),
    [isPremium, isAdmin],
  );
  const allowVideo: boolean = isPremium || isAdmin;
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const previewTagSlugs: string[] = useMemo(
    () => parseTagsFromInput(tagsInput, maxTagCount),
    [tagsInput, maxTagCount],
  );
  const tagsPreviewActive: boolean = tagsInput.trim().length > 0;
  const [submitting, setSubmitting] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setBody((b) => (b.length > maxLen ? b.slice(0, maxLen) : b));
  }, [maxLen]);

  useEffect(() => {
    if (allowVideo || !mediaFile?.type.startsWith("video/")) {
      return;
    }
    setMediaFile(null);
    setPreviewFromFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [allowVideo, mediaFile]);

  function setPreviewFromFile(file: File | null): void {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    if (file) {
      const url: string = URL.createObjectURL(file);
      previewUrlRef.current = url;
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }

  if (!user) {
    return (
      <p className="muted">
        {t("pages.postForm.signInPrompt")}{" "}
        <Link to="/login" className="inline-link">
          {t("pages.postForm.signInLink")}
        </Link>
      </p>
    );
  }

  if (flagsLoading) {
    return (
      <p className="page-loading" role="status">
        {t("pages.common.loading")}
      </p>
    );
  }

  if (isBanned) {
    return (
      <p className="form__error" role="alert">
        {t("pages.postForm.banned")}
      </p>
    );
  }

  const userId: string = user.id;

  function validateMediaFile(file: File): string | null {
    if (file.type.startsWith("image/")) {
      return validatePostImageFile(file);
    }
    if (file.type.startsWith("video/")) {
      if (!allowVideo) {
        return t("pages.postForm.videoRequiresPremium");
      }
      return validatePostVideoFile(file);
    }
    return t("pages.postForm.mediaInvalidType");
  }

  function handleMediaPick(e: ChangeEvent<HTMLInputElement>): void {
    const file: File | undefined = e.target.files?.[0];
    if (!file) {
      return;
    }
    const validationError: string | null = validateMediaFile(file);
    if (validationError) {
      toast.error(validationError);
      e.target.value = "";
      return;
    }
    setMediaFile(file);
    setPreviewFromFile(file);
  }

  function handleRemoveMedia(): void {
    setMediaFile(null);
    setPreviewFromFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const trimmed = body.trim();
    if (trimmed.length < 1 || trimmed.length > maxLen) {
      toast.error(t("pages.postForm.bodyLength", { max: maxLen }));
      return;
    }
    const tagSlugs = parseTagsFromInput(tagsInput, maxTagCount);
    setSubmitting(true);
    const { data: post, error: insertError } = await supabase
      .from("posts")
      .insert({
        user_id: userId,
        body: trimmed,
      })
      .select("id, is_flagged")
      .single();
    if (insertError || !post) {
      setSubmitting(false);
      const raw: string =
        insertError != null ? errorMessage(insertError) : t("pages.postForm.createFailed");
      if (raw.includes("post_body_tier_limit")) {
        toast.error(t("pages.postForm.bodyTierLimit", { max: maxLen }));
      } else {
        toast.error(raw);
      }
      return;
    }

    try {
      if (mediaFile) {
        const isVideo: boolean = mediaFile.type.startsWith("video/");
        try {
          if (isVideo) {
            const { publicUrl, path } = await uploadPostVideo(mediaFile, userId, post.id);
            const { error: updateError } = await supabase
              .from("posts")
              .update({ video_url: publicUrl, image_url: null })
              .eq("id", post.id)
              .eq("user_id", userId);
            if (updateError) {
              await removePostVideoObject(path);
              throw updateError;
            }
          } else {
            const { publicUrl, path } = await uploadPostImage(mediaFile, userId, post.id);
            const { error: updateError } = await supabase
              .from("posts")
              .update({ image_url: publicUrl, video_url: null })
              .eq("id", post.id)
              .eq("user_id", userId);
            if (updateError) {
              await removePostImageObject(path);
              throw updateError;
            }
          }
        } catch (mediaErr: unknown) {
          await supabase.from("posts").delete().eq("id", post.id).eq("user_id", userId);
          setSubmitting(false);
          const raw: string = errorMessage(mediaErr);
          if (raw.includes("post_video_requires_premium") || raw.includes("post_videos")) {
            toast.error(t("pages.postForm.videoRequiresPremium"));
          } else {
            toast.error(raw);
          }
          return;
        }
      }
    } catch (err: unknown) {
      setSubmitting(false);
      toast.error(errorMessage(err));
      return;
    }

    try {
      if (tagSlugs.length > 0) {
        await attachTagsToPost(post.id, tagSlugs);
      }
    } catch (tagErr: unknown) {
      setSubmitting(false);
      const raw: string = errorMessage(tagErr);
      if (raw.includes("post_tags_tier_limit")) {
        toast.error(t("pages.postForm.tagsTierLimit", { max: maxTagCount }));
      } else {
        toast.error(raw);
      }
      onPosted();
      return;
    }
    setSubmitting(false);
    if (post.is_flagged) {
      toast.show(t("pages.postForm.flaggedAfterPost"), "info");
    }
    setBody("");
    setTagsInput("");
    setMediaFile(null);
    setPreviewFromFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onPosted();
  }

  return (
    <form className="form form--post" onSubmit={(e) => void handleSubmit(e)}>
      <label className="form__label">
        {t("pages.postForm.label")}
        <textarea
          className="form__textarea"
          name="body"
          rows={4}
          maxLength={maxLen}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t("pages.postForm.placeholder")}
          required
        />
      </label>
      <div className="post-form__image">
        <input
          ref={fileInputRef}
          className="post-form__file-input"
          type="file"
          accept={
            allowVideo
              ? "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
              : "image/jpeg,image/png,image/webp,image/gif"
          }
          aria-label={allowVideo ? t("pages.postForm.attachAria") : t("pages.postForm.attachImageAria")}
          onChange={handleMediaPick}
          disabled={submitting}
        />
        <div className="post-form__image-actions">
          <button
            type="button"
            className="btn btn--small"
            disabled={submitting}
            onClick={() => fileInputRef.current?.click()}
          >
            {allowVideo ? t("pages.postForm.addMedia") : t("pages.postForm.addMediaImage")}
          </button>
          {previewUrl ? (
            <button
              type="button"
              className="btn btn--small btn--danger"
              disabled={submitting}
              onClick={handleRemoveMedia}
            >
              {t("pages.postForm.removeMedia")}
            </button>
          ) : null}
        </div>
        {previewUrl && mediaFile ? (
          <div className="post-form__preview-wrap">
            {mediaFile.type.startsWith("video/") ? (
              <video
                className="post-form__preview"
                src={previewUrl}
                controls
                playsInline
                preload="metadata"
                aria-label={t("pages.postForm.previewAlt")}
              />
            ) : (
              <img className="post-form__preview" src={previewUrl} alt={t("pages.postForm.previewAlt")} />
            )}
            <p className="muted post-form__file-name" title={mediaFile.name}>
              {mediaFile.name}
            </p>
          </div>
        ) : null}
      </div>
      <label className="form__label">
        {t("pages.postForm.tagsLabel")}
        <input
          className="form__input"
          type="text"
          name="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder={t("pages.postForm.tagsPlaceholder")}
          autoComplete="off"
        />
      </label>
      <p className="muted form__hint">{t("pages.postForm.tagsHint", { max: maxTagCount })}</p>
      {tagsPreviewActive ? (
        <div
          className="post-form__tags-preview"
          aria-live="polite"
          aria-atomic="true"
        >
          {previewTagSlugs.length > 0 ? (
            <>
              <p className="post-form__tags-preview-label muted">
                {t("pages.postForm.tagsPreviewLabel")}
              </p>
              <ul className="tag-list post-form__tags-preview-list">
                {previewTagSlugs.map((slug) => (
                  <li key={slug}>
                    <span className="tag-chip tag-chip--preview">{slug}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="form__hint form__hint--warning" role="status">
              {t("pages.postForm.tagsPreviewInvalid")}
            </p>
          )}
        </div>
      ) : null}
      <div className="post-form__footer">
        <span className="muted">
          {body.length}/{maxLen}
        </span>
        <button type="submit" className="btn--post-submit" disabled={submitting}>
          {submitting ? t("pages.postForm.posting") : t("pages.postForm.post")}
        </button>
      </div>
    </form>
  );
}
