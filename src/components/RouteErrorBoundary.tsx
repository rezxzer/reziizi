import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { logger } from "../lib/logger.ts";

type RouteErrorBoundaryProps = {
  children: ReactNode;
  /** From `QueryErrorResetBoundary` — clears errored queries when retrying. */
  onReset: () => void;
  title: string;
  body: string;
  retryLabel: string;
  homeLink: string;
};

type RouteErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

/**
 * Catches render errors in the route subtree. Pair with `QueryErrorResetBoundary`
 * so "Try again" resets TanStack Query error state.
 */
export class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  public constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  public static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error("route render error:", error.message, info.componentStack);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, message: "" });
    this.props.onReset();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="stack route-error-boundary">
          <section className="card">
            <h1 className="card__title">{this.props.title}</h1>
            <div className="card__body">
              <p className="muted">{this.props.body}</p>
              <p className="form__error" role="alert">
                {this.state.message}
              </p>
              <p>
                <button type="button" className="btn btn--primary" onClick={this.handleRetry}>
                  {this.props.retryLabel}
                </button>
              </p>
              <p className="muted">
                <Link to="/" className="inline-link">
                  {this.props.homeLink}
                </Link>
              </p>
            </div>
          </section>
        </div>
      );
    }

    return this.props.children;
  }
}
