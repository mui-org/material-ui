import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './august-2019-update.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
