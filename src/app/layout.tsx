import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Filesketch - Texto em árvore de pastas em segundos",
  description:
    "Transforme descrições simples em árvores ASCII bonitas e exportáveis. Escolha temas, personalize cores e compartilhe em PRs e documentações.",
  keywords: [
    "filesketch",
    "ascii tree",
    "folder structure",
    "docs",
    "next.js",
    "cbfn.dev",
  ],
  authors: [{ name: "Christian Nascimento", url: "https://cbfn.dev" }],
  openGraph: {
    title: "Filesketch - Texto em árvore de pastas em segundos",
    description:
      "De texto simples para árvore de pastas colorida. Temas, exportação PNG e muito mais.",
    url: "https://filesketch.cbfn.dev",
    siteName: "Filesketch",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://filesketch.cbfn.dev/filesketch-tree.png", // gere um print bonitão do app
        width: 1200,
        height: 630,
        alt: "Preview do Filesketch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@cbfndev", // se tiver twitter
    title: "Filesketch - Texto em árvore de pastas em segundos",
    description:
      "Transforme descrições simples em árvores ASCII bonitas e exportáveis.",
    images: ["https://filesketch.cbfn.dev/filesketch-tree.png"],
  },
  alternates: {
    canonical: "https://filesketch.cbfn.dev",
  },
};


function themeInitScript() {
  const code = `
  (function() {
    try {
      var stored = localStorage.getItem('theme'); // 'light' | 'dark' | 'system'
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var wantDark = stored === 'dark' || (stored !== 'light' && systemDark);
      var html = document.documentElement;
      html.classList.toggle('dark', wantDark);
      html.setAttribute('data-theme', wantDark ? 'dark' : 'light');
    } catch (e) {}
  })();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>{themeInitScript()}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}