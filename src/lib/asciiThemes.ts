export type AsciiTheme = {
  name: string;
  background: string;      // CSS color (ex: "#0f0f14" ou "hsl(220 10% 10%)")
  prefix: string;          // cor do "│  ", "├─ ", "└─ "
  folderColors: string[];  // cores por profundidade (rota)
  fileColors: string[];    // idem
};

export const ASCII_THEMES: AsciiTheme[] = [
  {
    name: "Dracula",
    background: "#282a36",
    prefix: "#8be9fd",
    folderColors: ["#ff79c6", "#bd93f9", "#50fa7b", "#f1fa8c", "#ffb86c"],
    fileColors:   ["#f8f8f2", "#50fa7b", "#8be9fd", "#bd93f9", "#ff79c6"],
  },
  {
    name: "Solarized Dark",
    background: "#002b36",
    prefix: "#93a1a1",
    folderColors: ["#b58900", "#cb4b16", "#268bd2", "#2aa198", "#6c71c4"],
    fileColors:   ["#839496", "#2aa198", "#268bd2", "#6c71c4", "#b58900"],
  },
  {
    name: "Solarized Light",
    background: "#fdf6e3",
    prefix: "#93a1a1",
    folderColors: ["#b58900", "#cb4b16", "#268bd2", "#2aa198", "#6c71c4"],
    fileColors:   ["#657b83", "#2aa198", "#268bd2", "#6c71c4", "#b58900"],
  },
  {
    name: "Monokai",
    background: "#272822",
    prefix: "#a6e22e",
    folderColors: ["#f92672", "#a6e22e", "#66d9ef", "#fd971f", "#ae81ff"],
    fileColors:   ["#f8f8f2", "#66d9ef", "#a6e22e", "#ae81ff", "#fd971f"],
  },
  {
    name: "Classic Blue",
    background: "#0b1220",
    prefix: "#8aa4f8",
    folderColors: ["#a5b4fc", "#60a5fa", "#34d399", "#f472b6", "#f59e0b"],
    fileColors:   ["#e5e7eb", "#60a5fa", "#a5b4fc", "#34d399", "#f59e0b"],
  },
  {
    name: "Forest",
    background: "#0c1410",
    prefix: "#67e8f9",
    folderColors: ["#34d399", "#86efac", "#22c55e", "#4ade80", "#16a34a"],
    fileColors:   ["#e2e8f0", "#a7f3d0", "#67e8f9", "#86efac", "#34d399"],
  },
  {
    name: "Sunset",
    background: "#1a1412",
    prefix: "#fca5a5",
    folderColors: ["#fb7185", "#f59e0b", "#f472b6", "#f97316", "#fbbf24"],
    fileColors:   ["#fde68a", "#fca5a5", "#f9a8d4", "#fdba74", "#fcd34d"],
  },
];

// fallback
export const DEFAULT_ASCII_THEME = ASCII_THEMES[0];
