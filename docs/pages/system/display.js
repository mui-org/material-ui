import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import * as pageProps from 'docs/data/system/display/display.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
