import {
  FileJson,
  FileCode,
  FileText,
  File,
  Folder,
  FolderOpen,
  FileType,
  FileCog,
} from "lucide-react";

export function getIconForFile(name: string, isFolder: boolean) {
  if (isFolder) {
    return <FolderOpen size={14} className="inline-block mr-1 opacity-80" />;
  }

  const ext = name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "ts":
    case "tsx":
      return <FileCode size={14} className="inline-block mr-1 text-sky-500" />;
    case "js":
    case "jsx":
      return <FileCode size={14} className="inline-block mr-1 text-yellow-500" />;
    case "json":
      return <FileJson size={14} className="inline-block mr-1 text-green-500" />;
    case "md":
      return <FileText size={14} className="inline-block mr-1 text-indigo-500" />;
    case "html":
      return <FileType size={14} className="inline-block mr-1 text-orange-500" />;
    case "config":
    case "rc":
      return <FileCog size={14} className="inline-block mr-1 text-purple-500" />;
    default:
      return <File size={14} className="inline-block mr-1 opacity-60" />;
  }
}
