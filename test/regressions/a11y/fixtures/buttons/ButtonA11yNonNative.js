import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CustomDivButton = React.forwardRef(function CustomDivButton(props, ref) {
  return <div ref={ref} {...props} />;
});

export default function ButtonA11yNonNative() {
  return (
    <Stack spacing={2} direction="row">
      <Button component={CustomDivButton} nativeButton={false}>
        Non-native action
      </Button>
      <Button component={CustomDivButton} nativeButton={false} disabled>
        Disabled non-native
      </Button>
    </Stack>
  );
}
