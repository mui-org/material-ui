import { defineConfig } from 'vitest/config';
import A11yReporter from './a11y/a11yReporter';

export default defineConfig({
  test: {
    globals: true,
    globalSetup: ['./globalSetup.mts'],
    testTimeout: 60_000,
    maxConcurrency: 4,
    reporters: [['default', {}], new A11yReporter()],
  },
});
