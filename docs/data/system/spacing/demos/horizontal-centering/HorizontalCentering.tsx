import Box from '@mui/material/Box';

export default function HorizontalCentering() {
  return (
    <div>
      {/* @focus-start */}
      <Box
        sx={(theme) => ({
          mx: 'auto',
          width: 200,
          p: 1,
          m: 1,
          bgcolor: 'grey.50',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        })}
      >
        Centered element
      </Box>
      {/* @focus-end */}
    </div>
  );
}
