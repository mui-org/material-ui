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

export default function StatComponent() {
  return (
    <StatRoot>
      <StatValue>19,267</StatValue>
      <StatUnit>Active users / month</StatUnit>
    </StatRoot>
  );
}
