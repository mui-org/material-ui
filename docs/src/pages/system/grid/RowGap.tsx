import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function RowGap() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'grid', rowGap: '10px', gridTemplateRows: '25% 80px auto' }}
      >
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1 }} />
        <Box sx={{ border: 1, p: 1 }} />
      </Box>
    </div>
  );
}
