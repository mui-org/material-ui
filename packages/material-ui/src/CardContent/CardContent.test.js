import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import CardContent, { cardContentClasses as classes } from '@material-ui/core/CardContent';

describe('<CardContent />', () => {
  const render = createClientRender();

  describeConformanceV5(<CardContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCardContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'themeVariants'],
    testComponentPropWith: 'span',
  }));
});
