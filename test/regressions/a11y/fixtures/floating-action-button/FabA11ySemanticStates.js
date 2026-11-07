import * as React from 'react';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

const CustomDivButton = React.forwardRef(function CustomDivButton(props, ref) {
  return <div ref={ref} {...props} />;
});

export default function FabA11ySemanticStates() {
  return (
    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
      <Fab color="primary" aria-label="Add item">
        <AddIcon />
      </Fab>
      <Fab variant="extended" color="primary">
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab href="#fab-a11y-link" color="secondary" aria-label="Edit profile">
        <EditIcon />
      </Fab>
      <Fab disabled aria-label="Add item (disabled)">
        <AddIcon />
      </Fab>
      <Fab aria-label="Add to favorites" aria-pressed="true" color="error">
        <FavoriteIcon />
      </Fab>
      <Fab component={CustomDivButton} nativeButton={false} aria-label="Add note" size="small">
        <AddIcon />
      </Fab>
    </Stack>
  );
}
