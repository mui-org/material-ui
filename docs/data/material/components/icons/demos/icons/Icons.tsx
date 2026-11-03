import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';

export default function Icons() {
  return (
    <Stack direction="row" spacing={3}>
      {/* @focus-start */}
      <Icon>add_circle</Icon>
      <Icon color="primary">add_circle</Icon>
      <Icon sx={{ color: green[500] }}>add_circle</Icon>
      <Icon fontSize="small">add_circle</Icon>
      <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
      {/* @focus-end */}
    </Stack>
  );
}
