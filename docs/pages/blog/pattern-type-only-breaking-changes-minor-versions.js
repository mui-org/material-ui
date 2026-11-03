import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './pattern-type-only-breaking-changes-minor-versions.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
