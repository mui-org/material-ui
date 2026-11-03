import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from './headers.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
