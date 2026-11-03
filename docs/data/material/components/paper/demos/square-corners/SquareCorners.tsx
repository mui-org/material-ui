import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function SquareCorners() {
  return (
    <Stack direction="row" spacing={2}>
      {/* @focus-start */}
      <DemoPaper square={false}>rounded corners</DemoPaper>
      <DemoPaper square>square corners</DemoPaper>
      {/* @focus-end */}
    </Stack>
  );
}
