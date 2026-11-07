import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import DialogActions, { dialogActionsClasses as classes } from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
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
    testComponentPropWith: 'span',
  }));

  it.skipIf(isJsdom())('should apply margin to all children but the first one', function test() {
    const { container } = render(
      <DialogActions>
        <Button data-testid="child-1">Agree</Button>
        <Button data-testid="child-2" href="#">
          Agree
        </Button>
        <Button data-testid="child-3" component="span">
          Agree
        </Button>
        <div data-testid="child-4" />
      </DialogActions>,
    );

    const children = container.querySelectorAll('[data-testid^="child-"]');
    expect(children[0]).toHaveComputedStyle({ marginLeft: '0px' });
    expect(children[1]).toHaveComputedStyle({ marginLeft: '8px' });
    expect(children[2]).toHaveComputedStyle({ marginLeft: '8px' });
    expect(children[3]).toHaveComputedStyle({ marginLeft: '8px' });
  });
});
