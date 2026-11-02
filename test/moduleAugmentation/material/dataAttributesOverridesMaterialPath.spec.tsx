import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import type { WithDataAttributes } from '@mui/material/utils';

// Augmenting `@mui/material/utils` (which re-exports `DataAttributesOverrides`
// from `@mui/utils/types`) merges into the original interface, so `data-*`
// becomes assignable on slot props through the Material-native path.
declare module '@mui/material/utils' {
  interface DataAttributesOverrides {
    [key: `data-${string}`]: string | number | boolean | undefined;
  }
}

// The augmentation reaches component slot props:
<Backdrop open slotProps={{ root: { 'data-testid': 'backdrop-root' } }} />;

// ...and the re-exported helper types custom slot props the same way:
export const customSlotProps: WithDataAttributes<{ size?: 'small' | 'large' }> = {
  size: 'small',
  'data-testid': 'custom',
};
