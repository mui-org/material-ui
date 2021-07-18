import * as React from 'react';
import Button from '@material-ui/core/Button';

export default function Demo() {
  return (
    <React.Fragment>
      <Button disabled style={{ pointerEvents: 'all' }}>
        disabled with pointer-events
      </Button>
      <Button disabled>disabled without pointer-events</Button>
      <Button aria-disabled>aria-disabled</Button>
    </React.Fragment>
  );
}
