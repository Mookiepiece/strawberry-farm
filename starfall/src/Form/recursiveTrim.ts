/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function recursiveTrim(v: any): any {
  if (typeof v === 'string') {
    return v.trim();
  } else if (Array.isArray(v)) {
    return v.map(recursiveTrim);
  } else if (isPlainObject(v)) {
    return Object.keys(v).reduce<Record<string, any>>(
      (obj, k) => ({ ...obj, [k]: recursiveTrim(v[k]) }),
      {}
    );
  } else return v;

  // https://stackoverflow.com/questions/5876332/how-can-i-differentiate-between-an-object-literal-other-javascript-objects
  function isPlainObject(obj: any) {
    return (
      typeof obj === 'object' && // separate from primitives
      obj !== null && // is obvious
      obj.constructor === Object && // separate instances (Array, DOM, ...)
      Object.prototype.toString.call(obj) === '[object Object]'
    ); // separate build-in like Math
  }
}
