import * as React from 'react';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Link } from '../../Link';
import { ROUTES, FEATURE_TOGGLE } from '../../constants';

const linkStyleOverrides = (theme: Theme) => ({
  color: 'inherit',
  textDecorationColor: 'currentColor',
  '&:hover': {
    color: (theme.vars || theme).palette.primary[200],
  },
  '&:focus-visible': {
    outline: '3px solid #fff',
    outlineOffset: '2px',
  },
});

function getCustomMessage() {
  return (
    <React.Fragment>
      {`🚀 Material UI and MUI X v9 are out! Check out the `}
      &nbsp;
      <Link
        href="/blog/introducing-mui-v9/"
        target="_blank"
        underline="always"
        sx={linkStyleOverrides}
      >
        announcement blogpost →
      </Link>
    </React.Fragment>
  );
}

function getDefaultHiringMessage() {
  return (
    <React.Fragment>
      🚀&#160;&#160;We&apos;re hiring a Designer, Full-stack Engineer, React Community Engineer, and
      more!&nbsp;&#160;
      <Link
        // Fix me!
        href={ROUTES.careers}
        target="_blank"
        underline="always"
        sx={linkStyleOverrides}
      >
        Check the careers page →
      </Link>
    </React.Fragment>
  );
}

export function AppHeaderBanner() {
  const showCustomMessage = true;
  const bannerMessage = showCustomMessage ? getCustomMessage() : getDefaultHiringMessage();

  return FEATURE_TOGGLE.enable_website_banner ? (
    <Typography
      sx={[
        {
          fontWeight: 'medium',
        },
        (theme) => ({
          color: '#fff',
          p: '12px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          justifyContent: 'center',
          fontSize: theme.typography.pxToRem(13),
          background: `linear-gradient(-90deg, ${(theme.vars || theme).palette.primary[700]}, ${
            (theme.vars || theme).palette.primary[500]
          } 120%)`,
          ...theme.applyDarkStyles({
            background: `linear-gradient(90deg, ${(theme.vars || theme).palette.primary[900]}, ${
              (theme.vars || theme).palette.primary[600]
            } 120%)`,
          }),
        }),
      ]}
    >
      {bannerMessage}
    </Typography>
  ) : null;
}
