import React from 'react';
import TopLayoutCompany from 'docs/src/modules/components/TopLayoutCompany';
import {
  demos,
  docs,
  requireDemo,
} from '!@material-ui/markdown/loader!docs/src/pages/company/lead-designer/lead-designer.md';

export default function Page() {
  return <TopLayoutCompany demos={demos} docs={docs} requireDemo={requireDemo} />;
}
