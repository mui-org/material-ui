import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

const maxVisibleNotifications = 99;
const unreadNotificationsCount = 100;

function getUnreadNotificationsLabel(count: number) {
  if (count === 0) {
    return 'show no unread notifications';
  }
  if (count > maxVisibleNotifications) {
    return `show more than ${maxVisibleNotifications} unread notifications`;
  }
  return `show ${count} unread notification${count === 1 ? '' : 's'}`;
}

export default function BadgeIntro() {
  const label = getUnreadNotificationsLabel(unreadNotificationsCount);

  return (
    // @focus-start @padding 2
    <IconButton aria-label={label}>
      <Badge
        badgeContent={unreadNotificationsCount}
        color="secondary"
        max={maxVisibleNotifications}
      >
        <MailIcon />
      </Badge>
    </IconButton>
    // @focus-end
  );
}
