import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import TreeView from "@/components/TreeView";
import DocumentationCards from "@/components/DocumentationCards";

export default function Page() {
  return (
    <main className="min-h-dvh">
      <SiteHeader />
      <Hero />
      <section id="editor" className="mx-auto max-w-6xl px-4 py-14 ">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold leading-tight md:text-3xl text-center text-[hsl(var(--accent))] ">
            Crie, personalize e exporte sua árvore de pastas
          </h2>
          <p className="mt-2 mb-14 max-w-prose text-sm opacity-80 text-center mx-auto">
            Cole sua DSL no campo, escolha um tema e fundo para o ASCII, e então
            exporte como PNG ou copie a árvore em texto para usar em PRs e
            documentações.
          </p>

          <div className="mt-6">
            <TreeView />
          </div>
        </div>
      </section>

      <div className="border-t border-gray-200 py-8 text-xs dark:border-gray-700">
        <DocumentationCards />
      </div>

      <footer className="border-t border-gray-200 py-8 text-center text-xs opacity-70 dark:border-gray-700">
        Feito com Next.js + Tailwind e uma pitada de IA. ©{" "}
        {new Date().getFullYear()} Filesketch by{" "}
        <a
          href="https://cbfn.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:text-[hsl(var(--accent))]"
        >
          cbfn.dev
        </a>
        .
      </footer>
    </main>
  );
}
