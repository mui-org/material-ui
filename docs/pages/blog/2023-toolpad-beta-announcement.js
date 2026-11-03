import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './2023-toolpad-beta-announcement.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
