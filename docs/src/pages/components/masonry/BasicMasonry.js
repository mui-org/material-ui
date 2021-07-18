/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import Masonry from '@material-ui/lab/Masonry';
import MasonryItem from '@material-ui/lab/MasonryItem';
import Box from '@material-ui/core/Box';

export default function BasicMasonry() {
  return (
    <Masonry cols={4} spacing={1}>
      {heights.map((height, idx) => (
        <MasonryItem key={idx} contentHeight={height}>
          <Box sx={{textAlign:"center", height, border: 1, bgcolor: 'background.paper'}}>
            {idx + 1}
          </Box>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];
