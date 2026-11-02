import type { PlaywrightTestConfig } from '@playwright/test';

export type TestFixture = {};

const config: PlaywrightTestConfig<TestFixture> = {
  // The tests load a remote deploy preview, where a stalled request can use the full test timeout.
  retries: process.env.CI ? 2 : 0,
  reportSlowTests: {
    max: 1,
    threshold: 60 * 1000, // 1min
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://mui.com',
  },
};

export default config;
