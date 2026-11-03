import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { Link } from '@mui/internal-core-docs/Link';

export function SideNavigationBanner() {
  return (
    <Link
      href="https://u24.gov.ua/about/"
      target="_blank"
      sx={[
        (theme) => ({
          p: 1,
          pl: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
          borderRadius: 1,
          transitionProperty: 'all',
          transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          '&:hover, &:focus-visible': {
            backgroundColor: (theme.vars || theme).palette.primary[50],
            borderColor: (theme.vars || theme).palette.primary[200],
          },
        }),
        (theme) =>
          theme.applyDarkStyles({
            backgroundColor: alpha(theme.palette.primary[900], 0.2),
            '&:hover, &:focus-visible': {
              backgroundColor: alpha(theme.palette.primary[900], 0.4),
              borderColor: (theme.vars || theme).palette.primary[900],
            },
          }),
      ]}
    >
      <Box sx={{ borderRadius: '3px', overflow: 'auto', width: 'fit-content', flexShrink: 0 }}>
        <Box sx={{ height: 6, width: 16, backgroundColor: '#0057B7' }} />
        <Box sx={{ height: 6, width: 16, backgroundColor: '#FFD700' }} />
      </Box>
      <Typography
        component="span"
        variant="caption"
        sx={{ fontWeight: 'medium', color: 'text.secondary' }}
      >
        MUI stands in solidarity with Ukraine.
      </Typography>
    </Link>
  );
}
