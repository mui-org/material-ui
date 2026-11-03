// @ts-check

const importModuleRegexp =
  /^\s*import (?:["'\s]*(?:[\w*{}\n, ]+)from\s*)?["'\s]*([^"'{}$\s]+)["'\s].*/gm;

/**
 * @param {string} code
 * @returns {string[]}
 */
export default function extractImports(code) {
  return (code.match(importModuleRegexp) || []).map((x) => x.replace(importModuleRegexp, '$1'));
}
