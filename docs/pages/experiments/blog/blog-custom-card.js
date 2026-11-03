import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './blog-custom-card.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
