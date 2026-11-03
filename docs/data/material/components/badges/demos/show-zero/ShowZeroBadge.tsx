import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';

export default function ShowZeroBadge() {
  return (
    <Stack spacing={2} direction="row">
      {/* @focus-start */}
      <IconButton aria-label="show no unread messages">
        <Badge color="secondary" badgeContent={0}>
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show 0 unread messages">
        <Badge color="secondary" badgeContent={0} showZero>
          <MailIcon />
        </Badge>
      </IconButton>
      {/* @focus-end */}
    </Stack>
  );
}
