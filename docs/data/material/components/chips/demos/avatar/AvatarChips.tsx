import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function AvatarChips() {
  return (
    <Stack direction="row" spacing={1}>
      {/* @focus-start */}
      <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Avatar"
        variant="outlined"
      />
      {/* @focus-end */}
    </Stack>
  );
}
