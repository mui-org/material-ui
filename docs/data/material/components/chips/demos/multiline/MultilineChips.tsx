import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export default function MultilineChips() {
  return (
    <Box sx={{ width: 100 }}>
      {/* @focus-start */}
      <Chip
        sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
        }}
        label="This is a chip that has multiple lines."
      />
      {/* @focus-end */}
    </Box>
  );
}
