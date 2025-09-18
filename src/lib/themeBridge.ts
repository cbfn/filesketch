import type { AsciiTheme } from "@/lib/asciiThemes";

export type EditorTheme = {
  name: string;
  background: string;
  foreground: string;
  tokens: {
    property: string;
    string: string;
    number: string;
    boolean: string;
    null: string;
    punctuation?: string;
  };
};

function normalizeHex(input: string): string {
  let h = input.trim();
  if (!h.startsWith("#")) return "#1f2937"; // fallback (zinc-800)
  if (h.length === 4) {
    // #rgb -> #rrggbb
    const r = h[1], g = h[2], b = h[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return h.slice(0, 7);
}

function pickForeground(bg: string): string {
  const hex = normalizeHex(bg);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#0b0f14" : "#f3f4f6"; // escuro p/ fundo claro, claro p/ fundo escuro
}

/** Converte um AsciiTheme em um tema de editor agradável. */
export function editorThemeFromAscii(t: AsciiTheme): EditorTheme {
  const folder = t.folderColors ?? [];
  const file = t.fileColors ?? [];
  const get = (arr: string[], i: number, fb: string) =>
    arr[i] ?? arr[0] ?? fb;

  return {
    name: t.name,
    background: t.background,
    foreground: pickForeground(t.background),
    tokens: {
      // pastas e chaves costumam combinar com "property"
      property:   get(folder, 0, "#66d9ef"),
      // strings de JSON → 1ª cor de files
      string:     get(file,   0, "#c3e88d"),
      // números → 2ª de files (ou repete 1ª)
      number:     get(file,   1, get(file, 0, "#f78c6c")),
      // boolean → 2ª de folders (ou 1ª)
      boolean:    get(folder, 1, get(folder, 0, "#82aaff")),
      // null → 3ª de files (ou um vermelho suave)
      null:       get(file,   2, "#ff5370"),
      // sinais/pontuação → prefix do ASCII (ou herda)
      punctuation: t.prefix ?? "#9CA3AF",
    },
  };
}
