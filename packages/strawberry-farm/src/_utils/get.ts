/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function set<T extends Record<string, unknown>>(
  obj: T,
  nameOrPath: string | string[],
  value: any
): T {
  const pathes = toPathArray(nameOrPath);
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
      throw new Error(
        `[strawberry-farm] cannot set prop on ${obj} by [${pathes.join(
          ' '
        )}], typeof obj is ${typeof obj} ${
          typeof obj === 'object' && obj ? `with keys ${Object.keys(obj).join(',')}.` : '.'
        }`
      );
    }
  }

  curr[pathes[i]] = value;

  return ans;
}

export function unset<T extends Record<string, unknown>>(obj: T, nameOrPath: string | string[]) {
  const pathes = toPathArray(nameOrPath);
  if (!pathes.length) return obj;
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
      throw new Error(
        `[strawberry-farm] cannot unset prop on ${obj} by [${pathes.join(
          ' '
        )}], typeof obj is ${typeof obj} ${
          typeof obj === 'object' && obj ? `with keys ${Object.keys(obj).join(',')}.` : '.'
        }`
      );
    }
  }

  delete curr[pathes[i]];

  return ans;
}

const toPathArray = (nameOrPath: string | string[]) =>
  Array.isArray(nameOrPath) ? nameOrPath : nameOrPath.split('.');

export function get(obj: Record<string, any>, nameOrPath: string | string[]): any {
  const pathes = [...toPathArray(nameOrPath)];

  let t: Record<string, any> = obj;
  while (pathes.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const p = pathes.shift()!;
    if (p in t) {
      t = t[p];
    } else {
      return undefined;
    }
  }
  return t;
}

export function has(obj: Record<string, unknown>, nameOrPath: string | string[]): boolean {
  const pathes = [...toPathArray(nameOrPath)];

  let t: Record<string, any> = obj;
  while (pathes.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const p = pathes.shift()!;
    if (p in t) {
      t = t[p];
    } else {
      return false;
    }
  }
  return true;
}
