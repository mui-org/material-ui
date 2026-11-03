import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/system/Box';

export default function Why() {
  return (
    <Box
      sx={{
        p: 2,
        minWidth: 300,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
        borderRadius: 2,
      }}
    >
      {/* @focus-start */}
      <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
      <Box
        sx={{ color: 'text.primary', fontSize: '2.125rem', fontWeight: 'medium' }}
      >
        98.3 K
      </Box>
      <Box
        component={TrendingUpIcon}
        sx={{ color: 'success.dark', fontSize: '1rem', verticalAlign: 'sub' }}
      />
      <Box
        sx={{
          display: 'inline',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          color: 'success.dark',
          mx: 0.5,
        }}
      >
        18.7%
      </Box>
      <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: '0.875rem' }}>
        vs. last week
      </Box>
      {/* @focus-end */}
    </Box>
  );
}
