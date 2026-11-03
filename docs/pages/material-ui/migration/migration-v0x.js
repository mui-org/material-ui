import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/migration-v0x/migration-v0x.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
