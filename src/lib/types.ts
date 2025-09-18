export type NodeType = "file" | "folder";

export interface TreeNode {
  name: string;
  type: NodeType;
  children?: TreeNode[];
   /** quando true, representa '...' placeholder */
  ellipsis?: boolean;
}

export interface ParseResult {
  roots: TreeNode[]; // vários “nível 1”
  errors: string[];
}
