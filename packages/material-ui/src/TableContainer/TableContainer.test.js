import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import TableContainer, { tableContainerClasses as classes } from '@material-ui/core/TableContainer';

describe('<TableContainer />', () => {
  const render = createClientRender();

  describeConformanceV5(<TableContainer />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTableContainer',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentsProp'],
  }));
});
