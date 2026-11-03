import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps) {
  const { sx = [], ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          p: 1,
          m: 1,
          bgcolor: 'grey.100',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        }),
        ...[sx].flat(),
      ]}
      {...other}
    />
  );
}

export default function AlignSelf() {
  return (
    <div style={{ width: '100%' }}>
      {/* @focus-start */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 124,
          borderRadius: 1,
        }}
      >
        <Item>Item 1</Item>
        <Item sx={{ alignSelf: 'flex-end' }}>Item 2</Item>
        <Item>Item 3</Item>
      </Box>
      {/* @focus-end */}
    </div>
  );
}
