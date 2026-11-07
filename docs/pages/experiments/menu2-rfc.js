import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MarkdownElement } from '@mui/internal-core-docs/MarkdownDocs';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import { docs } from './menu2-rfc.md?muiMarkdown';

const theme = createTheme({});

export default function Menu2RfcPage() {
  const localizedDoc = docs.en;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head title="Menu2 RFC draft" description={localizedDoc.description} />
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        {localizedDoc.rendered.map((chunk, index) =>
          typeof chunk === 'string' ? (
            <MarkdownElement key={index} renderedMarkdown={chunk} />
          ) : null,
        )}
      </Container>
    </ThemeProvider>
  );
}
