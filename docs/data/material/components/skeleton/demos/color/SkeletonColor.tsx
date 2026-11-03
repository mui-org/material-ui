import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function SkeletonColor() {
  return (
    <Box
      sx={{
        bgcolor: '#121212',
        p: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* @focus-start */}
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={210}
        height={118}
      />
      {/* @focus-end */}
    </Box>
  );
}
