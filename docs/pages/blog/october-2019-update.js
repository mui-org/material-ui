import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from '!@material-ui/markdown/loader!./october-2019-update.md';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
