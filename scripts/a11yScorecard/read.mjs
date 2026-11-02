import fs from 'fs/promises';
import path from 'path';
import {
  componentsDirectory,
  defaultsPath,
  indexPath,
  readOptional,
  readRegions,
  relative,
} from './files.mjs';
import { readAxeResults } from './axe.mjs';

export async function readJson(filepath) {
  const source = await readOptional(filepath);
  if (source === null) {
    return null;
  }
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(`${relative(filepath)} is not valid JSON: ${error.message}`);
  }
}

/**
 * The library-wide defaults: `packages/mui-material/src/accessibility.json`,
 * and the default not-applicable reasons written in the legend's regions.
 */
export async function readDefaults() {
  const data = await readJson(defaultsPath);
  if (data === null) {
    throw new Error(`${relative(defaultsPath)} is missing`);
  }
  return { data, regions: readRegions(await fs.readFile(indexPath, 'utf8')) };
}

/** A test title that starts with a criterion: `it('2.1.1 Keyboard: …')`, `describe('4.1.2 Name, Role, Value')`. */
const TEST_TITLE = /\(\s*(['"`])(\d+\.\d+\.\d+ (?:\\.|(?!\1)[^\\])*?)\1/g;

/**
 * The criteria a test file names in its test titles, as `[{ number, name }]`.
 * A title can name several: `'2.1.1 Keyboard, 2.4.3 Focus Order: …'`.
 */
export async function scanTests(component) {
  const file = path.join(componentsDirectory, component, `${component}.test.js`);
  const source = await readOptional(file);
  if (source === null) {
    return null;
  }
  const titles = [...source.matchAll(TEST_TITLE)].flatMap(([, , title]) =>
    title
      .split(':')[0]
      .split(/,\s*(?=\d+\.\d+\.\d+ )/)
      .map((part) => {
        const [, number, name] = part.match(/^(\S+) (.+)$/);
        return { number, name: name.trim() };
      }),
  );
  return { ref: relative(file), titles };
}

/**
 * Reads every `packages/mui-material/src/<Component>/accessibility.json`, the
 * hand-written regions of its `accessibility.md`, its axe results, and the
 * criteria its tests name. A component without a data file is not assessed yet.
 */
export default async function readReports() {
  const entries = await fs.readdir(componentsDirectory, { withFileTypes: true });

  const reports = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const dataPath = path.join(componentsDirectory, entry.name, 'accessibility.json');
        const data = await readJson(dataPath);
        if (data === null) {
          return null;
        }
        const reportPath = path.join(componentsDirectory, entry.name, 'accessibility.md');
        const extraTests = Array.isArray(data.tests) ? data.tests : [];
        return {
          component: entry.name,
          dataPath,
          reportPath,
          data,
          regions: readRegions(await readOptional(reportPath)),
          axe:
            typeof data.axe === 'string'
              ? await readAxeResults(data.axe, data.axeDemos).catch(() => null)
              : null,
          ownTests: await scanTests(entry.name),
          extraTests: await Promise.all(extraTests.map(scanTests)),
        };
      }),
  );

  return reports.filter(Boolean).sort((a, b) => a.component.localeCompare(b.component));
}
