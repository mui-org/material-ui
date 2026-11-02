import Box from '@mui/material/Box';

export default function Hiding() {
  return (
    <div style={{ width: '100%' }}>
      {/* @focus-start */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          m: 1,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        hide on screens wider than md
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          m: 1,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        hide on screens smaller than md
      </Box>
      {/* @focus-end */}
    </div>
  );
}
