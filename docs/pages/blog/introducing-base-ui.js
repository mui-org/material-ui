import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './introducing-base-ui.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
