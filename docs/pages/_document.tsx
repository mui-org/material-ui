import * as React from 'react';
import NextDocument from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import {
  Document as MuiDocsDocument,
  createGetInitialProps,
} from '@mui/internal-core-docs/Document';
import type { DocumentProps } from '@mui/internal-core-docs/Document';

export default class MuiDocument extends NextDocument {
  static getInitialProps = createGetInitialProps({
    createPlugin: () => {
      const sheet = new ServerStyleSheet();
      return {
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        resolveProps: async (initialProps) => {
          const styles = [sheet.getStyleElement(), ...React.Children.toArray(initialProps.styles)];
          // After `getStyleElement()`, which throws once the sheet is sealed.
          sheet.seal();
          return { ...initialProps, styles };
        },
      };
    },
  });

  render() {
    return <MuiDocsDocument {...(this.props as unknown as DocumentProps)} />;
  }
}
