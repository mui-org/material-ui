import Box from '@mui/material/Box';

export default function Overflow() {
  return (
    <div style={{ width: 200, whiteSpace: 'nowrap' }}>
      {/* @focus-start */}
      <Box
        component="div"
        sx={(theme) => ({
          overflow: 'hidden',
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
        Not scrollable, overflow is hidden
      </Box>
      <Box
        component="div"
        sx={(theme) => ({
          overflow: 'auto',
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
        Try scrolling this overflow auto box
      </Box>
      {/* @focus-end */}
    </div>
  );
}
