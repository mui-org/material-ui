import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';

// Strict opt-in: only the explicitly declared keys become assignable, giving
// teams a closed allow-list with autocomplete and typo-checking for those keys.
// An undeclared `data-*` key still errors (asserted below).
//
// This is the narrow counterpart to the loose index-signature variant in
// `dataAttributesOverrides.spec.tsx`. The two must live in separate compilation
// units: module augmentation is global, so the loose `[k: `data-${string}`]`
// signature would otherwise merge in here and make every `data-*` key pass.
declare module '@mui/utils/types' {
  interface DataAttributesOverrides {
    'data-testid'?: string;
  }
}

<Backdrop
  open
  slotProps={{
    root: {
      'data-testid': 'backdrop-root',
      // @ts-expect-error -- only the declared keys are allowed in the strict form
      'data-custom': 'forwarded',
    },
  }}
/>;
