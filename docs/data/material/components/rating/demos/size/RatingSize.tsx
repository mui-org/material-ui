import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingSize() {
  return (
    <Stack spacing={1}>
      {/* @focus-start */}
      <Rating name="size-small" defaultValue={2} size="small" />
      <Rating name="size-medium" defaultValue={2} />
      <Rating name="size-large" defaultValue={2} size="large" />
      {/* @focus-end */}
    </Stack>
  );
}
