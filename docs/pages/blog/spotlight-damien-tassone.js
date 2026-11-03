import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './spotlight-damien-tassone.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
