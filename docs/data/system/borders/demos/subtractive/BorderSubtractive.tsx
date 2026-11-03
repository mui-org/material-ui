import Box from '@mui/material/Box';

const commonStyles = {
  bgcolor: 'background.paper',
  border: 1,
  m: 1,
  borderColor: 'text.primary',
  width: '5rem',
  height: '5rem',
};

export default function BorderSubtractive() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {/* @focus-start */}
      <Box sx={{ ...commonStyles, border: 0 }} />
      <Box sx={{ ...commonStyles, borderTop: 0 }} />
      <Box sx={{ ...commonStyles, borderRight: 0 }} />
      <Box sx={{ ...commonStyles, borderBottom: 0 }} />
      <Box sx={{ ...commonStyles, borderLeft: 0 }} />
      {/* @focus-end */}
    </Box>
  );
}
