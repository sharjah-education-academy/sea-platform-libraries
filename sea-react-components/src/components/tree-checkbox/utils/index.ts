import { TreeNode } from "..";

export const makeTreeNode = <T, K>(
  data: T,
  keys: {
    key: keyof T;
    label: keyof T;
    isLeaf: keyof T;
    checked: keyof T;
    children: keyof T;
  }
) => {
  const node: TreeNode<K> = {
    key: data[keys.key] as unknown as K,
    label: data[keys.label] as unknown as string,
    isLeaf: data[keys.isLeaf] as unknown as boolean,
    checked: data[keys.checked] as unknown as "all" | "some" | "none",
    children: [],
  };

  const children = data[keys.children] as T[] | undefined;
  if (children) {
    node["children"] = children.map((n) => makeTreeNode(n, keys));
  }

  return node;
};
