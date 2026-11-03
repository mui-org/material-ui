// From mui-x: https://github.com/mui/mui-x/blob/bb92fb0adac6764461adea9a9d7d43f1095f49e5/packages/x-internals/src/fastObjectShallowCompare/fastObjectShallowCompare.ts
/* eslint-disable guard-for-in */

const is = Object.is;

/**
 * Fast shallow compare for plain objects.
 * Returns `true` when both objects have the same own enumerable keys and each value is equal
 * according to `Object.is()`.
 */
export default function fastObjectShallowCompare<T extends Record<string, any> | null>(a: T, b: T) {
  if (a === b) {
    return true;
  }

  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }

  let aLength = 0;
  let bLength = 0;

  for (const key in a) {
    aLength += 1;

    if (!is(a[key], b[key])) {
      return false;
    }

    if (!(key in b)) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  for (const _ in b) {
    bLength += 1;
  }

  return aLength === bLength;
}
