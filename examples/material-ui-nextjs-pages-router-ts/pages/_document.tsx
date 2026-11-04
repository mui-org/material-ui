import * as React from 'react';
import type { DocumentProps, DocumentContext } from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v16-pagesRouter';
import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v16-pagesRouter';
import theme, { roboto } from '../src/theme';

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en" className={roboto.className}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
