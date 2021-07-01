import * as React from 'react';
import TrapFocus from '@material-ui/core/Unstable_TrapFocus';

export default function BaseTrapFocus() {
  return (
    <React.Fragment>
      <button type="button" autoFocus data-testid="initial-focus">
        initial focus
      </button>
      <TrapFocus isEnabled={() => true} open>
        <div tabIndex={-1} data-testid="root">
          <div>Title</div>
          <button type="button">x</button>
          <button type="button">cancel</button>
          <button type="button">ok</button>
        </div>
      </TrapFocus>
    </React.Fragment>
  );
}
