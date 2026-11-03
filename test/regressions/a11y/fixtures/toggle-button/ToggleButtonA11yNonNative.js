import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';

const CustomDivButton = React.forwardRef(function CustomDivButton(props, ref) {
  return <div ref={ref} {...props} />;
});

export default function ToggleButtonA11yNonNative() {
  return (
    <Stack spacing={2} direction="row">
      <ToggleButton component={CustomDivButton} nativeButton={false} value="on" selected>
        Non-native pressed
      </ToggleButton>
      <ToggleButton component={CustomDivButton} nativeButton={false} value="off">
        Non-native
      </ToggleButton>
      <ToggleButton component={CustomDivButton} nativeButton={false} value="disabled" disabled>
        Disabled non-native
      </ToggleButton>
    </Stack>
  );
}
