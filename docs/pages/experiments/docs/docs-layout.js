import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from './docs-layout.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} wideLayout />;
}
