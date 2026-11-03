import Box from '@mui/material/Box';

export default function Height() {
  return (
    <Box sx={{ height: 100, width: '100%' }}>
      {/* @focus-start */}
      <Box
        sx={(theme) => ({
          height: '25%',
          width: 120,
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: 'grey.100',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        })}
      >
        Height 25%
      </Box>
      <Box
        sx={(theme) => ({
          height: '50%',
          width: 120,
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: 'grey.100',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        })}
      >
        Height 50%
      </Box>
      <Box
        sx={(theme) => ({
          height: '75%',
          width: 120,
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: 'grey.100',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        })}
      >
        Height 75%
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          width: 120,
          display: 'inline-block',
          p: 1,
          mx: 1,
          bgcolor: 'grey.100',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        })}
      >
        Height 100%
      </Box>
      {/* @focus-end */}
    </Box>
  );
}
