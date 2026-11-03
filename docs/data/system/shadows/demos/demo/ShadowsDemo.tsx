import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function ShadowsDemo() {
  return (
    // @focus-start @padding 2
    <Grid container>
      <Box
        sx={(theme) => ({
          boxShadow: 0,
          width: '8rem',
          height: '5rem',
          bgcolor: '#fff',
          color: 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
          }),
        })}
      >
        boxShadow: 0
      </Box>
      <Box
        sx={(theme) => ({
          boxShadow: 1,
          width: '8rem',
          height: '5rem',
          bgcolor: '#fff',
          color: 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
          }),
        })}
      >
        boxShadow: 1
      </Box>
      <Box
        sx={(theme) => ({
          boxShadow: 2,
          width: '8rem',
          height: '5rem',
          bgcolor: '#fff',
          color: 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
          }),
        })}
      >
        boxShadow: 2
      </Box>
      <Box
        sx={(theme) => ({
          boxShadow: 3,
          width: '8rem',
          height: '5rem',
          bgcolor: '#fff',
          color: 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
          }),
        })}
      >
        boxShadow: 3
      </Box>
    </Grid>
    // @focus-end
  );
}
