import * as React from 'react';
import type { AppType } from 'next/app';
import type { EmotionCache } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import nextDocument from './nextDocument.cjs';
import type { EmotionCacheProviderProps } from './pagesRouterV13App';
import createEmotionCache from './createCache';
import escapeHtmlInCss from '../escapeHtmlInCss';

const Document = nextDocument.default || nextDocument;

interface Plugin {
  enhanceApp: (
    App: React.ComponentType<React.ComponentProps<AppType>>,
  ) => (props: any) => React.JSX.Element;
  resolveProps: (initialProps: DocumentInitialProps) => Promise<DocumentInitialProps>;
}

/**
 * A utility to compose multiple `getInitialProps` functions.
 */
export function createGetInitialProps(plugins: Plugin[]) {
  return async function getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => plugins.reduce((result, plugin) => plugin.enhanceApp(result), App),
      });

    const initialProps = await Document.getInitialProps(ctx);

    const finalProps = await plugins.reduce(
      async (result, plugin) => plugin.resolveProps(await result),
      Promise.resolve(initialProps),
    );

    return finalProps;
  };
}

export interface DocumentHeadTagsProps {
  emotionStyleTags: React.ReactElement<unknown>[];
}

export function DocumentHeadTags(props: DocumentHeadTagsProps) {
  return (
    <React.Fragment>
      <meta name="emotion-insertion-point" content="" />
      {props.emotionStyleTags}
    </React.Fragment>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
export async function documentGetInitialProps(
  ctx: DocumentContext,
  options?: {
    emotionCache?: EmotionCache | undefined;
    plugins?: Plugin[] | undefined;
  },
) {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = options?.emotionCache ?? createEmotionCache();
  // The createEmotionServer has to be called directly after the cache creation due to the side effect of cache.compat = true,
  // otherwise the <style> tag will not come with the HTML string from the server.
  const { extractCriticalToChunks } = createEmotionServer(cache);

  return createGetInitialProps([
    {
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & EmotionCacheProviderProps>,
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
      resolveProps: async (initialProps) => {
        const { styles } = extractCriticalToChunks(initialProps.html);
        return {
          ...initialProps,
          emotionStyleTags: styles.map((style) => {
            if (!style.css.trim()) {
              return null;
            }
            const isLayerOrderRule = style.css.startsWith('@layer') && !style.css.includes('{');
            return (
              <style
                // If the style is a layer order rule, prefix with the cache key to let Emotion hydrate this node.
                // Otherwise, Emotion will hydrate only the non-global styles and they will override the layer order rule.
                data-emotion={`${isLayerOrderRule ? `${cache.key} ` : ''}${style.key} ${style.ids.join(' ')}`}
                key={style.key}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: escapeHtmlInCss(style.css) }}
                nonce={cache.nonce}
              />
            );
          }),
        };
      },
    },
    ...(options?.plugins ?? []),
  ])(ctx) as Promise<DocumentInitialProps & DocumentHeadTagsProps>;
}
