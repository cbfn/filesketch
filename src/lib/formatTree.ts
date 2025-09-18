import { TreeNode } from "./types";

export function formatTree(nodes: TreeNode[], rootLabel?: string): string {
  const lines: string[] = [];
  if (rootLabel) lines.push(`${rootLabel}/`);

  const walk = (items: TreeNode[], prefix: string) => {
    items.forEach((n, idx) => {
      const isLast = idx === items.length - 1;
      const branch = isLast ? "└─ " : "├─ ";
      if (n.type === "file") {
        lines.push(prefix + branch + n.name);
      } else {
        lines.push(prefix + branch + n.name + "/");
        const childPrefix = prefix + (isLast ? "   " : "│  ");
        walk(n.children ?? [], childPrefix);
      }
    });
  };

  walk(nodes, "");
  return lines.join("\n");
}
