import fs from 'fs';
import path from 'path';
import findIndexFile from './findIndexFile';

const hooksRegexp = /use([A-Z][a-z]+)+\.(js|tsx|ts)/;

/**
 * Returns the hook source in a flat array.
 * @param {string} directory
 * @param {Array<{ filename: string }>} hooks
 */
export default function findHooks(
  directory: string,
  hooks: { filename: string; indexFilename: string | null }[] = [],
) {
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const itemPath = path.resolve(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      findHooks(itemPath, hooks);
      return;
    }

    if (!hooksRegexp.test(item)) {
      return;
    }

    const indexFile = findIndexFile(directory);

    hooks.push({
      filename: itemPath,
      ...indexFile,
    });
  });

  return hooks;
}
