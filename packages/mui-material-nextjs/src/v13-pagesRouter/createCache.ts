import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache(
  options?: { enableCssLayer?: boolean | undefined } & Parameters<typeof createCache>[0],
) {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  const { enableCssLayer, ...other } = options ?? {};

  const emotionCache = createCache({ key: 'mui', insertionPoint, ...other });
  if (enableCssLayer) {
    const prevInsert = emotionCache.insert;
    emotionCache.insert = (...args) => {
      // ignore styles that contain layer order (`@layer a, b, c;` without `{`)
      if (!args[1].styles.match(/^@layer\s[^{]*$/)) {
        args[1].styles = `@layer mui {${args[1].styles}}`;
      }
      return prevInsert(...args);
    };
  }
  return emotionCache;
}
