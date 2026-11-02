import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { List } from 'react-window';
import type { RowComponentProps } from 'react-window';

function renderRow(props: RowComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      {/* @focus-start */}
      <List
        rowHeight={46}
        rowCount={200}
        style={{
          height: 400,
          width: 360,
        }}
        rowProps={{}}
        overscanCount={5}
        rowComponent={renderRow}
      />
      {/* @focus-end */}
    </Box>
  );
}
