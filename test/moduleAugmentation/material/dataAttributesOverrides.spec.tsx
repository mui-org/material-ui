import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';

// Loose opt-in: accept any `data-*` key on every MUI slot prop, mirroring the
// primitive DOM elements. A single augmentation of the shared
// `DataAttributesOverrides` interface flows through `SlotComponentProps` /
// `SlotComponentPropsWithSlotState` in `@mui/utils/types` (and `SlotProps` in
// `@mui/material`) to every slot of every component wired through these helpers.
//
// See `dataAttributesOverridesAllowList.spec.tsx` for the narrow counterpart
// (a closed allow-list with autocomplete). The two variants live in separate
// files because module augmentation is global per compilation unit.
declare module '@mui/utils/types' {
  interface DataAttributesOverrides {
    [k: `data-${string}`]: string | number | boolean | undefined;
  }
}

// Object form: arbitrary `data-*` keys are assignable.
<Backdrop
  open
  slotProps={{
    root: {
      'data-testid': 'backdrop-root',
      'data-custom': 'forwarded',
    },
  }}
/>;

// Callback form: the same widening applies to the function branch.
<Backdrop
  open
  slotProps={{
    root: () => ({
      'data-testid': 'backdrop-root',
      'data-custom': 'forwarded',
    }),
  }}
/>;
