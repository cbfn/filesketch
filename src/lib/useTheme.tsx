"use client";
import { useEffect, useState } from "react";
export type ThemeMode = "light" | "dark" | "system";

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("system"); // <- igual no SSR e no 1º render

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as ThemeMode) || "system";
    apply(stored);
    setMode(stored);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (stored === "system") apply("system"); };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const apply = (m: ThemeMode) => {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = m === "dark" || (m === "system" && systemDark);
    const html = document.documentElement;
    html.classList.toggle("dark", dark);
    html.setAttribute("data-theme", dark ? "dark" : "light");
  };

  const update = (m: ThemeMode) => {
    localStorage.setItem("theme", m);
    setMode(m);
    apply(m);
  };

  return { mode, setMode: update };
}
