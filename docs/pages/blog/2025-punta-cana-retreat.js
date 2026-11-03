import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './2025-punta-cana-retreat.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
