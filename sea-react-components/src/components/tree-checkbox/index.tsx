"use client";
import { useEffect, useState } from "react";

import TreeCheckboxItem from "./components/tree-checkbox-item";
import { makeTreeNode } from "./utils";
import { Utils as U } from "sea-platform-helpers";

export const Utils = { makeTreeNode };

export type CheckedValues = "all" | "some" | "none";

export type TreeNode<K> = {
  key: K;
  label: string;
  isLeaf: boolean;
  checked: CheckedValues;
  children?: TreeNode<K>[];
};

export type Props<K> = {
  name: string;
  nodes: TreeNode<K>[];
  readonly?: boolean;
  onChange: (
    checkedLeafNodes: TreeNode<K>[],
    checkedNodes: TreeNode<K>[]
  ) => void;
};

const TreeCheckbox = <K,>({
  name,
  nodes,
  onChange,
  readonly = false,
}: Props<K>) => {
  const [currentNodes, setCurrentNodes] = useState<TreeNode<K>[]>([]);

  useEffect(() => {
    setCurrentNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    const flattenArrays = currentNodes.map((node) =>
      U.Tree.flattenTree(node, "children")
    );

    const flattenNodes = flattenArrays.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );

    const checkedNodes = flattenNodes.filter((n) => n.checked !== "none");

    const checkedLeafNodes = checkedNodes.filter(
      (n) => n.checked === "all" && n.isLeaf
    );

    onChange(checkedLeafNodes, checkedNodes);
  }, [currentNodes]);

  const updateParentCheckStatus = (node: TreeNode<K>): CheckedValues => {
    if (!node.children || node.children.length === 0) {
      return node.checked;
    }

    const allChildrenChecked = node.children.every(
      (child) => child.checked === "all"
    );
    if (allChildrenChecked) return "all";

    const someChildrenChecked = node.children.some(
      (child) => child.checked !== "none"
    );
    if (someChildrenChecked) return "some";

    return "none";
  };

  const updateChildCheckStatus = (
    node: TreeNode<K>,
    newStatus: CheckedValues
  ): TreeNode<K> => {
    return {
      ...node,
      checked: newStatus,
      children: node.children?.map((child) =>
        updateChildCheckStatus(child, newStatus)
      ),
    };
  };

  const handleCheckNodeRecursive = (
    nodes: TreeNode<K>[],
    nodeKey: K,
    checked: boolean
  ): TreeNode<K>[] => {
    return nodes.map((node) => {
      // Check if the current node matches the key
      if (node.key === nodeKey) {
        const newChecked: CheckedValues = checked ? "all" : "none";
        return {
          ...node,
          checked: newChecked,
          children: node.children
            ? node.children.map((child) =>
                updateChildCheckStatus(child, newChecked)
              )
            : undefined,
        };
      }

      // If it doesn't match, recursively update the children
      if (node.children) {
        const updatedChildren = handleCheckNodeRecursive(
          node.children,
          nodeKey,
          checked
        );
        const updatedNode = { ...node, children: updatedChildren };

        // Update the parent's status based on the children's status
        return {
          ...updatedNode,
          checked: updateParentCheckStatus(updatedNode),
        };
      }

      // If it's a leaf node and doesn't match, return as is
      return node;
    });
  };

  const handleChange = (nodeKey: K, checked: boolean) => {
    const newCurrentNodes = handleCheckNodeRecursive(
      currentNodes,
      nodeKey,
      checked
    );
    setCurrentNodes(newCurrentNodes);
  };

  return (
    <div className="flex flex-col gap-3">
      {currentNodes.map((n) => (
        <TreeCheckboxItem
          key={`${name}-${n.key}`}
          name={name}
          node={n}
          readonly={readonly}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default TreeCheckbox;
