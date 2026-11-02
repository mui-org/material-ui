import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MailIcon from '@mui/icons-material/Mail';

const unreadMessagesCount = 4;

export default function BadgeVisibility() {
  // @focus-start @padding 1
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible((previousInvisible) => !previousInvisible);
  };

  return (
    <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
      <IconButton
        aria-label={
          invisible
            ? 'open inbox'
            : `open inbox, ${unreadMessagesCount} unread messages`
        }
      >
        <Badge
          color="secondary"
          badgeContent={unreadMessagesCount}
          invisible={invisible}
        >
          <MailIcon />
        </Badge>
      </IconButton>
      <FormControlLabel
        control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
        label="Show unread count"
      />
    </Stack>
  );
  // @focus-end
}
