import type { ReactElement } from "react";
import { useI18n } from "../contexts/I18nContext.tsx";
import { useTheme } from "../contexts/ThemeContext.tsx";
import type { ThemePreference } from "../lib/theme.ts";

type ThemePreferenceControlsProps = {
  /** If set, adds a heading for the settings page */
  labelledBy?: string;
};

const OPTIONS: readonly { value: ThemePreference; labelKey: string }[] = [
  { value: "system", labelKey: "theme.auto" },
  { value: "light", labelKey: "theme.light" },
  { value: "dark", labelKey: "theme.dark" },
] as const;

export function ThemePreferenceControls({ labelledBy }: ThemePreferenceControlsProps): ReactElement {
  const { preference, setPreference } = useTheme();
  const { t } = useI18n();

  return (
    <div
      className="theme-mode"
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : t("theme.ariaGroup")}
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
          {t(opt.labelKey)}
        </button>
      ))}
    </div>
  );
}
