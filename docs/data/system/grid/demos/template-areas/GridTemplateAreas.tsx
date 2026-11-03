import Box from '@mui/material/Box';

export default function GridTemplateAreas() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '140px',
        color: '#fff',
        '& > .MuiBox-root > .MuiBox-root': {
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        },
      }}
    >
      {/* @focus-start */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          gridTemplateRows: 'auto',
          gridTemplateAreas: `"header header header header"
        "main main . sidebar"
        "footer footer footer footer"`,
        }}
      >
        <Box sx={{ gridArea: 'header', bgcolor: 'primary.main' }}>Header</Box>
        <Box sx={{ gridArea: 'main', bgcolor: 'secondary.main' }}>Main</Box>
        <Box sx={{ gridArea: 'sidebar', bgcolor: 'error.main' }}>Sidebar</Box>
        <Box sx={{ gridArea: 'footer', bgcolor: 'warning.dark' }}>Footer</Box>
      </Box>
      {/* @focus-end */}
    </Box>
  );
}
