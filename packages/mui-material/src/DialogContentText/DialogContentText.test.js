import { describe, it } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Typography from '@mui/material/Typography';
import DialogContentText, {
  dialogContentTextClasses as classes,
} from '@mui/material/DialogContentText';
import describeConformance from '../../test/describeConformance';

describe('<DialogContentText />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogContentText>foo</DialogContentText>, () => ({
    classes,
    inheritComponent: Typography,
    render,
    muiName: 'MuiDialogContentText',
    refInstanceof: window.HTMLParagraphElement,
    skip: ['themeVariants'],
  }));

  describe('prop: children', () => {
    it('should render children', () => {
      const children = <span data-testid="test-children" />;
      render(<DialogContentText>{children}</DialogContentText>);

      screen.getByTestId('test-children');
    });
  });
});
