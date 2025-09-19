"use client";

import Image from "next/image";
import { Github } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";
import { useGitHubStars } from "@/hooks/useGitHubStars";

export default function SiteHeader() {
  const stars = useGitHubStars("seu-usuario", "filesketch");
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <div className="flex items-center gap-1">
          <div className="relative h-8 w-8 overflow-hidden rounded-md">
            <Image src="/logo-filesketch.svg" alt="Filesketch" fill priority />
          </div>
          <div className="leading-tight text-white">
            <div className="text-base font-bold tracking-tight">Filesketch</div>
          </div>
        </div>

        {/* Menu */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#como-funciona"
            className="text-sm text-white/70 hover:text-white"
          >
            Como funciona
          </a>
          <a href="#editor" className="text-sm text-white/70 hover:text-white">
            Editor
          </a>
          <a
            href="#documentacao"
            className="text-sm text-white/70 hover:text-white"
          >
            Documentação
          </a>
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/cbfn/filesketch"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white hover:bg-white/10"
          >
            <Github size={14} />
            <span>GitHub</span>
            {stars !== null && (
              <span className="ml-1 rounded bg-white/10 px-1.5 py-0.5 text-[11px]">
                ⭐ {stars}
              </span>
            )}
          </a>

          {/* Switch de tema */}
          <ThemeSwitch />
        </div>
      </div>

      {/* Fita mais sutil */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}
