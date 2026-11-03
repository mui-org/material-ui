import { describe } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import CardContent, { cardContentClasses as classes } from '@mui/material/CardContent';
import describeConformance from '../../test/describeConformance';

describe('<CardContent />', () => {
  const { render } = createRenderer();

  describeConformance(<CardContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCardContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['themeVariants'],
    testComponentPropWith: 'span',
  }));
});
