import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from './codeblock.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
