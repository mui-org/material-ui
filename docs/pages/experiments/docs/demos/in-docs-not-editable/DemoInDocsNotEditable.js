import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function DemoInDocsNotEditable() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>
  );
}
