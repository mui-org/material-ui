import Box from '@mui/system/Box';

export default function BoxSystemProps() {
  return (
    <Box
      sx={{
        height: 200,
        width: 200,
        my: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        p: 2,
        border: '2px solid grey',
      }}
    >
      {/* @focus-start */}
      This Box uses MUI System properties through the sx prop.
      {/* @focus-end */}
    </Box>
  );
}
