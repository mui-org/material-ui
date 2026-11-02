import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps) {
  const { sx = [], ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          bgcolor: '#fff',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          p: 1,
          borderRadius: 2,
          textAlign: 'center',
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

export default function GridAutoRows() {
  return (
    <div style={{ width: '100%', height: 220 }}>
      {/* @focus-start */}
      <Box sx={{ display: 'grid', gridAutoRows: '40px', gap: 1 }}>
        <Item sx={{ gridColumn: '1', gridRow: 'span 2' }}>span 2</Item>
        {/* The second non-visible row has height of 40px */}
        <Item sx={{ gridColumn: '1', gridRow: '4 / 5' }}>4 / 5</Item>
      </Box>
      {/* @focus-end */}
    </div>
  );
}
