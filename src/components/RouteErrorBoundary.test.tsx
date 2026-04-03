import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useState, type ReactElement } from "react";
import { RouteErrorBoundary } from "./RouteErrorBoundary.tsx";

function Thrower(): ReactElement {
  throw new Error("render boom");
}

function Harness(): ReactElement {
  const [fail, setFail] = useState(true);
  return (
    <BrowserRouter>
      <RouteErrorBoundary
        onReset={() => setFail(false)}
        title="Err title"
        body="Err body"
        retryLabel="Try again"
        homeLink="Home"
      >
        {fail ? <Thrower /> : <div>Recovered</div>}
      </RouteErrorBoundary>
    </BrowserRouter>
  );
}

describe("RouteErrorBoundary", () => {
  it("shows fallback and recovers on retry", async () => {
    render(<Harness />);
    expect(await screen.findByText("render boom")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Err title" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });
});
