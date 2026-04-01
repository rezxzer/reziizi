import type { ReactElement } from "react";
import type { ThemePreference } from "../lib/theme";
import { useTheme } from "../contexts/ThemeContext";

type ThemePreferenceControlsProps = {
  /** If set, adds a heading for the settings page */
  labelledBy?: string;
};

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemePreferenceControls({ labelledBy }: ThemePreferenceControlsProps): ReactElement {
  const { preference, setPreference } = useTheme();

  return (
    <div
      className="theme-mode"
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : "Color theme"}
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={preference === opt.value}
          className={`theme-mode__btn${preference === opt.value ? " theme-mode__btn--active" : ""}`}
          onClick={() => setPreference(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
