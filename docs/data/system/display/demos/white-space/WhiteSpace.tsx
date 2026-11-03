import Box from '@mui/material/Box';

export default function WhiteSpace() {
  return (
    <div style={{ width: 200 }}>
      {/* @focus-start */}
      <Box
        component="div"
        sx={(theme) => ({
          whiteSpace: 'nowrap',
          overflowX: 'auto',
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
        Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
        1500s.
      </Box>
      <Box
        component="div"
        sx={(theme) => ({
          whiteSpace: 'normal',
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
        Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
        1500s.
      </Box>
      {/* @focus-end */}
    </div>
  );
}
