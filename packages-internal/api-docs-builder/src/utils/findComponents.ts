import fs from 'fs';
import path from 'path';
import findIndexFile from './findIndexFile';

const componentRegex = /^(Unstable_)?([A-Z][a-z]*)+2?\.(js|tsx)/;

/**
 * Returns the component source in a flat array.
 * @param {string} directory
 * @param {Array<{ filename: string, indexFilename: string }>} components
 */
export default function findComponents(
  directory: string,
  components: { filename: string; indexFilename: string | null }[] = [],
) {
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const itemPath = path.resolve(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      findComponents(itemPath, components);
      return;
    }

    if (!componentRegex.test(item)) {
      return;
    }

    const indexFile = findIndexFile(directory);

    components.push({
      filename: itemPath,
      ...indexFile,
    });
  });

  return components;
}
