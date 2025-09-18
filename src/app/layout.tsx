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

export const metadata = { title: "Filesketch", description: "Gere árvores de pastas bonitonas" };

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