"use client";

import { useEffect, useState } from "react";
import { applyTheme, resolveTheme, setTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const resolved = resolveTheme();
    setThemeState(resolved);
    applyTheme(resolved);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-labelledby="theme-toggle-label"
      onClick={toggle}
      className="relative h-[22px] w-[38px] shrink-0 rounded-full bg-dd-card ring-1 ring-dd-brand/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dd-accent/40"
    >
      <span
        className={`absolute top-0.5 block h-[18px] w-[18px] rounded-full bg-dd-input shadow-sm transition-transform ${
          isDark ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
        aria-hidden
      />
    </button>
  );
}
