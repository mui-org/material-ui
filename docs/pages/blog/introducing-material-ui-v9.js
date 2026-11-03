import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './introducing-material-ui-v9.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
