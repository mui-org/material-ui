import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/packages-with-css-imports/configuring-bundlers-for-css-imports.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
