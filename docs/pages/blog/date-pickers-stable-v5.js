import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './date-pickers-stable-v5.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
