/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function set<T extends Record<string, unknown>>(obj: T, pathes: string[], value: any): T {
  if (!pathes.length) return value;
  const ans = { ...obj }; // answer
  let curr: any = ans; // an cursor to walk deep into the obj

  let i = 0;
  for (; i < pathes.length - 1; i++) {
    const path = pathes[i];
    const next = curr[path];
    if (Array.isArray(next)) {
      curr = curr[path] = [...next];
    } else if (typeof next === 'object') {
      curr = curr[path] = { ...next };
    } else {
      throw new Error(`[Starfall] cannot set prop on ${obj} by [${pathes.join(' ')}]`);
    }
  }

  curr[pathes[i]] = value;

  return ans;
}

/**
 * field value is not initialized
 * or it's parent value has been removed cause we cannot find the value
 * we could know that this form item is stale through this.
 */
export const THE_VOID = {};

export function get(obj: Record<string, unknown>, pathes: string[]): any {
  return pathes.reduce((tempObj, k) => {
    if (k in tempObj) {
      return tempObj[k] as Record<string, unknown>;
    } else {
      return THE_VOID;
    }
  }, obj);
}
