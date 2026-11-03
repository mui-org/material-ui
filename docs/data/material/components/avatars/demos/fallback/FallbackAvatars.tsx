import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

export default function FallbackAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      {/* @focus-start */}
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      >
        B
      </Avatar>
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      />
      <Avatar src="/broken-image.jpg" />
      {/* @focus-end */}
    </Stack>
  );
}
