import * as React from 'react';
import TopLayoutCompany from 'docs/src/modules/components/TopLayoutCompany';
import {
  demos,
  docs,
  requireDemo,
} from '!@material-ui/markdown/loader!docs/src/pages/company/software-engineer/software-engineer.md';

export default function Page() {
  return <TopLayoutCompany demos={demos} docs={docs} requireDemo={requireDemo} />;
}
