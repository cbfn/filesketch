"use client";

import { useMemo } from "react";
import { toAsciiTokens } from "@/lib/formatAscii";
import { parseDSL } from "@/lib/parser";
import { DEFAULT_ASCII_THEME, type AsciiTheme } from "@/lib/asciiThemes";
import { FolderTree, Copy, Palette, Image as ImageIcon, Code } from "lucide-react";
import { getIconForNode } from "@/lib/fileIcons";

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
}`;

export default function Hero() {
  const projectName = "filesketch";
  const parsed = useMemo(() => parseDSL(SAMPLE), []);
  const tokens = useMemo(() => toAsciiTokens(parsed.roots, projectName), [parsed.roots]);

  return (
    <section
      className="relative border-b border-border/60 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5"
      id="como-funciona"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
        {/* Texto */}
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs">
            <FolderTree size={14} /> Texto simples → Árvore bonita
          </span>

          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            De texto para <span className="text-[hsl(var(--accent))]">árvore de pastas</span> em segundos
          </h1>

          <p className="max-w-prose text-sm opacity-80">
            Escreva como suas pastas e arquivos estão organizados e veja tudo virar uma{" "}
            <strong>árvore ASCII colorida</strong> (ou cards) pronta para compartilhar.
            Personalize com <strong>temas</strong> (Dracula, Solarized, Monokai…) e ajuste o{" "}
            <strong>background</strong>. Depois, <strong>exporte PNG</strong> ou <strong>copie</strong> a árvore
            para PRs e documentações. Você também pode misturar <em>pastas e arquivos no topo</em>, lado a lado com <code>src/</code>.
          </p>

          {/* Features rápidas */}
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center gap-3">
              <Palette size={16} className="opacity-80" />
              Temas prontos para pastas e arquivos + fundo personalizável
            </li>
            <li className="flex items-center gap-3">
              <ImageIcon size={16} className="opacity-80" />
              Exporte como PNG (perfeito para PRs, docs e apresentações)
            </li>
            <li className="flex items-center gap-3">
              <Copy size={16} className="opacity-80" />
              Copie a árvore em texto (├─ / └─) com um clique
            </li>
            <li className="flex items-center gap-3">
              <Code size={16} className="opacity-80" />
              Pastas dentro de pastas, arquivos em qualquer nível — do seu jeito
            </li>
          </ul>
        </div>

        {/* Mini preview com ícones coloridos */}
        <div
          className="rounded-2xl border border-border bg-black/80 p-4 shadow-xl ring-1 ring-white/10"
          id="ascii-colorido"
        >
          <MiniAsciiPreview tokens={tokens} theme={DEFAULT_ASCII_THEME} />
        </div>
      </div>
    </section>
  );
}

function MiniAsciiPreview({
  tokens,
  theme,
}: {
  tokens: ReturnType<typeof toAsciiTokens>;
  theme: AsciiTheme;
}) {
  return (
    <div className="rounded-xl p-4" style={{ background: theme.background }}>
      <pre className="m-0 whitespace-pre font-mono text-sm leading-6">
        {tokens.map((t) => {
          const palette = t.isFolder ? theme.folderColors : theme.fileColors;
          const color = palette[t.depth % palette.length] ?? palette[0] ?? "#fff";

          return (
            <div key={t.lineIndex} className="flex items-center">
              {/* prefixo (│ ├─ └─) */}
              <span className="select-none" style={{ color: theme.prefix, opacity: 0.7 }}>
                {t.prefix}
              </span>

              {/* coluna fixa para o ícone — segue a cor do texto */}
              <span
                className="inline-flex w-5 shrink-0 items-center justify-center"
                aria-hidden
                style={{ color }}
              >
                {getIconForNode(t.text, t.isFolder, { size: 14 })}
              </span>

              {/* rótulo */}
              <span style={{ color, fontWeight: t.isFolder ? 600 : 400 }}>
                {t.text}
              </span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
