import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const colors = [
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning',
  'textSecondary',
  'textDisabled',
];

// Links inside body text, for each `underline` value and color. axe-core
// `link-in-text-block` checks the 3:1 contrast against the surrounding text,
// which uses `text.primary` as on a page with `CssBaseline`.
export default function LinkA11yInTextBlock() {
  return (
    <Stack spacing={1} sx={{ maxWidth: 600, color: 'text.primary' }}>
      {['always', 'hover', 'none'].map((underline) =>
        colors.map((color) => (
          <Typography key={`${underline}-${color}`} variant="body1">
            Before you change the {color} settings with underline {underline}, read the{' '}
            <Link href={`#${underline}-${color}`} underline={underline} color={color}>
              guide
            </Link>{' '}
            that explains each option and its effect on the rest of the page.
          </Typography>
        )),
      )}
    </Stack>
  );
}
