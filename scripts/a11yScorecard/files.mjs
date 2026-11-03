import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as prettier from 'prettier';

export const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const componentsDirectory = path.join(rootDirectory, 'packages/mui-material/src');
export const indexPath = path.join(componentsDirectory, 'accessibility.md');
export const defaultsPath = path.join(componentsDirectory, 'accessibility.json');
export const checklistPath = path.join(componentsDirectory, 'manual-testing.md');
export const scorecardPath = path.join(
  rootDirectory,
  'docs/data/material/getting-started/accessibility/scorecard.json',
);
export const docsPagePath = path.join(
  rootDirectory,
  'docs/data/material/getting-started/accessibility/accessibility.md',
);
export const knownGapsPath = path.join(
  rootDirectory,
  'docs/data/material/getting-started/accessibility/knownGaps.json',
);
export const packageJsonPath = path.join(rootDirectory, 'packages/mui-material/package.json');

export const relative = (filepath) => path.relative(rootDirectory, filepath);

/** Returns the file content, or `null` when the file does not exist. */
export async function readOptional(filepath) {
  try {
    return await fs.readFile(filepath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
    return null;
  }
}

export async function exists(filepath) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

/** Formats generated output the way Prettier would, so `test_static` stays green. */
export async function format(source, filepath) {
  const config = await prettier.resolveConfig(filepath);
  return prettier.format(source, { ...config, filepath });
}

const REGION_START = /<!-- (\S+):start -->/g;

/**
 * Every `<!-- <name>:start -->…<!-- <name>:end -->` region in a file, as
 * `name → trimmed content`. Regions can nest inside a generated block.
 */
export function readRegions(source = '') {
  const regions = new Map();
  for (const match of (source ?? '').matchAll(REGION_START)) {
    const [startMarker, name] = match;
    const start = match.index + startMarker.length;
    const end = source.indexOf(`<!-- ${name}:end -->`, start);
    if (end !== -1) {
      regions.set(name, source.slice(start, end).trim());
    }
  }
  return regions;
}

/** Wraps hand-written content in region markers. `inline` keeps it on one line. */
export function region(name, content, inline = false) {
  const gap = inline ? '' : '\n\n';
  return `<!-- ${name}:start -->${content ? `${gap}${content}${gap}` : gap}<!-- ${name}:end -->`;
}

/** Replaces the content between `<!-- <name>:start -->` and `<!-- <name>:end -->`. */
export function replaceBlock(source, replacement, filepath, name = 'scorecard') {
  const startMarker = `<!-- ${name}:start -->`;
  const endMarker = `<!-- ${name}:end -->`;
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start === -1 || end === -1) {
    throw new Error(`Missing ${startMarker} / ${endMarker} markers in ${relative(filepath)}`);
  }
  return `${source.slice(0, start + startMarker.length)}\n\n${replacement}\n\n${source.slice(end)}`;
}
