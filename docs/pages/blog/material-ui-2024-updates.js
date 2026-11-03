import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './material-ui-2024-updates.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
