import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { logger } from "../lib/logger.ts";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error("render error:", error.message, info.componentStack);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="layout">
          <main className="layout__main">
            <div className="stack error-boundary">
              <section className="card">
                <h1 className="card__title">Something went wrong</h1>
                <div className="card__body">
                  <p className="muted">The app hit an unexpected error. You can try reloading the page.</p>
                  <p className="form__error" role="alert">
                    {this.state.message}
                  </p>
                  <p>
                    <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
                      Reload
                    </button>
                  </p>
                  <p className="muted">
                    <Link to="/">← Home</Link>
                  </p>
                </div>
              </section>
            </div>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
