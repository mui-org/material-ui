import { describe } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import AlertTitle, { alertTitleClasses as classes } from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import describeConformance from '../../test/describeConformance';

describe('<AlertTitle />', () => {
  const { render } = createRenderer();

  describeConformance(<AlertTitle />, () => ({
    classes,
    inheritComponent: Typography,
    render,
    muiName: 'MuiAlertTitle',
    refInstanceof: window.HTMLDivElement,
    testStateOverrides: { styleKey: 'root' },
    skip: ['themeVariants', 'themeDefaultProps'],
  }));
});
