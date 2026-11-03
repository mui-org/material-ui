import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './toolpad-use-cases.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
