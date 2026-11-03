'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { StyleSheet } from '@emotion/sheet';

export interface StyledEngineProviderProps {
  children?: React.ReactNode;
  enableCssLayer?: boolean | undefined;
  injectFirst?: boolean | undefined;
}

// To fix [Jest performance](https://github.com/mui/material-ui/issues/45638).
const cacheMap = new Map();

// Need to add a private variable to test the generated CSS from Emotion, this is the simplest way to do it.
// We can't test the CSS from `style` tag easily because the `speedy: true` (produce empty text content) is enabled by Emotion.
// Even if we disable it, JSDOM needs extra configuration to be able to parse `@layer` CSS.
/**
 * @internal
 */
export const TEST_INTERNALS_DO_NOT_USE: {
  insert?: ((rule: string, options?: unknown) => unknown) | undefined;
} = {
  /**
   * to intercept the generated CSS before inserting to the style tag, so that we can check the generated CSS.
   *
   * let rule;
   * TEST_INTERNALS_DO_NOT_USE.insert = (...args) => {
   *    rule = args[0];
   * };
   *
   * expect(rule).to.equal(...);
   */
  insert: undefined,
};

// We might be able to remove this when this issue is fixed:
// https://github.com/emotion-js/emotion/issues/2790
const createEmotionCache = (options: any, CustomSheet: any) => {
  const cache = createCache(options);

  // Do the same as https://github.com/emotion-js/emotion/blob/main/packages/cache/src/index.js#L238-L245
  cache.sheet = new CustomSheet({
    key: cache.key,
    nonce: cache.sheet.nonce,
    container: cache.sheet.container,
    speedy: cache.sheet.isSpeedy,
    prepend: cache.sheet.prepend,
    insertionPoint: cache.sheet.insertionPoint,
  });

  return cache;
};

let insertionPoint: any;
if (typeof document === 'object') {
  // Use `insertionPoint` over `prepend`(deprecated) because it can be controlled for GlobalStyles injection order
  // For more information, see https://github.com/mui/material-ui/issues/44597
  insertionPoint = document.querySelector('[name="emotion-insertion-point"]');
  if (!insertionPoint) {
    insertionPoint = document.createElement('meta');
    insertionPoint.setAttribute('name', 'emotion-insertion-point');
    insertionPoint.setAttribute('content', '');
    const head = document.querySelector('head');
    if (head) {
      head.prepend(insertionPoint);
    }
  }
}

function getCache(injectFirst?: boolean, enableCssLayer?: boolean) {
  if (injectFirst || enableCssLayer) {
    /**
     * This is for client-side apps only.
     * A custom sheet is required to make the GlobalStyles API injected above the insertion point.
     * This is because the [sheet](https://github.com/emotion-js/emotion/blob/main/packages/react/src/global.js#L94-L99) does not consume the options.
     */
    class MyStyleSheet extends StyleSheet {
      insert(rule: string, options?: unknown): unknown {
        if (TEST_INTERNALS_DO_NOT_USE.insert) {
          return TEST_INTERNALS_DO_NOT_USE.insert(rule, options);
        }
        if (this.key && this.key.endsWith('global')) {
          this.before = insertionPoint;
        }
        return (super.insert as (rule: string, options?: unknown) => unknown)(rule, options);
      }
    }
    const emotionCache = createEmotionCache(
      {
        // Use a dedicated key for the cascade-layer cache so its generated class
        // names (e.g. `mui-fyswvn`) can never collide with identically-hashed
        // UNLAYERED classes from the default/`injectFirst` cache (key `css`).
        // A collision lets an unlayered `.css-xxx` rule beat the layered one,
        // defeating MUI's own styles.
        key: enableCssLayer ? 'mui' : 'css',
        insertionPoint: injectFirst ? insertionPoint : undefined,
      },
      MyStyleSheet,
    );
    if (enableCssLayer) {
      const prevInsert = emotionCache.insert;
      (emotionCache as any).insert = (...args: any[]) => {
        if (!args[1].styles.match(/^@layer\s[^{]*$/)) {
          // avoid nested @layer
          args[1].styles = `@layer mui {${args[1].styles}}`;
        }
        return (prevInsert as (...insertArgs: any[]) => unknown)(...args);
      };
    }
    return emotionCache;
  }
  return undefined;
}

export default function StyledEngineProvider(props: StyledEngineProviderProps): React.JSX.Element {
  const { injectFirst, enableCssLayer, children } = props;
  const cache = React.useMemo(() => {
    const cacheKey = `${injectFirst}-${enableCssLayer}`;
    if (typeof document === 'object' && cacheMap.has(cacheKey)) {
      return cacheMap.get(cacheKey);
    }
    const fresh = getCache(injectFirst, enableCssLayer);
    cacheMap.set(cacheKey, fresh);
    return fresh;
  }, [injectFirst, enableCssLayer]);
  return (
    cache ? <CacheProvider value={cache}>{children}</CacheProvider> : children
  ) as React.JSX.Element;
}

(StyledEngineProvider as any).propTypes /* remove-proptypes */ = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * If `true`, the styles are wrapped in `@layer mui`.
   * Learn more about [Cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers).
   */
  enableCssLayer: PropTypes.bool,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override MUI's styles, set this prop.
   */
  injectFirst: PropTypes.bool,
};
