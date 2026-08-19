/**
 * Copies the DocSearch stylesheet out of node_modules so the docs can serve it themselves
 * instead of fetching it from a CDN. Keeping it a copy (rather than a committed file) means
 * the served CSS always matches the installed @docsearch/css.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const source = require.resolve('@docsearch/css/dist/style.css');
const target = path.join(import.meta.dirname, '../public/static/styles/docsearch.css');

await fs.mkdir(path.dirname(target), { recursive: true });
await fs.copyFile(source, target);
