import Box from '@mui/material/Box';

export default function Block() {
  return (
    <div style={{ width: '100%' }}>
      {/* @focus-start */}
      <Box
        component="span"
        sx={(theme) => ({
          display: 'block',
          p: 1,
          m: 1,
          bgcolor: '#fff',
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
        block
      </Box>
      <Box
        component="span"
        sx={(theme) => ({
          display: 'block',
          p: 1,
          m: 1,
          bgcolor: '#fff',
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
        block
      </Box>
      {/* @focus-end */}
    </div>
  );
}
