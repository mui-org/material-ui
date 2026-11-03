import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function DemoInDocs() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {/* @focus-start */}
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
      {/* @focus-end */}
    </Stack>
  );
}
