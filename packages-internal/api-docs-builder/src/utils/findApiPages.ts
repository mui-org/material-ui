import path from 'path';
import * as fs from 'node:fs';

const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

export function extractApiPage(filePath: string) {
  filePath = filePath.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  return {
    apiPathname: filePath
      .replace(/^.*\/pages/, '')
      .replace(/\.(js|tsx)/, '')
      .replace(/^\/index$/, '/') // Replace `index` by `/`.
      .replace(/\/index$/, ''),
  };
}

export default function findApiPages(relativeFolder: string) {
  let pages: Array<{ pathname: string }> = [];
  let filePaths: string[] = [];
  try {
    filePaths = getAllFiles(path.join(process.cwd(), relativeFolder));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return [];
  }
  filePaths.forEach((itemPath) => {
    if (itemPath.endsWith('.js')) {
      const data = extractApiPage(itemPath);

      pages.push({ pathname: data.apiPathname });
    }
  });

  // sort by pathnames without '-' so that e.g. card comes before card-action
  pages = pages.sort((a, b) => {
    const pathnameA = a.pathname.replace(/-/g, '');
    const pathnameB = b.pathname.replace(/-/g, '');
    if (pathnameA < pathnameB) {
      return -1;
    }
    if (pathnameA > pathnameB) {
      return 1;
    }
    return 0;
  });

  return pages;
}
