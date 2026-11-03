import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function DotBadge() {
  return (
    // @focus-start @padding 2
    <IconButton aria-label="show new notifications">
      <Badge color="secondary" variant="dot">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    // @focus-end
  );
}
