import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ZIndex() {
  return (
    // @focus-start @padding 2
    <Typography
      component="div"
      variant="body1"
      style={{
        height: 100,
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={(theme) => ({
          bgcolor: 'grey.600',
          color: 'grey.50',
          border: '1px solid',
          borderColor: 'grey.300',
          p: 2,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          position: 'absolute',
          top: 40,
          left: '40%',
          zIndex: 'tooltip',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        })}
      >
        z-index tooltip
      </Box>
      <Box
        sx={(theme) => ({
          bgcolor: '#fff',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          p: 2,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          position: 'absolute',
          top: 0,
          left: '43%',
          zIndex: 'modal',
          ...theme.applyStyles('dark', {
            bgcolor: 'grey.800',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        })}
      >
        z-index modal
      </Box>
    </Typography>
    // @focus-end
  );
}
