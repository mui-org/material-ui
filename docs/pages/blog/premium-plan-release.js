import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './premium-plan-release.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
