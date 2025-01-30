export const editTree = <T, G>(
  root: T,
  editFn: (value: T) => G,
  childrenKey: keyof T
): G => {
  // Access children using the provided key
  const children = root[childrenKey] as T[] | undefined;
  let newChildren: G[] = [];
  if (children) {
    // Update the children recursively
    newChildren = children.map((child) => editTree(child, editFn, childrenKey));
  }

  // Apply the edit function to the root value
  const updated = editFn(root);

  (updated as any)[childrenKey] = newChildren;

  return updated;
};

export const DFS = <T>(
  root: T,
  walk: (value: T) => void,
  childrenKey: keyof T
): void => {
  const children = root[childrenKey] as T[] | undefined;
  if (children) {
    children.forEach((child) => DFS(child, walk, childrenKey));
  }

  walk(root);
};

export const findNode = <T>(
  root: T,
  predicate: (node: T) => boolean,
  childrenKey: keyof T
): T | undefined => {
  if (predicate(root)) {
    return root;
  }

  const children = root[childrenKey] as T[] | undefined;
  if (children) {
    for (const child of children) {
      const result = findNode(child, predicate, childrenKey);
      if (result) {
        return result;
      }
    }
  }

  return undefined;
};

export const flattenTree = <T, K extends keyof T>(
  node: T,
  childrenKey: K
): T[] => {
  // Start with the current node
  const result: T[] = [node];

  // Retrieve children from the given key, ensuring it's not null or undefined
  const children = node[childrenKey];

  // If children exist, recursively process them and add to the result
  if (children) {
    for (let child of children as unknown as T[]) {
      result.push(...flattenTree(child, childrenKey)); // Flatten the results
    }
  }

  return result;
};

export const getAllLeafNodes = <T, K extends keyof T>(
  node: T,
  childrenKey: K
): T[] => {
  const children = node[childrenKey] as unknown as T[] | null | undefined;

  // If the node has no children or the children array is empty, it's a leaf
  if (!children || children.length === 0) {
    return [node];
  }

  // Otherwise, recursively get leaf nodes from all children
  const leafNodes: T[] = [];
  for (let child of children) {
    leafNodes.push(...getAllLeafNodes(child, childrenKey));
  }

  return leafNodes;
};
