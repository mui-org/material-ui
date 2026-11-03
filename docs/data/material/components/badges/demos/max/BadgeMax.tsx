import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';

export default function BadgeMax() {
  return (
    <Stack spacing={2} direction="row">
      {/* @focus-start */}
      <IconButton aria-label="show 99 unread messages">
        <Badge color="secondary" badgeContent={99}>
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show more than 99 unread messages">
        <Badge color="secondary" badgeContent={100}>
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show more than 999 unread messages">
        <Badge color="secondary" badgeContent={1000} max={999}>
          <MailIcon />
        </Badge>
      </IconButton>
      {/* @focus-end */}
    </Stack>
  );
}
