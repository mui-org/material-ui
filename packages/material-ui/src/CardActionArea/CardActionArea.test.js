import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import CardActionArea, { cardActionAreaClasses as classes } from '@material-ui/core/CardActionArea';
import ButtonBase from '@material-ui/core/ButtonBase';

describe('<CardActionArea />', () => {
  const render = createClientRender();

  describeConformanceV5(<CardActionArea />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiCardActionArea',
    testDeepOverrides: { slotName: 'focusHighlight', slotClassName: classes.focusHighlight },
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp', 'componentsProp'],
  }));
});
