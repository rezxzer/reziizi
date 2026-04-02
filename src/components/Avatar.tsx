import type { ReactElement } from "react";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  imageUrl: string | null;
  /** Visible name or email for initial fallback and accessible name. */
  label: string;
  size?: AvatarSize;
};

const sizeClass: Record<AvatarSize, string> = {
  sm: "avatar--sm",
  md: "avatar--md",
  lg: "avatar--lg",
};

function initialFromLabel(label: string): string {
  const t: string = label.trim();
  if (t.length === 0) {
    return "?";
  }
  return t[0]!.toUpperCase();
}

export function Avatar({ imageUrl, label, size = "md" }: AvatarProps): ReactElement {
  const cls: string = `avatar ${sizeClass[size]}`;
  if (imageUrl) {
    return (
      <span className={cls}>
        <img className="avatar__img" src={imageUrl} alt={label} loading="lazy" decoding="async" />
      </span>
    );
  }
  return (
    <span className={cls} role="img" aria-label={label}>
      <span className="avatar__fallback" aria-hidden>
        {initialFromLabel(label)}
      </span>
    </span>
  );
}
