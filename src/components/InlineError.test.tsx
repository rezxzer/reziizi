import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { InlineError } from "./InlineError.tsx";

describe("InlineError", () => {
  it("renders nothing when message is null or empty", () => {
    const { container: a } = render(<InlineError message={null} />);
    expect(a.firstChild).toBeNull();
    const { container: b } = render(<InlineError message="" />);
    expect(b.firstChild).toBeNull();
  });

  it("renders role=alert with message", () => {
    render(<InlineError message="Bad request" />);
    const el = screen.getByRole("alert");
    expect(el).toHaveTextContent("Bad request");
    expect(el.className).toContain("form__error");
  });
});
