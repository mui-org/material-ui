import type * as DemoContentModule from './DemoContent';

let demoContentPromise: Promise<typeof DemoContentModule> | undefined;

export function loadDemoContent() {
  demoContentPromise ??= import('./DemoContent').catch((error) => {
    demoContentPromise = undefined;
    throw error;
  });
  return demoContentPromise;
}
