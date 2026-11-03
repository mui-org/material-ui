import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './first-look-at-joy.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
