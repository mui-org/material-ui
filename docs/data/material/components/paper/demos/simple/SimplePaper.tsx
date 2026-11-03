import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      {/* @focus-start */}
      <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} />
      {/* @focus-end */}
    </Box>
  );
}
