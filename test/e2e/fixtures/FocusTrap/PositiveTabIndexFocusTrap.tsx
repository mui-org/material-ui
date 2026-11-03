/* eslint-disable jsx-a11y/tabindex-no-positive */
import * as React from 'react';
import FocusTrap from '@mui/material/Unstable_TrapFocus';

export default function PositiveTabIndexFocusTrap() {
  return (
    <React.Fragment>
      <button type="button" autoFocus data-testid="initial-focus">
        initial focus
      </button>
      <FocusTrap isEnabled={() => true} open>
        <div tabIndex={-1} data-testid="root">
          <button type="button">normal 1</button>
          <button type="button" tabIndex={3}>
            indexed 3
          </button>
          <button type="button" tabIndex={2}>
            indexed 2
          </button>
          <button type="button">normal 2</button>
          <button type="button" tabIndex={1}>
            indexed 1
          </button>
          <button type="button">normal 3</button>
        </div>
      </FocusTrap>
      <button type="button" data-testid="outside-after">
        outside after
      </button>
    </React.Fragment>
  );
}
