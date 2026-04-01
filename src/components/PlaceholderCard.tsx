import type { ReactElement, ReactNode } from "react";

type PlaceholderCardProps = {
  title: string;
  featureId: string;
  children?: ReactNode;
};

export function PlaceholderCard({
  title,
  featureId,
  children,
}: PlaceholderCardProps): ReactElement {
  return (
    <section className="card" aria-labelledby={`${featureId}-title`}>
      <h2 id={`${featureId}-title`} className="card__title">
        {title}{" "}
        <span className="badge badge--progress" title="Scaffold — in progress">
          In progress
        </span>
      </h2>
      <div className="card__body">{children}</div>
    </section>
  );
}
