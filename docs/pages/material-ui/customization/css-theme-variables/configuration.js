import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import {
  demos,
  docs,
  demoComponents,
  srcComponents,
} from 'docs/data/material/customization/css-theme-variables/configuration.md?muiMarkdown';

export default function Page() {
  return (
    <MarkdownDocs
      demos={demos}
      docs={docs}
      demoComponents={demoComponents}
      srcComponents={srcComponents}
    />
  );
}
