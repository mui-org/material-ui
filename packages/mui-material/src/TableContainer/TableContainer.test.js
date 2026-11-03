import { describe } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import TableContainer, { tableContainerClasses as classes } from '@mui/material/TableContainer';
import describeConformance from '../../test/describeConformance';

describe('<TableContainer />', () => {
  const { render } = createRenderer();

  describeConformance(<TableContainer />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTableContainer',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));
});
