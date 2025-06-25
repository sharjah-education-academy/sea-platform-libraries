// Remove duplicate items from an array
export const removeDuplicates = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

// Push an item into the array if it doesn't already exist
export const pushIfNotFound = <T>(
  array: T[],
  item: T,
  comparer?: (a: T, b: T) => boolean
): void => {
  const exists = comparer
    ? array.some((existingItem) => comparer(existingItem, item))
    : array.includes(item);

  if (!exists) {
    array.push(item);
  }
};

export const concatWithoutDuplicates = <T>(
  array1: T[],
  array2: T[],
  comparer: (a: T, b: T) => boolean
): T[] => {
  const result = [...array1];

  for (const item of array2) {
    if (!result.some((existingItem) => comparer(existingItem, item))) {
      result.push(item);
    }
  }

  return result;
};

export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  keyGetter: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((result, item) => {
    const key = keyGetter(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
};
