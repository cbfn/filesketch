// lib/fileIcons.tsx
import {
  Folder, File, FileCode, FileJson, FileText, Image as ImageIcon,
  Braces, // ts/js
  FileType, // config genérico
  Settings, // configs
  Package,  // package.json
  GitBranch,
  ShieldAlert, // .env
  BookOpen, // docs
  Globe, // html
  FileSpreadsheet, // csv
} from "lucide-react";
import { JSX } from "react";

type IconProps = { className?: string; size?: number };

const byExt: Record<string, (p?: IconProps) => JSX.Element> = {
  // código
  tsx: (p) => <Braces {...p} />, ts: (p) => <Braces {...p} />,
  jsx: (p) => <FileCode {...p} />, js: (p) => <FileCode {...p} />,
  mjs: (p) => <FileCode {...p} />, cjs: (p) => <FileCode {...p} />,
  // web
  html: (p) => <Globe {...p} />, css: (p) => <FileCode {...p} />,
  scss: (p) => <FileCode {...p} />, sass: (p) => <FileCode {...p} />,
  // dados / texto
  json: (p) => <FileJson {...p} />, md: (p) => <BookOpen {...p} />,
  mdx: (p) => <BookOpen {...p} />, csv: (p) => <FileSpreadsheet {...p} />,
  // imagens / assets
  png: (p) => <ImageIcon {...p} />, jpg: (p) => <ImageIcon {...p} />,
  jpeg: (p) => <ImageIcon {...p} />, gif: (p) => <ImageIcon {...p} />,
  svg: (p) => <ImageIcon {...p} />, ico: (p) => <ImageIcon {...p} />,
};

const byFile: Record<string, (p?: IconProps) => JSX.Element> = {
  "package.json": (p) => <Package {...p} />,
  "package-lock.json": (p) => <Package {...p} />,
  "pnpm-lock.yaml": (p) => <Package {...p} />,
  "yarn.lock": (p) => <Package {...p} />,
  "tsconfig.json": (p) => <Settings {...p} />,
  "next.config.ts": (p) => <Settings {...p} />,
  "vite.config.ts": (p) => <Settings {...p} />,
  ".babelrc": (p) => <Settings {...p} />,
  ".prettierrc": (p) => <Settings {...p} />,
  ".eslintrc": (p) => <Settings {...p} />,
  ".gitignore": (p) => <GitBranch {...p} />,
  ".env": (p) => <ShieldAlert {...p} />,
  "index.html": (p) => <Globe {...p} />,
};

const byFolder: Record<string, (p?: IconProps) => JSX.Element> = {
  src: (p) => <Folder {...p} />,
  public: (p) => <Folder {...p} />,
  components: (p) => <Folder {...p} />,
  pages: (p) => <Folder {...p} />,
  hooks: (p) => <Folder {...p} />,
  assets: (p) => <Folder {...p} />,
  images: (p) => <Folder {...p} />,
  styles: (p) => <Folder {...p} />,
  tests: (p) => <Folder {...p} />,
};

export function getIconForNode(name: string, isFolder: boolean, props?: IconProps) {
  if (isFolder) {
    const key = name.toLowerCase();
    const I = byFolder[key] ?? Folder;
    return <I {...props} />;
  }
  // arquivo por nome completo
  const exact = byFile[name];
  if (exact) return exact(props);
  // por extensão
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  const ext = m?.[1] ?? "";
  const I = byExt[ext] ?? FileTextIfText(name) ?? File;
  return <I {...props} />;
}

function FileTextIfText(name: string) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".txt") || lower.endsWith(".log")) return FileText;
  return undefined;
}
