import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function SizeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      {/* @focus-start */}
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 24, height: 24 }}
      />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
      {/* @focus-end */}
    </Stack>
  );
}
