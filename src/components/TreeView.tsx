"use client";
import { useMemo, useRef, useState } from "react";
import { parseDSL } from "@/lib/parser";
import { formatTree } from "@/lib/formatTree";
import { toAsciiTokens } from "@/lib/formatAscii";
import * as htmlToImage from "html-to-image";
import {
  Copy,
  ImageDown,
  Palette,
  Brackets,
  Type,
  Gamepad2,
  Check,
} from "lucide-react";

import {
  ASCII_THEMES,
  DEFAULT_ASCII_THEME,
  type AsciiTheme,
} from "@/lib/asciiThemes";
import CodeEditorJSON from "@/components/CodeEditor";
import { editorThemeFromAscii } from "@/lib/themeBridge";
import { getIconForNode } from "@/lib/fileIcons";

export default function TreeView() {
  const SAMPLE = `{
    src: {
        main.tsx,
        routes.tsx, 
        components: {
        Header: { index.tsx, index.test.tsx },
        Footer: { index.tsx, index.test.tsx },
        ...
        },
        ...
    },
    public: {
        index.html,
        assets: { images: { ... } }
    },
    next.config.ts,
    README.md,
    ...
}
`;
  const [input, setInput] = useState(SAMPLE);
  const [projectName, setProjectName] = useState("filesketch");

  const [themeName, setThemeName] = useState<string>(DEFAULT_ASCII_THEME.name);
  const [bg, setBg] = useState<string>(DEFAULT_ASCII_THEME.background);
  const [copied, setCopied] = useState(false);
  const [showIcons, setShowIcons] = useState(true);

  const asciiRef = useRef<HTMLDivElement>(null);

  const parsed = useMemo(() => parseDSL(input), [input]);
  const asciiTokens = useMemo(
    () => toAsciiTokens(parsed.roots, projectName),
    [parsed.roots, projectName]
  );

  const theme: AsciiTheme = useMemo(() => {
    const t =
      ASCII_THEMES.find((t) => t.name === themeName) ?? DEFAULT_ASCII_THEME;
    return { ...t, background: bg || t.background };
  }, [themeName, bg]);

  const editorTheme = useMemo(() => editorThemeFromAscii(theme), [theme]);

  const onCopyAscii = async () => {
    const txt = formatTree(parsed.roots, projectName);

    // caminho moderno
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(txt);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        return;
      } catch (err) {
        console.warn("Clipboard API falhou, tentando fallback", err);
      }
    }

    // fallback com textarea oculto (sem execCommand)
    try {
      const textarea = document.createElement("textarea");
      textarea.value = txt;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand("copy"); // ⚠️ deprecated, mas ainda funciona
      document.body.removeChild(textarea);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        return;
      }
    } catch (err) {
      console.warn("execCommand fallback falhou", err);
    }

    // último recurso
    window.prompt("Copie manualmente:", txt);
  };

  const onSnapshotAscii = async () => {
  if (!asciiRef.current) return;

  const pixelRatio = 2;        
  const pad = Math.round(5 * pixelRatio); 

  // captura só o wrapper interno (sem borda do card)
  const srcCanvas = await htmlToImage.toCanvas(asciiRef.current, {
    pixelRatio,
    backgroundColor: theme.background,
    cacheBust: true,
  });

  // adiciona margem transparente
  const out = document.createElement("canvas");
  out.width = srcCanvas.width + pad * 2;
  out.height = srcCanvas.height + pad * 2;

  const ctx = out.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, out.width, out.height);
  ctx.drawImage(srcCanvas, pad, pad);

  const dataUrl = out.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `${projectName}-ascii-tree.png`;
  a.click();
};


  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Card do editor */}
      <section className="flex min-h-[460px] flex-col rounded-2xl border border-border/60 bg-gradient-to-b from-card/60 to-card/20 p-4 shadow-sm">
        {/* Header do card */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
              <Brackets size={16} />
            </div>
            <h3 className="text-base font-semibold">Editor DSL</h3>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs opacity-70">Projeto</label>
            <div className="relative">
              <Type
                className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 opacity-40"
                size={14}
              />
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="rounded-lg border border-border bg-card pl-7 pr-3 py-1.5 text-sm"
                placeholder="nome do projeto"
              />
            </div>
          </div>
        </div>

        {/* Editor: ocupa o restante da section */}
        <div className="flex-1 overflow-hidden">
          <CodeEditorJSON
            value={input}
            onChange={setInput}
            theme={editorTheme}
            placeholder={`
            {
                src: {
                    main.tsx,
                    routes.tsx,
                    components: {
                    Header: { index.tsx, index.test.tsx },
                    Footer: { index.tsx, index.test.tsx },
                    ...
                    },
                    ...
                },
                public: {
                    index.html,
                    assets: { images: { ... } }
                },
                next.config.ts,
                README.md,
                ...
            }
            `}
            className="h-full"
          />
        </div>

        {/* Erros */}
        {parsed.errors.length > 0 && (
          <div className="mt-3 rounded-lg border border-red-300 bg-red-100/70 p-3 text-sm">
            <strong>Erros:</strong>
            <ul className="list-inside list-disc">
              {parsed.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Card do ASCII + controles */}
      <section className="flex min-h-[420px] flex-col rounded-2xl border border-border/60 bg-gradient-to-b from-card/60 to-card/20 p-4 shadow-sm">
        {/* Header do card */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
              <Gamepad2 size={16} />
            </div>
            <h3 className="text-base font-semibold">ASCII (temável)</h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1">
              <Palette size={14} className="opacity-70" />
              <select
                value={themeName}
                onChange={(e) => {
                  const t =
                    ASCII_THEMES.find((x) => x.name === e.target.value) ??
                    DEFAULT_ASCII_THEME;
                  setThemeName(t.name);
                  setBg(t.background);
                }}
                className="bg-transparent py-1 text-sm outline-none [color-scheme:light] dark:[color-scheme:dark]"
                aria-label="Tema do ASCII"
              >
                {ASCII_THEMES.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
              <input
                type="color"
                value={rgb2hex(theme.background)}
                onChange={(e) => setBg(e.target.value)}
                className="h-6 w-8 cursor-pointer rounded border border-border"
                title="Cor de fundo do ASCII"
              />
            </div>
            <label className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={showIcons}
                onChange={(e) => setShowIcons(e.target.checked)}
                className="h-4 w-4 accent-[hsl(var(--accent))]"
                aria-label="Mostrar ícones"
              />
              Ícones
            </label>
            <button
              onClick={onSnapshotAscii}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:opacity-90"
              title="Exportar PNG do ASCII"
            >
              <ImageDown size={16} /> Exportar PNG
            </button>
            <button
              type="button"
              onClick={onCopyAscii}
              className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:opacity-90 ${
                copied ? "pointer-events-none opacity-70" : ""
              }`}
              title={copied ? "Copiado!" : "Copiar árvore ASCII"}
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check size={16} /> Copiado!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copiar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Canvas ASCII */}
        <div className="mt-3 flex-1 overflow-hidden rounded-2xl border border-border p-4" style={{ background: theme.background }}>
  {/* wrapper interno sem borda, só com radius + bg */}
  <div
    ref={asciiRef}
    className="h-full w-full rounded-xl"
    style={{ background: theme.background, padding: "8px" }}
  >
    <AsciiColored tokens={asciiTokens} theme={theme} showIcons={showIcons} />
  </div>
</div>

      </section>
    </div>
  );
}

// util: converte CSS color para hex (pro input color)
function rgb2hex(input: string): string {
  try {
    const el = document.createElement("div");
    el.style.color = input;
    document.body.appendChild(el);
    const rgb = getComputedStyle(el).color;
    document.body.removeChild(el);
    const m = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return "#000000";
    const r = Number(m[1]).toString(16).padStart(2, "0");
    const g = Number(m[2]).toString(16).padStart(2, "0");
    const b = Number(m[3]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  } catch {
    return "#000000";
  }
}

/** Renderer com tema para folders/files */
function AsciiColored({
  tokens,
  theme,
  showIcons = true,
}: {
  tokens: ReturnType<typeof toAsciiTokens>;
  theme: AsciiTheme;
  showIcons?: boolean;
}) {
  return (
    <pre className="m-0 whitespace-pre font-mono text-sm leading-6">
      {tokens.map((t) => {
        const palette = t.isFolder ? theme.folderColors : theme.fileColors;
        const color =
          palette[t.depth % palette.length] ?? palette[0] ?? "#ffffff";
        return (
          <div key={t.lineIndex} className="flex">
            <span
              className="select-none"
              style={{ color: theme.prefix, opacity: 0.7 }}
            >
              {t.prefix}
            </span>

            {/* ícone opcional (coluna fixa mantém alinhamento da árvore) */}
            {showIcons && (
              <span
                className="inline-flex w-5 shrink-0 items-center justify-center"
                aria-hidden
                style={{ color }}
              >
                {getIconForNode(t.text, t.isFolder, { size: 14 })}
              </span>
            )}

            {/* se não mostrar ícone, preserva o recuo para alinhar? 
                -> se quiser alinhar igual, mantenha w-5 vazia: */}
            {!showIcons && (
              <span className="inline-block shrink-0" aria-hidden />
            )}

            <span style={{ color, fontWeight: t.isFolder ? 600 : 400 }}>
              {t.text}
            </span>
          </div>
        );
      })}
    </pre>
  );
}
