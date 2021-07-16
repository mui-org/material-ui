import createCache from '@emotion/cache';

export default function createEmotionCache() {
  const cache = createCache({ key: 'css' });
  // compat is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561
  cache.compat = true;
  return cache;
}
