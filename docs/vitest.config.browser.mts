import { mergeConfig } from 'vitest/config';
import sharedConfig from '../vitest.shared.mts';

export default mergeConfig(await sharedConfig(import.meta.url), {
  test: {
    exclude: ['scripts/syncCareers.test.ts'],
  },
});
