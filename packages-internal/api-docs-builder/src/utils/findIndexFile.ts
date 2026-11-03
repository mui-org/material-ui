import fs from 'fs';
import path from 'path';

const indexFileRegex = /^index.(js|ts)$/;

/**
 * Returns index.js/ts in any directory or null
 * @param {string} directory
 */
export default function getIndexFile(directory: string) {
  const items = fs.readdirSync(directory);

  const indexFile = items.reduce((prev, curr) => {
    if (!indexFileRegex.test(curr)) {
      return prev;
    }
    return curr;
  }, '');

  return {
    indexFilename: indexFile ? path.join(directory, indexFile) : null,
  };
}
