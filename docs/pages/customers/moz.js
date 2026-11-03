import * as React from 'react';
import TopLayoutCaseStudy from 'docs/src/modules/components/TopLayoutCaseStudy';
import { docs } from './moz.md?muiMarkdown';

export default function Page() {
  return <TopLayoutCaseStudy docs={docs} />;
}
