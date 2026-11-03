import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './june-2019-update.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
