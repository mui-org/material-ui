import Box from '@mui/material/Box';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

export default function BorderColor() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {/* @focus-start */}
      <Box sx={{ ...commonStyles, borderColor: 'primary.main' }} />
      <Box sx={{ ...commonStyles, borderColor: 'secondary.main' }} />
      <Box sx={{ ...commonStyles, borderColor: 'error.main' }} />
      <Box sx={{ ...commonStyles, borderColor: 'grey.500' }} />
      <Box sx={{ ...commonStyles, borderColor: 'text.primary' }} />
      {/* @focus-end */}
    </Box>
  );
}
