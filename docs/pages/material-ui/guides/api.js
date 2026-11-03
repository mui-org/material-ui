import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/api/api.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
