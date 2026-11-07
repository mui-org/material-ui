import { describe, expect, it } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import DialogActions, { dialogActionsClasses as classes } from '@mui/material/DialogActions';
import describeConformance from '../../test/describeConformance';

describe('<DialogActions />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiDialogActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp'],
  }));

  it('should render a children element', function test() {
    render(
      <DialogActions>
        <div data-testid="test-children" />
      </DialogActions>,
    );

    expect(screen.queryByTestId('test-children')).not.to.equal(null);
  });
});
