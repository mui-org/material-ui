/**
 * Automated perf test: measures time from mousedown on the Autocomplete input
 * to the popup being committed to the DOM (via the performance.measure entry
 * written by the useLayoutEffect in useAutocomplete).
 *
 * Run with:
 *   pnpm test:e2e
 *
 * For a production build baseline first run:
 *   pnpm docs:build && pnpm docs:start
 * and point BASE_URL to the prod server.
 */
import { Browser, Page, chromium } from '@playwright/test';
import { beforeAll, afterAll, describe, it } from 'vitest';

const BASE_URL = 'http://localhost:5001';
const RUNS = 300;
const WARMUP = 10;

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function attemptGoto(page: Page, url: string) {
  for (let i = 0; i < 10; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await page.goto(url);
      return;
    } catch {
      // eslint-disable-next-line no-await-in-loop
      await sleep(250);
    }
  }
}

describe('Autocomplete open perf', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await attemptGoto(page, `${BASE_URL}/e2e/Autocomplete/OpenPerfAutocomplete#no-dev`);
    await page.waitForSelector('[data-testid="testcase"]:not([aria-busy="true"])');
  });

  afterAll(async () => {
    await browser.close();
  });

  it(`measures popup open time over ${RUNS} clicks`, { timeout: 60_000 }, async () => {
    const input = page.getByTestId('input');
    const durations: number[] = [];

    // Warm-up runs — discarded to let the JIT settle before measuring
    for (let i = 0; i < WARMUP; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await page.mouse.click(0, 0);
      // eslint-disable-next-line no-await-in-loop
      await sleep(50);
      // eslint-disable-next-line no-await-in-loop
      await input.click();
      // eslint-disable-next-line no-await-in-loop
      await sleep(50);
    }
    await page.mouse.click(0, 0);
    await sleep(50);

    for (let i = 0; i < RUNS; i += 1) {
      // Close the popup by clicking outside (triggers blur)
      // eslint-disable-next-line no-await-in-loop
      await page.mouse.click(0, 0);
      // eslint-disable-next-line no-await-in-loop
      await sleep(50);

      // Click the input and measure wall time until the listbox appears in the DOM
      const start = performance.now();
      // eslint-disable-next-line no-await-in-loop
      await input.click();
      // eslint-disable-next-line no-await-in-loop
      await page.waitForSelector('[role="listbox"]', { state: 'visible' });
      durations.push(performance.now() - start);
    }

    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);

    // eslint-disable-next-line no-console
    console.log(
      `\nAutocomplete open perf (${RUNS} runs):\n` +
        `  avg: ${avg.toFixed(2)}ms\n` +
        `  min: ${min.toFixed(2)}ms\n` +
        `  max: ${max.toFixed(2)}ms\n` +
        `  all: ${durations.map((d) => d.toFixed(2)).join(', ')}ms`,
    );
  });
});
