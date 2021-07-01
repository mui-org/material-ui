import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function GridAutoFlow() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 50px)',
          gap: 1,
        }}
      >
        <Item sx={{ gridColumn: '1', gridRow: '1 / 3' }}>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
        <Item sx={{ gridColumn: '5', gridRow: '1 / 3' }}>5</Item>
      </Box>
    </div>
  );
}
