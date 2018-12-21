import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/guides/testing', true, /\.md|\.js$/);
const reqSource = require.context('!raw-loader!../../docs/src/pages/guides/testing', true, /\.js$/);
const reqPrefix = 'pages/guides/testing';

function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
