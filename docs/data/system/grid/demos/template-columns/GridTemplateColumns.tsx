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
          m: 1,
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

export default function GridTemplateColumns() {
  return (
    <div style={{ width: '100%' }}>
      {/* @focus-start */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </Box>
      {/* @focus-end */}
    </div>
  );
}
