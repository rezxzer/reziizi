import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useI18n } from "../contexts/I18nContext.tsx";
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
import { parseTagsFromInput } from "../lib/tagParse.ts";
import { attachTagsToPost } from "../lib/tags.ts";
import { supabase } from "../lib/supabaseClient.ts";

const MAX_LEN = 10000;

type PostFormProps = {
  onPosted: () => void;
};

export function PostForm({ onPosted }: PostFormProps): ReactElement {
  const { t } = useI18n();
  const { user } = useAuth();
  const { isBanned, loading: flagsLoading } = useProfileFlags();
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState<string | null>(null);
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
      setError(validationError);
      e.target.value = "";
      return;
    }
    setError(null);
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
    if (trimmed.length < 1 || trimmed.length > MAX_LEN) {
      setError(t("pages.postForm.bodyLength", { max: MAX_LEN }));
      return;
    }
    const tagSlugs = parseTagsFromInput(tagsInput);
    setError(null);
    setSubmitting(true);
    const { data: post, error: insertError } = await supabase
      .from("posts")
      .insert({
        user_id: userId,
        body: trimmed,
      })
      .select("id")
      .single();
    if (insertError || !post) {
      setSubmitting(false);
      setError(insertError != null ? errorMessage(insertError) : t("pages.postForm.createFailed"));
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
          throw mediaErr;
        }
      }
    } catch (err: unknown) {
      setSubmitting(false);
      setError(errorMessage(err));
      return;
    }

    try {
      if (tagSlugs.length > 0) {
        await attachTagsToPost(post.id, tagSlugs);
      }
    } catch (tagErr: unknown) {
      setSubmitting(false);
      setError(errorMessage(tagErr));
      onPosted();
      return;
    }
    setSubmitting(false);
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
          maxLength={MAX_LEN}
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
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
          aria-label={t("pages.postForm.attachAria")}
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
            {t("pages.postForm.addMedia")}
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
      <p className="muted form__hint">{t("pages.postForm.tagsHint")}</p>
      <div className="form__row">
        <span className="muted">
          {body.length}/{MAX_LEN}
        </span>
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? t("pages.postForm.posting") : t("pages.postForm.post")}
        </button>
      </div>
      {error ? (
        <p className="form__error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
