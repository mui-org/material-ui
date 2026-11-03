import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from 'docs/data/system/grid/grid.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
