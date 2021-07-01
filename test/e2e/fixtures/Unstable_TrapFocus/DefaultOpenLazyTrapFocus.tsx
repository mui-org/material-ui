import * as React from 'react';
import TrapFocus from '@material-ui/core/Unstable_TrapFocus';

export default function BaseTrapFocus() {
  const [open, close] = React.useReducer(() => false, true);

  return (
    <React.Fragment>
      <button type="button" autoFocus data-testid="initial-focus">
        initial focus
      </button>
      <TrapFocus isEnabled={() => true} open={open} disableAutoFocus>
        <div data-testid="root">
          <div>Title</div>
          <button type="button" onClick={close}>
            close
          </button>
          <button type="button">noop</button>
        </div>
      </TrapFocus>
    </React.Fragment>
  );
}
