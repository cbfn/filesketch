"use client";
import Image from "next/image";
import { Github } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";

export default function SiteHeader() {
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
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-sm text-white transition hover:bg-white/20"
            title="Ver no GitHub"
          >
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/20 ring-1 ring-white/20">
              <Github size={14} />
            </span>
            <span className="font-medium">GitHub</span>
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
