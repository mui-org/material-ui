import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './danilo-leal-joining.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
