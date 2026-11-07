import { describe, expect, it } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import CardActions, { cardActionsClasses as classes } from '@mui/material/CardActions';
import describeConformance from '../../test/describeConformance';

describe('<CardActions />', () => {
  const { render } = createRenderer();

  describeConformance(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiCardActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp'],
  }));

  it('should render a children element', function test() {
    render(
      <CardActions>
        <div data-testid="test-children" />
      </CardActions>,
    );

    expect(screen.queryByTestId('test-children')).not.to.equal(null);
  });
});
