import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: 300 }}>
      {/* @focus-start */}
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      {/* @focus-end */}
    </Box>
  );
}
