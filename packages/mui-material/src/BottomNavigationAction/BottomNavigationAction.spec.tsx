import * as React from 'react';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import type { BottomNavigationActionOwnerState } from '@mui/material/BottomNavigationAction';

function testSelectedProp() {
  <BottomNavigationAction selected />;
  <BottomNavigationAction selected={false} />;

  // @ts-expect-error `selected` is a boolean
  <BottomNavigationAction selected="yes" />;
}

// `selected` is set by `BottomNavigation` on each child rather than by the
// consumer, so a theme author reaches it through `ownerState`. These are the
// conditions the component's own icon-centering rules use, and they only type
// because `selected` is on the public props type.
function testOwnerStateVariantConditions(ownerState: BottomNavigationActionOwnerState) {
  const clearsTheHiddenLabel = !ownerState.showLabel && !ownerState.selected;
  const hasNoLabelToClear = !ownerState.showLabel && !ownerState.selected && !ownerState.label;

  return { clearsTheHiddenLabel, hasNoLabelToClear };
}
