import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomDivButton = React.forwardRef(function CustomDivButton(props, ref) {
  return <div ref={ref} {...props} />;
});

export default function IconButtonA11yNonNative() {
  return (
    <Stack spacing={2} direction="row">
      <IconButton component={CustomDivButton} nativeButton={false} aria-label="Delete file">
        <DeleteIcon />
      </IconButton>
      <IconButton
        component={CustomDivButton}
        nativeButton={false}
        aria-label="Delete file"
        disabled
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
