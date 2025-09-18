// components/ThemeSwitch.tsx
"use client";
import { useTheme, type ThemeMode } from "@/lib/useTheme";
import { Sun, Moon, Laptop } from "lucide-react";

const options: { value: ThemeMode; label: string; Icon: any }[] = [
  { value: "light", label: "Claro", Icon: Sun },
  { value: "dark", label: "Escuro", Icon: Moon },
  { value: "system", label: "Sistema", Icon: Laptop },
];

export default function ThemeSwitch() {
  const { mode, setMode } = useTheme();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 p-1 text-white/90 backdrop-blur-md"
      role="group"
      aria-label="Tema"
      title="Tema"
    >
      {options.map(({ value, label, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition
              ${active ? "bg-white/20" : "hover:bg-white/10"}`}
            aria-pressed={active}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
