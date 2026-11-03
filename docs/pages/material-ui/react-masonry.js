import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import { AppFrame } from '@mui/internal-core-docs/AppLayout';
import * as pageProps from 'docs/data/material/components/masonry/masonry.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};
