import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './2026-and-beyond.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
