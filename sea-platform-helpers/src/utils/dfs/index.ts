export const findItem = <T, K extends keyof T>(
  node: T,
  predicate: (node: T) => boolean,
  childrenKey: K
): T | undefined => {
  // If the current node matches the predicate, return it
  if (predicate(node)) {
    return node;
  }

  // Retrieve children from the given key, ensuring it's not null or undefined
  const children = node[childrenKey];

  // If no children or children is null/undefined, return null
  if (!children) {
    return undefined;
  }

  // Otherwise, search through the children recursively
  for (let child of children as unknown as T[]) {
    const result = findItem(child, predicate, childrenKey);
    if (result) {
      return result;
    }
  }

  // Return undefined if the element is not found
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
