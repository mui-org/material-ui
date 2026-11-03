import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';

export default function ValueAsFunction() {
  return (
    <div>
      {/* @focus-start */}
      <Box
        sx={{
          p: 1,
          border: 1,
          borderColor: (theme: Theme) => theme.palette.primary.main,
        }}
      >
        Border color with theme value.
      </Box>
      {/* @focus-end */}
    </div>
  );
}
