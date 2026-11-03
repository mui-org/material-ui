import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { Link } from '../../Link';
import { FEATURE_TOGGLE } from '../../constants';

const showSurveyMessage = false;
const newVersion = true;

function isBlackFriday() {
  const today = Date.now();
  const start = new Date('2024-11-25').getTime();
  const end = new Date('2024-12-07T23:59:59Z').getTime();
  return today > start && today < end;
}

let hadHydrated = false;

export function AppFrameBanner() {
  if (!FEATURE_TOGGLE.enable_docsnav_banner) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mounted, setMounted] = React.useState(hadHydrated);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    hadHydrated = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  let message = '';
  let href = '';

  if (showSurveyMessage) {
    message = `🚀 Influence MUI's 2026 roadmap! Take our latest Developer Survey`;
    href = 'https://tally.so/r/3jOKG1?source=docs-banner';
  } else if (mounted && isBlackFriday()) {
    message = `Black Friday is here! Don't miss out on the best offers of the year.`;
    href = 'https://mui.com/store/bundles/?deal=black-friday&from=docs';
  } else if (newVersion) {
    message = `🚀 Material UI and MUI X v9 are out! Check out the announcement blogpost.`;
    href = '/blog/introducing-mui-v9/';
  }

  // Guard with NEXT_RUNTIME so this check is dead-code-eliminated from client bundles.
  if (process.env.NEXT_RUNTIME) {
    if (message.length > 100) {
      throw new Error(
        `Docs-infra: AppFrameBanner message is too long. It will overflow on smaller screens.`,
      );
    }
  }

  if (message === '' || href === '') {
    return null;
  }

  return (
    <Link
      href={href}
      target="_blank"
      variant="caption"
      sx={[
        (theme) => ({
          padding: theme.spacing('6px', 1.5),
          display: { xs: 'none', md: 'block' },
          fontWeight: 'medium',
          textWrap: 'nowrap',
          maxHeight: '34px',
          backgroundColor: alpha(theme.palette.primary[50], 0.8),
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
          borderRadius: 1,
          transition: 'all 150ms ease',
          '&:hover, &:focus-visible': {
            backgroundColor: alpha(theme.palette.primary[100], 0.4),
            borderColor: (theme.vars || theme).palette.primary[200],
          },
        }),
        (theme) =>
          theme.applyDarkStyles({
            backgroundColor: alpha(theme.palette.primary[900], 0.15),
            '&:hover, &:focus-visible': {
              backgroundColor: alpha(theme.palette.primary[900], 0.4),
              borderColor: (theme.vars || theme).palette.primary[900],
            },
          }),
      ]}
    >
      {message}
    </Link>
  );
}
