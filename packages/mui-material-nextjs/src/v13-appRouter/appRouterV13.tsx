'use client';
import * as React from 'react';
import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from './nextNavigation.cjs';
import { useRouter as usePagesRouter } from '../nextCompatRouter.cjs';
import escapeHtmlInCss from '../escapeHtmlInCss';

export type AppRouterCacheProviderProps = {
  /**
   * These are the options passed to createCache() from 'import createCache from "@emotion/cache"'.
   */
  options?:
    | (Partial<OptionsOfCreateCache> & {
        /**
         * If `true`, the generated styles are wrapped within `@layer mui`.
         * This is useful if you want to override the Material UI's generated styles with different styling solution, like Tailwind CSS, plain CSS etc.
         */
        enableCssLayer?: boolean | undefined;
      })
    | undefined;
  /**
   * By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"'.
   */
  CacheProvider?: React.ElementType<{ value: EmotionCache }> | undefined;
  children: React.ReactNode;
};

/**
 * Emotion works OK without this provider but it's recommended to use this provider to improve performance.
 * Without it, Emotion will generate a new <style> tag during SSR for every component.
 * See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153 for why it's a problem.
 */
export default function AppRouterCacheProvider(props: AppRouterCacheProviderProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = usePagesRouter();
    if (router) {
      console.error(
        [
          'The App Router CacheProvider is not compatible with the Pages Router.',
          'Please use the Pages Router CacheProvider from `@mui/material-ui-nextjs/vx-pagesRouter` instead.',
        ].join('\n'),
      );
    }
  }
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [registry] = React.useState(() => {
    const cache = createCache({ ...options, key: options?.key ?? 'mui' });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: { name: string; isGlobal: boolean }[] = [];
    // Override the insert method to support streaming SSR with flush().
    cache.insert = (...args) => {
      if (options?.enableCssLayer && !args[1].styles.match(/^@layer\s[^{]*$/)) {
        args[1].styles = `@layer mui {${args[1].styles}}`;
      }
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: !selector,
        });
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const inserted = registry.flush();
    if (inserted.length === 0) {
      return null;
    }
    let styles = '';
    let dataEmotionAttribute = registry.cache.key;

    const globals: {
      name: string;
      style: string;
    }[] = [];

    inserted.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name];

      if (typeof style === 'string') {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    });

    return (
      <React.Fragment>
        {globals.map(({ name, style }) => (
          <style
            nonce={options?.nonce}
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: escapeHtmlInCss(style) }}
          />
        ))}
        {styles && (
          <style
            nonce={options?.nonce}
            data-emotion={dataEmotionAttribute}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: escapeHtmlInCss(styles) }}
          />
        )}
      </React.Fragment>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
