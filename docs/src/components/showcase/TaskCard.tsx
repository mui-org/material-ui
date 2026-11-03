import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CodeRounded from '@mui/icons-material/CodeRounded';
import ScheduleRounded from '@mui/icons-material/ScheduleRounded';

export default function TaskCard() {
  return (
    <Fade in timeout={700}>
      <Card
        data-mui-color-scheme="dark"
        sx={{
          minWidth: 280,
          maxWidth: 360,
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          background:
            'linear-gradient(180deg, var(--muidocs-palette-primary-600) 0%, var(--muidocs-palette-primary-700) 100%)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.04)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <ScheduleRounded fontSize="inherit" />
          <Typography variant="caption" sx={{ fontWeight: 'semiBold' }}>
            March 25th
          </Typography>
        </Box>
        <Box sx={{ my: 'auto' }}>
          <CodeRounded />
          <Typography
            component="div"
            sx={{ fontSize: 18, fontWeight: 'semiBold', lineHeight: 1.4 }}
          >
            Customize every button and chip instance primary color
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, py: 1, alignItems: 'center' }}>
          <Box
            sx={{
              p: 0.5,
              bgcolor: 'primary.400',
              border: '1px solid',
              borderColor: 'primary.100',
              borderRadius: 99,
            }}
          >
            <Avatar
              slotProps={{ img: { 'aria-labelledby': 'demo-task-card-assignee-name' } }}
              src="/static/images/avatar/2.jpg"
            />
          </Box>
          <div>
            <Typography sx={{ color: 'primary.100', fontWeight: 'semiBold', fontSize: 12 }}>
              Assigned to
            </Typography>
            <Typography
              id="demo-task-card-assignee-name"
              variant="body2"
              sx={{ fontWeight: 'semiBold' }}
            >
              Lucas Smith
            </Typography>
          </div>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LinearProgress
            aria-label="Progress"
            variant="determinate"
            value={60}
            sx={{
              flexGrow: 1,
              borderRadius: 10,
              backgroundColor: 'primary.400',
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 10,
                backgroundColor: '#fff',
              },
            }}
          />
          <Typography variant="body2" sx={{ color: 'primary.50', fontWeight: 700, ml: 2 }}>
            60%
          </Typography>
        </Box>
      </Card>
    </Fade>
  );
}
