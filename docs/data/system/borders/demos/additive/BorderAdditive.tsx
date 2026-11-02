import Box from '@mui/material/Box';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '5rem',
  height: '5rem',
};

export default function BorderAdditive() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {/* @focus-start */}
      <Box sx={{ ...commonStyles, border: 1 }} />
      <Box sx={{ ...commonStyles, borderTop: 1 }} />
      <Box sx={{ ...commonStyles, borderRight: 1 }} />
      <Box sx={{ ...commonStyles, borderBottom: 1 }} />
      <Box sx={{ ...commonStyles, borderLeft: 1 }} />
      {/* @focus-end */}
    </Box>
  );
}
