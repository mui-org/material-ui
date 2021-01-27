import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'components/bottom-navigation';
const requireImports = require.context(
  'docs/src/pages/components/bottom-navigation',
  false,
  /\.(js|tsx)$/,
);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/components/bottom-navigation',
  false,
  /\.(js|md|tsx)$/,
);

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireImports={requireImports} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
