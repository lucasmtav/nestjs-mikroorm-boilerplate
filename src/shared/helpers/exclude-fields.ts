// Exclude keys from object
function _excludeFromObject(object: any, keys: string[]): Omit<any, string> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key)),
  );
}

// Exclude keys from array
function _excludeFromArray(collection: any, keys: string[]): Omit<any, string> {
  return collection.map((item: any) =>
    Object.fromEntries(
      Object.entries(item).filter(([key]) => !keys.includes(key)),
    ),
  );
}

export function exclude(data: any, keys: string[]): Omit<any, string> {
  if (Array.isArray(data)) {
    return _excludeFromArray(data, keys);
  } else {
    return _excludeFromObject(data, keys);
  }
}
