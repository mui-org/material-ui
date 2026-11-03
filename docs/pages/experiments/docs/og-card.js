import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from './og-card.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
