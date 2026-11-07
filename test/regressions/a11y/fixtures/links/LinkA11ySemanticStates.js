import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function LinkA11ySemanticStates() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Link href="#link-a11y-docs">Read the installation guide</Link>
      {/* Renders a <button>, so it needs no href. */}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link component="button" variant="body2">
        Show more results
      </Link>
      <Link href="#link-a11y-new-tab" target="_blank" rel="noopener">
        Open the changelog (opens in a new tab)
      </Link>
      <Typography variant="body1">
        You can change these preferences on the{' '}
        <Link href="#link-a11y-settings">account settings page</Link> at any time.
      </Typography>
    </Stack>
  );
}
