import { TreeNode } from "./types";

export type AsciiToken = {
  lineIndex: number;
  depth: number;
  isLast: boolean;
  isFolder: boolean;
  text: string; // conteúdo após prefixo (nome + "/" se pasta)
  prefix: string; // "├─ ", "└─ ", com "│  " / "   "
};

// Gera linhas com metadados pra colorir por profundidade/tipo
export function toAsciiTokens(nodes: TreeNode[], rootLabel?: string): AsciiToken[] {
  const tokens: AsciiToken[] = [];
  let line = 0;

  if (rootLabel) {
    tokens.push({ lineIndex: line++, depth: 0, isLast: true, isFolder: true, text: `${rootLabel}/`, prefix: "" });
  }

  const walk = (items: TreeNode[], prefixParts: string[], depth: number) => {
    items.forEach((n, idx) => {
      const isLast = idx === items.length - 1;

      const branch = isLast ? "└─ " : "├─ ";
      const prefix = prefixParts.join("") + branch;
      const isFolder = n.type === "folder";
      const name = isFolder ? `${n.name}/` : n.name;

      tokens.push({
        lineIndex: line++,
        depth,
        isLast,
        isFolder,
        text: name,
        prefix,
      });

      const childPrefixParts = prefixParts.concat(isLast ? "   " : "│  ");
      if (n.children?.length) {
        walk(n.children, childPrefixParts, depth + 1);
      }
    });
  };

  walk(nodes, [], 1);
  return tokens;
}
