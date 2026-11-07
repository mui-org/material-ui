import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// The WCAG text-spacing values, applied like a bookmarklet.
const textSpacing = {
  '& *': {
    letterSpacing: '0.12em !important',
    wordSpacing: '0.16em !important',
    lineHeight: '1.5 !important',
  },
};

// Doubles each rem size, like a 200% browser text size. The px height stays.
const doubleText = createTheme({ typography: { htmlFontSize: 8 } });

function renderLabels(sx = {}) {
  return (
    <Stack spacing={12} sx={{ width: 280, alignItems: 'flex-start', ...sx }}>
      <Fab variant="extended" color="primary">
        <EditIcon sx={{ mr: 1 }} />
        Edit your profile details
      </Fab>
      <Fab variant="extended" size="medium" color="secondary">
        Share this page with others
      </Fab>
      <Fab variant="extended" size="small" color="success">
        Open the accessibility settings
      </Fab>
    </Stack>
  );
}

// Each label fits on one line at the default settings (first column). With
// text spacing (second) or 200% text (third), the labels wrap, and the fixed
// height does not grow: the 1.4.4, 1.4.10, and 1.4.12 gap.
export default function FabA11yLongLabel() {
  return (
    <Stack direction="row" spacing={4} sx={{ py: 8 }}>
      {renderLabels()}
      {renderLabels(textSpacing)}
      <ThemeProvider theme={doubleText}>{renderLabels()}</ThemeProvider>
    </Stack>
  );
}
