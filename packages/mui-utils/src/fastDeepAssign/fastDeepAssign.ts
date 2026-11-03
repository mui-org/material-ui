// Based on https://github.com/TehShrike/deepmerge
// Based on https://github.com/fastify/deepmerge
// MIT License
// Copyright (c) 2012 - 2022 James Halliday, Josh Duff, and other contributors of deepmerge

/* eslint-disable no-else-return */

/**
 * Assigns props from one object to another. Focused on performance, only normal objects with no
 * prototype are supported.
 */
export default function fastDeepAssign<T extends Record<string, any>>(target: T, source: any) {
  const sourceIsArray = Array.isArray(source);
  const targetIsArray = Array.isArray(target);

  if (isPrimitive(source)) {
    return source;
  } else if (isPrimitiveOrBuiltIn(target)) {
    return clone(source);
  } else if (sourceIsArray && targetIsArray) {
    return mergeArray(target, source);
  } else if (sourceIsArray !== targetIsArray) {
    return clone(source);
  } else {
    return mergeObject(target, source);
  }
}

function cloneArray(value: any[]) {
  let i = 0;
  const il = value.length;
  const result = new Array(il);
  for (i = 0; i < il; i += 1) {
    result[i] = clone(value[i]);
  }
  return result;
}

function cloneObject(target: any) {
  const result = {} as any;

  for (const key in target) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    result[key] = clone(target[key]);
  }
  return result;
}

function mergeArray(target: any[], source: any[]) {
  const tl = target.length;
  for (let i = 0; i < source.length; i += 1) {
    target[tl + i] = clone(source[i]);
  }
  return target;
}

function isMergeableObject(value: any) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !(value instanceof RegExp) &&
    !(value instanceof Date)
  );
}

function isPrimitive(value: any) {
  return typeof value !== 'object' || value === null;
}

function isPrimitiveOrBuiltIn(value: any) {
  return (
    typeof value !== 'object' || value === null || value instanceof RegExp || value instanceof Date
  );
}

function clone(entry: any) {
  // eslint-disable-next-line no-nested-ternary
  return isMergeableObject(entry)
    ? Array.isArray(entry)
      ? cloneArray(entry)
      : cloneObject(entry)
    : entry;
}

function mergeObject(target: any, source: any) {
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    if (key in target) {
      target[key] = fastDeepAssign(target[key], source[key]);
    } else {
      target[key] = clone(source[key]);
    }
  }

  return target;
}
