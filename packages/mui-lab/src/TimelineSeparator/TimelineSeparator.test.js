import { describe } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import TimelineSeparator, { timelineSeparatorClasses as classes } from '@mui/lab/TimelineSeparator';
import describeConformance from '../../test/describeConformance';

describe('<TimelineSeparator />', () => {
  const { render } = createRenderer();

  describeConformance(<TimelineSeparator />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTimelineSeparator',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'themeVariants'],
  }));
});
