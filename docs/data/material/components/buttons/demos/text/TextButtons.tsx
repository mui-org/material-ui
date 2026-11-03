import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function TextButtons() {
  return (
    <Stack direction="row" spacing={2}>
      {/* @focus-start */}
      <Button>Primary</Button>
      <Button disabled>Disabled</Button>
      <Button href="#text-buttons">Link</Button>
      {/* @focus-end */}
    </Stack>
  );
}
