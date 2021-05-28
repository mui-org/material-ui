import * as React from 'react';
import Box from '@material-ui/core/Box';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItemButton key={index} component="div" ButtonBaseProps={{ style }}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItemButton>
  );
}

export default function VirtualizedList() {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
