import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './benny-joo-joining.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
