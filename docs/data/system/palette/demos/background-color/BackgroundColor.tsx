import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function BackgroundColor() {
  return (
    // @focus-start @padding 2
    <Grid container spacing={1}>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
          primary.main
        </Box>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Box
          sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', p: 2 }}
        >
          secondary.main
        </Box>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Box sx={{ bgcolor: 'error.main', color: 'error.contrastText', p: 2 }}>
          error.main
        </Box>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Box sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', p: 2 }}>
          warning.main
        </Box>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Box sx={{ bgcolor: 'info.main', color: 'info.contrastText', p: 2 }}>
          info.main
        </Box>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Box sx={{ bgcolor: 'success.main', color: 'success.contrastText', p: 2 }}>
          success.main
        </Box>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Box sx={{ bgcolor: 'text.primary', color: 'background.paper', p: 2 }}>
          text.primary
        </Box>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Box sx={{ bgcolor: 'text.secondary', color: 'background.paper', p: 2 }}>
          text.secondary
        </Box>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Box sx={{ bgcolor: 'text.disabled', color: 'background.paper', p: 2 }}>
          text.disabled
        </Box>
      </Grid>
    </Grid>
    // @focus-end
  );
}
