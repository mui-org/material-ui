import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Content() {
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid size="grow">
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                slotProps={{
                  input: {
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  },
                }}
                variant="standard"
              />
            </Grid>
            <Grid>
              <Button variant="contained" sx={{ mr: 1 }}>
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography align="center" sx={{ color: 'text.secondary', my: 5, mx: 2 }}>
        No users for this project yet
      </Typography>
    </Paper>
  );
}
