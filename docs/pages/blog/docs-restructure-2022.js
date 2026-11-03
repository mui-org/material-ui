import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './docs-restructure-2022.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
