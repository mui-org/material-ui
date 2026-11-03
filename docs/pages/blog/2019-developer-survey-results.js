import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './2019-developer-survey-results.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
