import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function CenteredElementGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* @focus-start */}
      <Grid container spacing={2} sx={{ minHeight: 160 }}>
        <Grid
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          size="grow"
        >
          <Avatar src="/static/images/avatar/1.jpg" />
        </Grid>
        <Grid
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Avatar src="/static/images/avatar/2.jpg" />
        </Grid>
        <Grid
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          size="grow"
        >
          <Avatar src="/static/images/avatar/3.jpg" />
        </Grid>
      </Grid>
      {/* @focus-end */}
    </Box>
  );
}
