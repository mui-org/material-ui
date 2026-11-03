import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLicenseModel } from 'docs/src/components/pricing/LicenseModelContext';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  margin: '14px auto 4px',
  padding: 2,
  maxWidth: 170,
  minHeight: 0,
  overflow: 'visible',
  borderRadius: 20,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[100],
  backgroundColor: (theme.vars || theme).palette.grey[50],
  '&:has(.Mui-focusVisible)': {
    outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
    outlineOffset: '2px',
  },
  '& .MuiTabs-scroller, & .MuiTab-root': {
    // Override inline-style to see the box-shadow
    overflow: 'visible!important',
  },
  '& span': {
    zIndex: 1,
  },
  '& .MuiTab-root': {
    padding: '4px 8px',
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightSemiBold,
    minWidth: 0,
    minHeight: 0,
    color: (theme.vars || theme).palette.text.tertiary,
    borderRadius: 20,
    zIndex: 2,
    '&:hover': {
      color: (theme.vars || theme).palette.text.primary,
    },
    '&.Mui-selected': {
      color: (theme.vars || theme).palette.primary[600],
      fontWeight: theme.typography.fontWeightSemiBold,
    },
    '&.Mui-focusVisible': {
      outline: 'none',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#FFF',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.grey[200],
    height: '100%',
    borderRadius: 20,
    zIndex: 0,
    boxShadow: `0px 1px 2px ${(theme.vars || theme).palette.grey[200]}`,
  },
  ...theme.applyDarkStyles({
    borderColor: (theme.vars || theme).palette.primaryDark[700],
    backgroundColor: (theme.vars || theme).palette.primaryDark[900],
    '& .MuiTabs-indicator': {
      height: '100%',
      borderRadius: 20,
      backgroundColor: alpha(theme.palette.primaryDark[600], 0.5),
      borderColor: (theme.vars || theme).palette.primaryDark[600],
      boxShadow: `0px 1px 4px ${(theme.vars || theme).palette.common.black}`,
    },
    '& .MuiTab-root': {
      '&.Mui-selected': {
        color: (theme.vars || theme).palette.primary[200],
      },
    },
  }),
}));

const perpetualDescription =
  'One-time purchase to use the current versions forever in development. 12 months of updates included.';
const annualDescription =
  'Upon expiration, your permission to use the Software in development ends. The license is perpetual in production.';

const tooltipProps = {
  enterDelay: 400,
  enterNextDelay: 50,
  enterTouchDelay: 500,
  placement: 'top' as const,
  describeChild: true,
  slotProps: {
    tooltip: {
      sx: {
        fontSize: 12,
      },
    },
  },
};

export default function LicenseModelSwitch() {
  const { licenseModel, setLicenseModel } = useLicenseModel();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setLicenseModel(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledTabs
        aria-label="license model"
        selectionFollowsFocus
        value={licenseModel}
        onChange={handleChange}
      >
        <Tab
          disableFocusRipple
          value="perpetual"
          label={
            <Tooltip title={perpetualDescription} {...tooltipProps}>
              <span>Perpetual</span>
            </Tooltip>
          }
        />
        <Tab
          disableFocusRipple
          value="annual"
          label={
            <Tooltip title={annualDescription} {...tooltipProps}>
              <span>Annual</span>
            </Tooltip>
          }
        />
      </StyledTabs>
    </Box>
  );
}
