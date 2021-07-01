import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import CardActions, { cardActionsClasses as classes } from '@material-ui/core/CardActions';

describe('<CardActions />', () => {
  const render = createClientRender();

  describeConformanceV5(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiCardActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));
});
