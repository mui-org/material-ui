import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './2020-introducing-sketch.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
