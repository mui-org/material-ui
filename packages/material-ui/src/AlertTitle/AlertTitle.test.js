import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import AlertTitle, { alertTitleClasses as classes } from '@material-ui/core/AlertTitle';

describe('<AlertTitle />', () => {
  const render = createClientRender();

  describeConformanceV5(<AlertTitle />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiAlertTitle',
    refInstanceof: window.HTMLDivElement,
    testStateOverrides: { styleKey: 'root' },
    skip: ['componentsProp', 'themeVariants', 'themeDefaultProps'],
  }));
});
