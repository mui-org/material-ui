import Badge from '@mui/material/Badge';

function classesTest() {
  return (
    <Badge badgeContent={4} classes={{ badge: 'testBadgeClassName', colorInfo: 'colorInfoClass' }}>
      <div>Hello World</div>
    </Badge>
  );
}

<Badge anchorOrigin={{ vertical: 'bottom' }} />;
<Badge anchorOrigin={{ horizontal: 'left' }} />;
<Badge
  slotProps={{
    badge: {
      sx: {
        color: 'red',
      },
    },
  }}
/>;
