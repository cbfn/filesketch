"use client";
import { useEffect, useState } from "react";

const THEMES = ["light", "dark", "forest", "sunset"] as const;
type Theme = typeof THEMES[number];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const cycle = () => {
    const idx = THEMES.indexOf(theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={cycle}
      className="rounded-xl border border-border bg-card px-3 py-2 text-sm hover:opacity-90"
      aria-label="Trocar tema"
      title={`Tema: ${theme}`}
    >
      Tema: {theme}
    </button>
  );
}
