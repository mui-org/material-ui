import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { chromium } from '@playwright/test';

const { values } = parseArgs({
  options: {
    suite: { type: 'string' },
    out: { type: 'string' },
    states: { type: 'string', default: 'default,open,dark,brand' },
    url: { type: 'string', default: 'http://localhost:5001' },
  },
});

if (!values.suite || !values.out) {
  throw new Error('Usage: capture.mjs --suite <Suite> --out <dir> [--states a,b] [--url <base>]');
}

const fixtureDir = path.resolve('test/regressions/fixtures', values.suite);
const fixtures = (await fs.readdir(fixtureDir))
  .filter((file) => /\.(js|tsx?)$/.test(file))
  .map((file) => file.replace(/\.\w+$/, ''));
const states = values.states.split(',');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });

async function capture(fixture, state) {
  const [scenario, option] = fixture.split('--');
  await page.goto(`${values.url}/regression-${values.suite}/${fixture}?state=${state}#no-dev`, {
    waitUntil: 'networkidle',
  });
  await page.waitForTimeout(400);
  const file = path.resolve(values.out, scenario, `${option}-${state}.png`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const target = await page.$('[data-testid="screenshot-target"]');
  await (target ?? page).screenshot({ path: file });
  process.stdout.write(`${file}\n`);
}

const jobs = fixtures.flatMap((fixture) => states.map((state) => [fixture, state]));
await jobs.reduce(
  (previous, [fixture, state]) => previous.then(() => capture(fixture, state)),
  Promise.resolve(),
);

await browser.close();
