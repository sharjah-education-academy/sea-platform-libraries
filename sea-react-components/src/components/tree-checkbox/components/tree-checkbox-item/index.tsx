"use client";
import React from "react";
import { TreeNode } from "../..";
import Checkbox from "../../../checkbox";

type Props<K> = {
  name: string;
  node: TreeNode<K>;
  readonly: boolean;
  onChange: (nodeKey: K, checked: boolean) => void;
};
export default function TreeCheckboxItem<K>({
  name,
  node,
  readonly,
  onChange,
}: Props<K>) {
  const handleCheckboxChange = (checked: boolean) => {
    onChange(node.key, checked);
  };

  return (
    <div className="sea-flex sea-flex-col sea-gap-3">
      <div className="sea-flex sea-gap-3 sea-items-center">
        <Checkbox
          checked={node.checked !== "none"}
          semiChecked={node.checked === "some"}
          onChange={(checked) => handleCheckboxChange(checked)}
          disabled={readonly}
        />
        <p>{node.label}</p>
      </div>

      {node.children &&
        node.children.map((n) => (
          <div key={`${name}-${n.key}`} className="pl-5">
            <TreeCheckboxItem
              name={name}
              node={n}
              readonly={readonly}
              onChange={onChange}
            />
          </div>
        ))}
    </div>
  );
}
