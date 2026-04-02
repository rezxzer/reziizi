import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useProfileFlags } from "../hooks/useProfileFlags.ts";
import { errorMessage } from "../lib/errors.ts";
import {
  removePostImageObject,
  uploadPostImage,
  validatePostImageFile,
} from "../lib/postImageStorage.ts";
import { parseTagsFromInput } from "../lib/tagParse.ts";
import { attachTagsToPost } from "../lib/tags.ts";
import { supabase } from "../lib/supabaseClient.ts";

const MAX_LEN = 10000;

type PostFormProps = {
  onPosted: () => void;
};

export function PostForm({ onPosted }: PostFormProps): ReactElement {
  const { user } = useAuth();
  const { isBanned, loading: flagsLoading } = useProfileFlags();
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
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
        Sign in to create posts.{" "}
        <Link to="/login" className="inline-link">
          Log in
        </Link>
      </p>
    );
  }

  if (flagsLoading) {
    return (
      <p className="page-loading" role="status">
        Loading…
      </p>
    );
  }

  if (isBanned) {
    return (
      <p className="form__error" role="alert">
        Your account cannot create posts right now.
      </p>
    );
  }

  const userId: string = user.id;

  function handleImagePick(e: ChangeEvent<HTMLInputElement>): void {
    const file: File | undefined = e.target.files?.[0];
    if (!file) {
      return;
    }
    const validationError: string | null = validatePostImageFile(file);
    if (validationError) {
      setError(validationError);
      e.target.value = "";
      return;
    }
    setError(null);
    setImageFile(file);
    setPreviewFromFile(file);
  }

  function handleRemoveImage(): void {
    setImageFile(null);
    setPreviewFromFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const trimmed = body.trim();
    if (trimmed.length < 1 || trimmed.length > MAX_LEN) {
      setError(`Body must be 1–${MAX_LEN} characters.`);
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
      setError(insertError != null ? errorMessage(insertError) : "Could not create post");
      return;
    }

    try {
      if (imageFile) {
        try {
          const { publicUrl, path } = await uploadPostImage(imageFile, userId, post.id);
          const { error: updateError } = await supabase
            .from("posts")
            .update({ image_url: publicUrl })
            .eq("id", post.id)
            .eq("user_id", userId);
          if (updateError) {
            await removePostImageObject(path);
            throw updateError;
          }
        } catch (imgErr: unknown) {
          await supabase.from("posts").delete().eq("id", post.id).eq("user_id", userId);
          throw imgErr;
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
    setImageFile(null);
    setPreviewFromFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onPosted();
  }

  return (
    <form className="form form--post" onSubmit={(e) => void handleSubmit(e)}>
      <label className="form__label">
        New post
        <textarea
          className="form__textarea"
          name="body"
          rows={4}
          maxLength={MAX_LEN}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write something…"
          required
        />
      </label>
      <div className="post-form__image">
        <input
          ref={fileInputRef}
          className="post-form__file-input"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          aria-label="Attach image"
          onChange={handleImagePick}
          disabled={submitting}
        />
        <div className="post-form__image-actions">
          <button
            type="button"
            className="btn btn--small"
            disabled={submitting}
            onClick={() => fileInputRef.current?.click()}
          >
            Add image
          </button>
          {previewUrl ? (
            <button
              type="button"
              className="btn btn--small btn--danger"
              disabled={submitting}
              onClick={handleRemoveImage}
            >
              Remove image
            </button>
          ) : null}
        </div>
        {previewUrl ? (
          <div className="post-form__preview-wrap">
            <img className="post-form__preview" src={previewUrl} alt="Selected image preview" />
            {imageFile ? (
              <p className="muted post-form__file-name" title={imageFile.name}>
                {imageFile.name}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
      <label className="form__label">
        Tags (optional)
        <input
          className="form__input"
          type="text"
          name="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="e.g. news, dev, release-notes"
          autoComplete="off"
        />
      </label>
      <p className="muted form__hint">Comma-separated. Lowercase letters, numbers, hyphens. Up to 8 tags.</p>
      <div className="form__row">
        <span className="muted">
          {body.length}/{MAX_LEN}
        </span>
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? "Posting…" : "Post"}
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
