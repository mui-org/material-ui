import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha } from '@mui/material/styles';
import { Link } from '@mui/internal-core-docs/Link';

export default function EarlyBird() {
  return (
    <Container
      sx={{
        pt: 2,
        pb: { xs: 2, sm: 4, md: 8 },
        scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      }}
      id="early-bird"
    >
      <Stack
        sx={(theme) => ({
          borderRadius: 1,
          px: 2,
          py: 3,
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary[50], 0.2)}  50%, 
          ${(theme.vars || theme).palette.primary[50]} 100%)
          `,
          border: '1px solid',
          borderColor: 'grey.100',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
          ...theme.applyDarkStyles({
            background: `linear-gradient(180deg, ${alpha(theme.palette.primary[900], 0.4)}  50%, 
            ${alpha(theme.palette.primary[800], 0.6)} 100%)
            `,
            borderColor: 'primaryDark.600',
          }),
        })}
      >
        <div>
          <Typography sx={{ fontWeight: 'bold', mb: 0.5 }}>
            🐦&nbsp;&nbsp;Early bird special!
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 700 }}>
            Buy now at a reduced price (~25% off), and get early access to MUI X Premium, with the
            added opportunity to influence its development. The early bird special is available for
            a limited time, so don&apos;t miss this opportunity!
          </Typography>
        </div>
        <Button
          component={Link}
          noLinkStyle
          href="https://mui.com/store/items/mui-x-premium/"
          variant="contained"
          fullWidth
          endIcon={<KeyboardArrowRightRounded />}
          sx={{
            py: 1,
            flexShrink: 0,
            ml: { xs: 0, sm: 2 },
            mt: { xs: 3, sm: 0 },
            width: { xs: '100%', sm: '50%', md: 'fit-content' },
          }}
        >
          Buy now
        </Button>
      </Stack>
    </Container>
  );
}
