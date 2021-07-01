const { promises: fs, readFileSync } = require('fs');
const path = require('path');
const { notEnglishMarkdownRegExp, prepareMarkdown } = require('./parseMarkdown');

/**
 * @param {string} string
 */
function upperCaseFirst(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

/**
 * @param {string} moduleID
 * @example moduleIDToJSIdentifier('./Box.js') === '$$IndexJs'
 * @example moduleIDToJSIdentifier('./Box-new.js') === '$$BoxNewJs'
 * @example moduleIDToJSIdentifier('../Box-new.js') === '$$$BoxNewJs'
 */
function moduleIDToJSIdentifier(moduleID) {
  const delimiter = /(\.|-|\/)/;
  return moduleID
    .split(delimiter)
    .filter((part) => !delimiter.test(part))
    .map((part) => (part.length === 0 ? '$' : part))
    .map(upperCaseFirst)
    .join('');
}

/**
 * @example findTranslatedVersions('/a/b/index.md') === ['index-en.md', 'index-ja.md', 'index.md']
 * @param {string} englishFilepath An absolute path to the english version written in markdown (.md)
 */
async function findTranslatedVersions(englishFilepath) {
  const filename = path.basename(englishFilepath, '.md');
  const files = await fs.readdir(path.dirname(englishFilepath));

  // Given: index.md
  // Match: index-en.md, index-ja.md
  // Don't Match: otherindex-en.md, index-eng.md, index-e.md, index.tsx
  const translatedVersionRegExp = new RegExp(`^${filename}${notEnglishMarkdownRegExp.source}`);

  return files
    .filter((filepath) => {
      return translatedVersionRegExp.test(filepath);
    })
    .concat(path.basename(englishFilepath));
}

/**
 * @type {import('webpack').loader.Loader}
 */
module.exports = async function demoLoader() {
  const rawKeys = await findTranslatedVersions(this.resourcePath);

  // TODO: Remove requireRaw mock (needs work in prepareMarkdown)
  const requireRaw = (moduleID) => {
    const filepath = path.join(path.dirname(this.resourcePath), moduleID.replace(/\//g, path.sep));
    this.addDependency(filepath);
    return readFileSync(filepath, { encoding: 'utf-8' });
  };
  requireRaw.keys = () => rawKeys;
  const pageFilename = this.context
    .replace(this.rootContext, '')
    // win32 to posix
    .replace(/\\/g, '/')
    .replace(/^\/src\/pages\//, '');
  const { docs } = prepareMarkdown({ pageFilename, requireRaw });

  const demos = {};
  const demoModuleIDs = new Set();
  new Set(
    docs.en.rendered
      .filter((markdownOrComponentConfig) => {
        return typeof markdownOrComponentConfig !== 'string' && markdownOrComponentConfig.demo;
      })
      .map((demoConfig) => {
        return demoConfig.demo;
      }),
  ).forEach((demoName) => {
    // TODO: const moduleID = demoName;
    // The import paths currently use a completely different format.
    // They should just use relative imports.
    const moduleID = `./${demoName.replace(`pages/${pageFilename}/`, '')}`;
    demos[demoName] = {
      module: moduleID,
      raw: requireRaw(moduleID),
    };
    demoModuleIDs.add(moduleID);

    try {
      const moduleTS = moduleID.replace(/\.js$/, '.tsx');
      const rawTS = requireRaw(moduleTS);

      // In development devs can choose whether they want to work on the TS or JS version.
      // But this leads to building both demo version i.e. more build time.
      demos[demoName].moduleTS = this.mode === 'production' ? moduleID : moduleTS;
      demos[demoName].rawTS = rawTS;
      demoModuleIDs.add(demos[demoName].moduleTS);
    } catch (error) {
      // TS version of the demo doesn't exist. This is fine.
    }
  });

  /**
   * @param {string} moduleID
   */
  function getRequireDemoIdentifier(moduleID) {
    return moduleIDToJSIdentifier(moduleID);
  }

  const transformed = `
    ${Array.from(demoModuleIDs)
      .map((moduleID) => {
        return `import ${getRequireDemoIdentifier(moduleID)} from '${moduleID}';`;
      })
      .join('\n')}

    export const docs = ${JSON.stringify(docs, null, 2)};
    export const demos = ${JSON.stringify(demos, null, 2)};
    export function requireDemo(module) {
      return {
        ${Array.from(demoModuleIDs)
          .map((moduleID) => {
            // TODO: Remove ES module interop once all demos are loaded via loader
            // i.e. replace `{ default: ... }`  with `...`
            return `'${moduleID}': { default: ${getRequireDemoIdentifier(moduleID)} }`;
          })
          .join(',\n')}
      }[module];
    }
    requireDemo.keys = () => {
      return ${JSON.stringify(demoModuleIDs, null, 2)}
    }`;

  return transformed;
};
