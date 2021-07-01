import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  docs,
  demos,
  requireDemo,
} from '!@material-ui/markdown/loader!docs/src/pages/production-error/index.md';

export default function Page() {
  return <MarkdownDocs demos={demos} disableAd docs={docs} requireDemo={requireDemo} />;
}
