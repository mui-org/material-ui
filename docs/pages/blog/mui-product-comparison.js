import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './mui-product-comparison.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
