import createCache from '@emotion/cache';

export default function createEmotionCache(options?: Parameters<typeof createCache>[0]) {
  const emotionCache = createCache({ key: 'mui', ...options });
  const prevInsert = emotionCache.insert;
  emotionCache.insert = (...args) => {
    // ignore styles that contain layer order (`@layer ...` without `{`)
    if (!args[1].styles.match(/^@layer\s[^{]*$/)) {
      args[1].styles = `@layer mui {${args[1].styles}}`;
    }
    return prevInsert(...args);
  };

  return emotionCache;
}
