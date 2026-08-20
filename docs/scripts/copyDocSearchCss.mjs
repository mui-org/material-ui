/**
 * Copies the DocSearch stylesheet out of node_modules so the docs can serve it themselves
 * instead of fetching it from a CDN. The version goes in the path so the file can be served
 * immutable, and so a bump lands on a URL no client has cached.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const { version } = require('@docsearch/css/package.json');

const source = require.resolve('@docsearch/css/dist/style.css');
const outDir = path.join(import.meta.dirname, '../public/static/docsearch');

// Drop older versions so they don't pile up in the export.
await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(path.join(outDir, version), { recursive: true });
await fs.copyFile(source, path.join(outDir, version, 'style.css'));
