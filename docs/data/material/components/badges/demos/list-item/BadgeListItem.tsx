import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';

const unreadMessagesCount = 4;

export default function BadgeListItem() {
  return (
    // @focus-start
    <Paper variant="outlined" sx={{ width: 320, maxWidth: '100%' }}>
      <List component="nav" aria-label="mail folders" sx={{ py: 0 }}>
        <ListItemButton
          selected
          aria-current="page"
          aria-label={`Inbox, ${unreadMessagesCount} unread messages`}
        >
          <ListItemIcon>
            <Badge badgeContent={unreadMessagesCount} color="primary">
              <InboxIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
    </Paper>
    // @focus-end
  );
}
