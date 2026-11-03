import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

const shapeSize = 32;

export default function BadgeOverlap() {
  return (
    <Stack spacing={3} direction="row">
      {/* @focus-start */}
      <Badge color="secondary" badgeContent={1}>
        <Rectangle />
      </Badge>
      <Badge color="secondary" variant="dot">
        <Rectangle />
      </Badge>
      <Badge color="secondary" overlap="circular" badgeContent={1}>
        <Circle />
      </Badge>
      <Badge color="secondary" overlap="circular" variant="dot">
        <Circle />
      </Badge>
      {/* @focus-end */}
    </Stack>
  );
}

function Rectangle() {
  return (
    <Box
      component="span"
      sx={{ bgcolor: 'primary.main', width: shapeSize, height: shapeSize }}
    />
  );
}

function Circle() {
  return (
    <Box
      component="span"
      sx={{
        bgcolor: 'primary.main',
        width: shapeSize,
        height: shapeSize,
        borderRadius: '50%',
      }}
    />
  );
}
