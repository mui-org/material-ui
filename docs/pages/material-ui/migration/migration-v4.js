import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/migration-v4/migration-v4.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
