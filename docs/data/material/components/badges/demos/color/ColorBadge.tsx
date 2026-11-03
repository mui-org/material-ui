import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

export default function ColorBadge() {
  return (
    <Stack spacing={2} direction="row">
      {/* @focus-start */}
      <IconButton aria-label="show 8 shared files">
        <Badge badgeContent={8} color="primary">
          <FolderOpenIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show 2 confirmed events">
        <Badge badgeContent={2} color="success">
          <CalendarMonthIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show 1 critical alert">
        <Badge badgeContent={1} color="error">
          <ReportProblemOutlinedIcon />
        </Badge>
      </IconButton>
      {/* @focus-end */}
    </Stack>
  );
}
