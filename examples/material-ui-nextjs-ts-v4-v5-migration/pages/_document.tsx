import * as React from 'react';
import type { DocumentProps, DocumentInitialProps, DocumentContext } from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document';
import type { AppProps } from 'next/app';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter';
import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v14-pagesRouter';
import { ServerStyleSheets as JSSServerStyleSheets } from '@mui/styles';
import theme from '../src/theme';

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="icon" href="/favicon.ico" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// You can find a benchmark of the available CSS minifiers under
// https://github.com/GoalSmashers/css-minification-benchmark
// We have found that clean-css is faster than cssnano but the output is larger.
// Waiting for https://github.com/cssinjs/jss/issues/279
// 4% slower but 12% smaller output than doing it in a single step.
//
// It's using .browserslistrc
let prefixer: any;
let cleanCSS: any;
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  const CleanCSS = require('clean-css');
  /* eslint-enable global-require */

  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const jssSheets = new JSSServerStyleSheets();

  const finalProps = await documentGetInitialProps(ctx, {
    plugins: [
      {
        enhanceApp: (App: React.ComponentType<AppProps>) =>
          function EnhanceApp(props: AppProps) {
            return jssSheets.collect(<App {...props} />);
          },
        resolveProps: async (initialProps: DocumentInitialProps) => {
          // Generate the css string for the styles coming from jss
          let css = jssSheets.toString();
          // It might be undefined, for example after an error.
          if (css && process.env.NODE_ENV === 'production') {
            const result1 = await prefixer.process(css, { from: undefined });
            css = result1.css;
            css = cleanCSS.minify(css).styles;
          }

          return {
            ...initialProps,
            styles: [
              ...(Array.isArray(initialProps.styles) ? initialProps.styles : [initialProps.styles]),
              <style
                id="jss-server-side"
                key="jss-server-side"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: css }}
              />,
              ...React.Children.toArray(initialProps.styles),
            ],
          };
        },
      },
    ],
  });

  return finalProps;
};
