"use client";
import { JSX, useEffect, useMemo, useState } from "react";
import {
  Info,
  FolderTree,
  FileCode2,
  Layers,
  Ellipsis,
  ArrowUpToLine,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

type Section = {
  key: string;
  title: string;
  desc: string;
  code: string;
  icon: JSX.Element;
};

const SECTIONS: Section[] = [
  {
    key: "folders",
    title: "Pastas",
    desc: "Use nome: e abra chaves para definir uma pasta em qualquer nível.",
    code: `src: { ... }`,
    icon: <FolderTree size={16} />,
  },
  {
    key: "files",
    title: "Arquivos",
    desc: "Escreva o nome com extensão, separados por vírgula.",
    code: `main.tsx, routes.tsx`,
    icon: <FileCode2 size={16} />,
  },
  {
    key: "subfolders",
    title: "Subpastas",
    desc: "Aninhe usando chaves dentro de chaves.",
    code: `components: {
  Header: { index.tsx, index.test.tsx },
  Footer:  { index.tsx, index.test.tsx }
}`,
    icon: <Layers size={16} />,
  },
  {
    key: "ellipsis",
    title: "Reticências",
    desc: "`...` indica conteúdo omitido no mesmo nível onde aparece.",
    code: `Footer: { index.tsx, index.test.tsx, ... }`,
    icon: <Ellipsis size={16} />,
  },
  {
    key: "top",
    title: "Topo com múltiplos blocos",
    desc: "Pastas e arquivos podem coexistir lado a lado no topo.",
    code: `{
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
}`,
    icon: <ArrowUpToLine size={16} />,
  },
];

export default function DocumentationSplit() {
  const [activeKey, setActiveKey] = useState<string>(SECTIONS[0].key);
  const [copied, setCopied] = useState(false);

  const active = useMemo(
    () => SECTIONS.find((s) => s.key === activeKey) ?? SECTIONS[0],
    [activeKey]
  );

  // deep-link: #doc=folders
  useEffect(() => {
    const readFromHash = () => {
      const m = location.hash.match(/doc=([a-z-]+)/i);
      if (!m) return;
      const key = m[1];
      if (SECTIONS.some((s) => s.key === key)) setActiveKey(key);
    };
    readFromHash();
    window.addEventListener("hashchange", readFromHash);
    return () => window.removeEventListener("hashchange", readFromHash);
  }, []);

  const setActive = (key: string) => {
    setActiveKey(key);
    // atualiza hash sem scroll jump
    const url = new URL(window.location.href);
    url.hash = `doc=${key}`;
    history.replaceState(null, "", url.toString());
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback simples
      window.prompt("Copie o exemplo:", active.code);
    }
  };

  return (
    <section
      id="documentacao"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col items-start gap-3">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs">
          <Info size={14} /> Documentação
        </span>
        <h2 className="text-2xl font-extrabold leading-tight md:text-3xl">
          Como escrever sua estrutura
        </h2>
      </div>

      {/* Split */}
      <div className="grid gap-4 md:grid-cols-[280px_minmax(0,1fr)]">
        {/* Lista à esquerda */}
        <nav
          className="rounded-2xl border border-border/60 bg-card/50 p-2 md:sticky md:top-20 md:self-start"
          aria-label="Navegação da documentação"
        >
          {SECTIONS.map((s) => {
            const isActive = s.key === activeKey;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  // base
                  "group mb-1 flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                  // hover sempre visível em ambos os temas
                  "hover:bg-black/5 dark:hover:bg-white/5",
                  // estado ativo: usa acento e texto 'foreground' (bom em light/dark)
                  isActive
                    ? "bg-[hsl(var(--accent))]/12 ring-1 ring-[hsl(var(--accent))]/30 text-foreground"
                    : "",
                ].join(" ")}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={[
                      "inline-flex h-6 w-6 items-center justify-center rounded-md ring-1",
                      // badge do ícone: neutro no normal, acento no ativo
                      isActive
                        ? "bg-[hsl(var(--accent))]/15 ring-[hsl(var(--accent))]/40 text-[hsl(var(--accent))]"
                        : "bg-black/5 ring-black/10 text-foreground/70 dark:bg-white/5 dark:ring-white/10",
                    ].join(" ")}
                  >
                    {s.icon}
                  </span>
                  <span
                    className={
                      isActive
                        ? "font-medium"
                        : "text-foreground/80 group-hover:text-foreground"
                    }
                  >
                    {s.title}
                  </span>
                </span>

                <ChevronRight
                  size={16}
                  className={[
                    "transition-transform",
                    isActive
                      ? "translate-x-0.5 opacity-90 text-[hsl(var(--accent))]"
                      : "opacity-40 group-hover:opacity-70",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </nav>

        {/* Painel à direita */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-4">
          {/* “barra” superior com título + copiar */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
                {active.icon}
              </div>
              <h3 className="text-base font-semibold">{active.title}</h3>
            </div>

            <button
              type="button"
              onClick={onCopy}
              className={`inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-card px-2 text-xs transition hover:opacity-90 ${
                copied ? "pointer-events-none opacity-70" : ""
              }`}
              title={copied ? "Copiado!" : "Copiar exemplo"}
              aria-live="polite"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>

          {/* descrição */}
          <p className="mb-3 text-sm opacity-80">{active.desc}</p>

          {/* exemplo com transição suave */}
          <div
            key={active.key}
            className="animate-in fade-in slide-in-from-bottom-1 duration-200"
          >
            <pre className="overflow-x-auto rounded-md bg-black/5 p-3 text-[11px] leading-5 dark:bg-white/5">
              {active.code}
            </pre>
          </div>

          {/* glow decorativo ao fundo */}
          <span
            className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
