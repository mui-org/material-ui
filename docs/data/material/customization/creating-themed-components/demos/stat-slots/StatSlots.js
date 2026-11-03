import { styled } from '@mui/material/styles';

const StatRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: '-0.025em',
  fontWeight: 600,
  ...theme.applyStyles('dark', {
    backgroundColor: 'inherit',
  }),
}));

const StatValue = styled('div')(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    color: 'inherit',
  }),
}));

const Label = styled('div')(({ theme }) => ({
  borderRadius: '2px',
  padding: theme.spacing(0, 1),
  color: 'white',
  position: 'absolute',
  ...theme.typography.body2,
  fontSize: '0.75rem',
  fontWeight: 500,
  backgroundColor: '#ff5252',
}));

export default function StatSlots() {
  return (
    <StatRoot
      sx={{ outline: '1px solid #ff5252', outlineOffset: 4, position: 'relative' }}
    >
      <StatValue sx={{ outline: '1px solid #ff5252', position: 'relative' }}>
        19,267
        <Label sx={{ right: 0, top: 4, transform: 'translateX(100%)' }}>value</Label>
      </StatValue>
      <StatUnit sx={{ outline: '1px solid #ff5252', position: 'relative' }}>
        Active users / month
        <Label sx={{ right: 0, top: 2, transform: 'translateX(100%)' }}>unit</Label>
      </StatUnit>
      <Label sx={{ left: -4, top: 4, transform: 'translateX(-100%)' }}>root</Label>
    </StatRoot>
  );
}
