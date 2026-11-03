import sharedConfig from '../../vitest.shared.mts';

export default sharedConfig(import.meta.url, {
  // getScrollbarSize needs this:
  enableScrollbars: true,
});
