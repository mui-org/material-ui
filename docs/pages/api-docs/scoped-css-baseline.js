import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'api/scoped-css-baseline';
const requireRaw = require.context(
  '!raw-loader!./',
  false,
  /scoped-css-baseline\.md$/,
  'lazy',
);

// eslint-disable-next-line react/prop-types
export default function Page({ docs }) {
  return <MarkdownDocs docs={docs} />;
}

Page.getInitialProps = async (ctx) => {
  const { demos, docs } = await prepareMarkdown({ ctx, pageFilename, requireRaw });
  return { demos, docs };
};
