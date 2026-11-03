import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './mui-next-js-app-router.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
