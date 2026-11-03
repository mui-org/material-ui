import * as React from 'react';
import copy from 'clipboard-copy';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { Link } from '@mui/internal-core-docs/Link';
import { NpmCopyButton } from '@mui/internal-core-docs/AppLayout';

interface GetStartedButtonsProps extends BoxProps {
  primaryLabel?: string;
  primaryUrl: string;
  primaryUrlTarget?: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
  secondaryUrlTarget?: string;
  installation?: string;
  altInstallation?: string;
}

export default function GetStartedButtons(props: GetStartedButtonsProps) {
  const [copied, setCopied] = React.useState(false);
  const {
    primaryLabel = 'Get started',
    primaryUrl,
    primaryUrlTarget = '_self',
    secondaryLabel,
    secondaryUrl,
    secondaryUrlTarget = '_self',
    installation,
    altInstallation,
    ...other
  } = props;

  const handleCopy = () => {
    setCopied(true);
    copy(installation!).then(() => {
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <React.Fragment>
      <Box
        {...other}
        sx={{
          display: 'flex',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: 1.5,
          '&& > *': {
            minWidth: { xs: '100%', md: '0%' },
          },
          ...other.sx,
        }}
      >
        <Button
          href={primaryUrl}
          component={Link}
          target={primaryUrlTarget}
          rel={primaryUrlTarget ? 'noopener' : ''}
          noLinkStyle
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ flexShrink: 0 }}
        >
          {primaryLabel}
        </Button>
        {installation ? (
          <Button
            // @ts-expect-error: The branding theme provides codeOutlined without global Button variant augmentation.
            variant="codeOutlined"
            endIcon={copied ? <CheckRounded color="primary" /> : <ContentCopyRounded />}
            onClick={handleCopy}
            sx={{
              maxWidth: '324px',
              display: 'inline-block',
              justifyContent: 'start',
              overflowX: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              position: 'relative',
              pr: 5,
            }}
          >
            {installation}
          </Button>
        ) : null}
        {secondaryLabel ? (
          <Button
            href={secondaryUrl}
            component={Link}
            target={secondaryUrlTarget}
            rel={secondaryUrlTarget ? 'noopener' : ''}
            noLinkStyle
            variant="outlined"
            color="secondary"
            endIcon={<KeyboardArrowRightRounded />}
          >
            {secondaryLabel}
          </Button>
        ) : null}
      </Box>
      {altInstallation && <NpmCopyButton installation={altInstallation} sx={{ mt: 2 }} />}
    </React.Fragment>
  );
}
