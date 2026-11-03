import * as React from 'react';
import { isValidElementType } from 'react-is';

// https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
export function isPlainObject(item: unknown): item is Record<keyof any, unknown> {
  if (typeof item !== 'object' || item === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(item);
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in item) &&
    !(Symbol.iterator in item)
  );
}

export interface DeepmergeOptions {
  clone?: boolean | undefined;
}

function deepClone<T>(source: T): T | Record<keyof any, unknown> {
  if (React.isValidElement(source) || isValidElementType(source) || !isPlainObject(source)) {
    return source;
  }

  const output: Record<keyof any, unknown> = {};

  Object.keys(source).forEach((key) => {
    output[key] = deepClone(source[key]);
  });

  return output;
}

/**
 * Merge objects deeply.
 * It will shallow copy React elements.
 *
 * If `options.clone` is set to `false` the source object will be merged directly into the target object.
 *
 * @example
 * ```ts
 * deepmerge({ a: { b: 1 }, d: 2 }, { a: { c: 2 }, d: 4 });
 * // => { a: { b: 1, c: 2 }, d: 4 }
 * ````
 *
 * @param target The target object.
 * @param source The source object.
 * @param options The merge options.
 * @param options.clone Set to `false` to merge the source object directly into the target object.
 * @returns The merged object.
 */
export default function deepmerge<T>(
  target: T,
  source: unknown,
  options: DeepmergeOptions = { clone: true },
): T {
  const output = options.clone ? { ...target } : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (React.isValidElement(source[key]) || isValidElementType(source[key])) {
        (output as Record<keyof any, unknown>)[key] = source[key];
      } else if (
        isPlainObject(source[key]) &&
        // Avoid prototype pollution
        Object.prototype.hasOwnProperty.call(target, key) &&
        isPlainObject(target[key])
      ) {
        // Since `output` is a clone of `target` and we have narrowed `target` in this block we can cast to the same type.
        (output as Record<keyof any, unknown>)[key] = deepmerge(target[key], source[key], options);
      } else if (options.clone) {
        (output as Record<keyof any, unknown>)[key] = isPlainObject(source[key])
          ? deepClone(source[key])
          : source[key];
      } else {
        (output as Record<keyof any, unknown>)[key] = source[key];
      }
    });
  }

  return output;
}
