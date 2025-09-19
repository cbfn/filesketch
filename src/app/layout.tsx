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
  title: "Filesketch – Gere árvores de pastas bonitas",
  description: "Transforme texto simples em árvores ASCII coloridas, exportáveis e temáveis. Feito por Christian Nascimento – cbfn.dev",
  authors: [{ name: "Christian Nascimento", url: "https://cbfn.dev" }],
  openGraph: {
    url: "https://filesketch.cbfn.dev", // ou seu domínio
    title: "Filesketch",
    description: "DSL → Árvore de pastas bonita",
    images: [{ url: "/filesketch-tree.png", width: 1200, height: 630, alt: "Filesketch filesketch-tree" }],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Filesketch",
  //   description: "Transforme texto simples em árvores de pastas bonitas",
  //   creator: "@seu_usuario_twitter",
  //   images: ["/preview.png"],
  // },
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