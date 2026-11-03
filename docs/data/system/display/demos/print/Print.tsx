import Box from '@mui/material/Box';

export default function Print() {
  return (
    <div style={{ width: '100%' }}>
      {/* @focus-start */}
      <Box
        sx={{
          display: 'block',
          displayPrint: 'none',
          m: 1,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Screen Only (Hide on print only)
      </Box>
      <Box
        sx={{
          display: 'none',
          displayPrint: 'block',
          m: 1,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Print Only (Hide on screen only)
      </Box>
      {/* @focus-end */}
    </div>
  );
}
