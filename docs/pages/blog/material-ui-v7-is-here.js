import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs, srcComponents } from './material-ui-v7-is-here.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} srcComponents={srcComponents} />;
}
