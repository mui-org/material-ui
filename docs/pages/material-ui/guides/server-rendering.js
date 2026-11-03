import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/server-rendering/server-rendering.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
