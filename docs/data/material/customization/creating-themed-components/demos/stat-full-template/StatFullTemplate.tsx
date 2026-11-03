import * as React from 'react';
import Stack from '@mui/material/Stack';
import { styled, useThemeProps } from '@mui/material/styles';

export interface StatProps {
  value: number | string;
  unit: string;
  variant?: 'outlined';
}

interface StatOwnerState extends StatProps {
  // …key value pairs for the internal state that you want to style the slot
  // but don't want to expose to the users
}

const StatRoot = styled('div', {
  name: 'MuiStat',
  slot: 'root',
})<{ ownerState: StatOwnerState }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: '-0.025em',
  fontWeight: 600,
  variants: [
    {
      props: {
        variant: 'outlined',
      },
      style: {
        border: `2px solid ${theme.palette.divider}`,
        boxShadow: 'none',
      },
    },
  ],
  ...theme.applyStyles('dark', {
    backgroundColor: 'inherit',
  }),
}));

const StatValue = styled('div', {
  name: 'MuiStat',
  slot: 'value',
})<{ ownerState: StatOwnerState }>(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div', {
  name: 'MuiStat',
  slot: 'unit',
})<{ ownerState: StatOwnerState }>(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    color: 'inherit',
  }),
}));

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  function Stat(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: 'MuiStat' });
    const { value, unit, variant, ...other } = props;

    const ownerState = { ...props, variant };

    return (
      <StatRoot ref={ref} ownerState={ownerState} {...other}>
        <StatValue ownerState={ownerState}>{value}</StatValue>
        <StatUnit ownerState={ownerState}>{unit}</StatUnit>
      </StatRoot>
    );
  },
);

export default function StatFullTemplate() {
  return (
    <Stack direction="row" spacing={2}>
      {/* @focus-start */}
      <Stat value="1.9M" unit="Favorites" />
      <Stat value="5.1M" unit="Views" variant="outlined" />
      {/* @focus-end */}
    </Stack>
  );
}
