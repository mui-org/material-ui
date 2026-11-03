import { describe } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import Stack, { stackClasses as classes } from '@mui/material/Stack';
import describeConformance from '../../test/describeConformance';

// The main tests are in mui-system Stack folder
describe('<Stack />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Stack {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiStack',
    testVariantProps: { direction: 'row' },
    skip: ['classesRoot'],
  }));
});
