import Box from '@mui/material/Box';

export default function SpacingDemo() {
  return (
    <div>
      {/* @focus-start */}
      <Box
        sx={(theme) => ({
          p: 1,
          bgcolor: 'grey.50',
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
        p: 1
      </Box>
      <Box
        sx={(theme) => ({
          m: 1,
          bgcolor: 'grey.50',
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
        m: 1
      </Box>
      <Box
        sx={(theme) => ({
          p: 2,
          bgcolor: 'grey.50',
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
        p: 2
      </Box>
      {/* @focus-end */}
    </div>
  );
}
