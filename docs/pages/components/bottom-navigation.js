import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  demos,
  docs,
  requireDemo,
} from 'docs/src/pages/components/bottom-navigation/bottom-navigation.md?@material-ui/markdown';

export default function Page() {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}
