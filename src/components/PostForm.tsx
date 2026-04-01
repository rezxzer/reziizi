import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { parseTagsFromInput } from "../lib/tagParse.ts";
import { attachTagsToPost } from "../lib/tags.ts";
import { supabase } from "../lib/supabaseClient.ts";

const MAX_LEN = 10000;

type PostFormProps = {
  onPosted: () => void;
};

export function PostForm({ onPosted }: PostFormProps): ReactElement {
  const { user } = useAuth();
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const userId: string = user.id;

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
      setError(insertError?.message ?? "Could not create post");
      return;
    }
    try {
      if (tagSlugs.length > 0) {
        await attachTagsToPost(post.id, tagSlugs);
      }
    } catch (tagErr: unknown) {
      setSubmitting(false);
      setError(tagErr instanceof Error ? tagErr.message : "Post saved but tags failed");
      onPosted();
      return;
    }
    setSubmitting(false);
    setBody("");
    setTagsInput("");
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
