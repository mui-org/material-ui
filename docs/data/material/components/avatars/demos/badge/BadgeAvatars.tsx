import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function BadgeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      {/* @focus-start */}
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp, online" src="/static/images/avatar/1.jpg" />
      </StyledBadge>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={2}
        color="primary"
      >
        <Avatar
          alt="Travis Howard, 2 unread messages"
          src="/static/images/avatar/2.jpg"
        />
      </Badge>
      <Badge
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<SmallAvatar alt="" src="/static/images/avatar/1.jpg" />}
      >
        <InsertDriveFileIcon
          color="action"
          fontSize="large"
          titleAccess="Q4 budget spreadsheet, last edited by Remy Sharp"
        />
      </Badge>
      {/* @focus-end */}
    </Stack>
  );
}
