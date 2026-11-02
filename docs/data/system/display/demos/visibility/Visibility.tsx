import Box from '@mui/material/Box';

export default function Visibility() {
  return (
    <div style={{ width: '100%' }}>
      {/* @focus-start */}
      <Box
        component="span"
        sx={(theme) => ({
          visibility: 'visible',
          my: 2,
          p: 1,
          bgcolor: 'grey.100',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        })}
      >
        Visible container
      </Box>
      <Box
        component="span"
        sx={{ visibility: 'hidden', p: 1, m: 1, bgcolor: 'background.paper' }}
      >
        Invisible container
      </Box>
      {/* @focus-end */}
    </div>
  );
}
