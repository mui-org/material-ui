import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './marija-najdova-joining.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
