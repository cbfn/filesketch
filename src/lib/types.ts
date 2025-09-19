export type NodeType = "file" | "folder";

export interface TreeNode {
  name: string;
  type: NodeType;
  children?: TreeNode[];
  ellipsis?: boolean;
}

export interface ParseResult {
  roots: TreeNode[];
  errors: string[];
}
