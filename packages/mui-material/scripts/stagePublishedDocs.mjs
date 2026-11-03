/* eslint-disable no-console */
import fs from 'node:fs/promises';
import path from 'node:path';

const PACKAGE_ROOT = path.resolve(import.meta.dirname, '..');
const DOCS_PUBLIC = path.resolve(PACKAGE_ROOT, '../../docs/public');
const STAGE_DIR = path.join(PACKAGE_ROOT, 'published-docs');

if (!process.env.MUI_PUBLISH_DOCS) {
  console.log('[stage-docs] MUI_PUBLISH_DOCS not set, skipping docs staging.');
  process.exit(0);
}

await fs.rm(STAGE_DIR, { recursive: true, force: true });

let count = 0;
for await (const entry of fs.glob('material-ui/**/*.md', { cwd: DOCS_PUBLIC })) {
  const src = path.join(DOCS_PUBLIC, entry);
  const dst = path.join(STAGE_DIR, entry);
  await fs.mkdir(path.dirname(dst), { recursive: true });
  await fs.copyFile(src, dst);
  count += 1;
}

if (count === 0) {
  throw new Error(
    'No markdown files found in docs/public/material-ui/. Run "pnpm docs:llms:build" first.',
  );
}

console.log(`[stage-docs] Staged ${count} markdown files into published-docs/.`);
