import { createDemoClientFactory } from '@mui/internal-docs-infra/abstractCreateDemoClient';
// Import directly, not via the `../DemoContent` barrel, so this client factory
// doesn't drag the heavy `DemoContent` (eagerly re-exported by the barrel, which
// the bundler can't drop without `sideEffects: false`) into its graph. See
// `createDemo.ts`.
import DemoController from '../DemoContent/DemoController';

/**
 * Creates a demo client provider for live editing with precomputed externals.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param meta Additional meta and configuration for the demo client.
 */
export const createDemoClient = createDemoClientFactory({
  DemoController,
});
