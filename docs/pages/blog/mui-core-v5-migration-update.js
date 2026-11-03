import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './mui-core-v5-migration-update.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
