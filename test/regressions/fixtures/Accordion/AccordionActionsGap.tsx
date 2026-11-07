import * as React from 'react';
import { AccordionActions, Button } from '@mui/material';

function AccordionActionsGap() {
  return (
    <AccordionActions>
      <Button data-testid="child-1">Agree</Button>
      <Button data-testid="child-2" href="#">
        Agree
      </Button>
      <Button data-testid="child-3" component="span">
        Agree
      </Button>
      <div data-testid="child-4" />
    </AccordionActions>
  );
}

export default AccordionActionsGap;
