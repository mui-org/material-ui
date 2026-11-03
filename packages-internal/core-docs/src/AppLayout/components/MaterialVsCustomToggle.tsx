import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button, { buttonClasses } from '@mui/material/Button';

interface MaterialVsCustomToggleProps {
  customized: boolean;
  setCustomized: React.Dispatch<boolean>;
}

export function MaterialVsCustomToggle({ customized, setCustomized }: MaterialVsCustomToggleProps) {
  return (
    <Box
      sx={(theme) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        p: 1.5,
        display: 'flex',
        gap: 1,
        zIndex: 3,
        background: `linear-gradient(to bottom, ${
          (theme.vars || theme).palette.common.black
        } 70%, transparent)`,
        [`& .${buttonClasses.root}`]: {
          borderRadius: 99,
          padding: '1px 8px',
          fontSize: theme.typography.pxToRem(12),
        },
        [`& .${buttonClasses.outlined}.${buttonClasses.colorPrimary}`]: {
          backgroundColor: alpha(theme.palette.primary[900], 0.5),
        },
      })}
    >
      <Button
        size="small"
        variant="outlined"
        color={customized ? 'secondary' : 'primary'}
        onClick={() => {
          setCustomized(false);
        }}
      >
        Material Design
      </Button>
      <Button
        size="small"
        variant="outlined"
        color={customized ? 'primary' : 'secondary'}
        onClick={() => {
          setCustomized(true);
        }}
      >
        Custom theme
      </Button>
    </Box>
  );
}
