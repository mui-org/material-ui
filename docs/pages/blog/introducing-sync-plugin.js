import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './introducing-sync-plugin.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
