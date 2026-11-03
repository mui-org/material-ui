import Box from '@mui/material/Box';

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

export default function BorderRadius() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {/* @focus-start */}
      <Box sx={{ ...commonStyles, borderRadius: '50%' }} />
      <Box sx={{ ...commonStyles, borderRadius: 1 }} />
      <Box sx={{ ...commonStyles, borderRadius: '16px' }} />
      {/* @focus-end */}
    </Box>
  );
}
