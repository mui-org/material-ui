import Box from '@mui/material/Box';

export default function Display() {
  return (
    <div style={{ width: '100%' }}>
      {/* @focus-start */}
      <Box
        sx={[
          (theme) => ({
            display: 'flex',
            m: 1,
            p: 1,
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
          }),
        ]}
      >
        {"I'm a flexbox container that uses flex!"}
      </Box>
      <Box
        sx={(theme) => ({
          display: 'inline-flex',
          m: 1,
          p: 1,
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
        {"I'm a flexbox container that uses inline-flex!"}
      </Box>
      {/* @focus-end */}
    </div>
  );
}
