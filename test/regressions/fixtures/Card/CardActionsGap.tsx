import * as React from 'react';
import { CardActions, Button } from '@mui/material';

function CardActionsGap() {
  return (
    <CardActions>
      <Button data-testid="child-1">Agree</Button>
      <Button data-testid="child-2" href="#">
        Agree
      </Button>
      <Button data-testid="child-3" component="span">
        Agree
      </Button>
      <div data-testid="child-4" />
    </CardActions>
  );
}

export default CardActionsGap;
