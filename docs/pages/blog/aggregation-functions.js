import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './aggregation-functions.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
