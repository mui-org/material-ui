import { describe, expect, it } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import AccordionActions, {
  accordionActionsClasses as classes,
} from '@mui/material/AccordionActions';
import describeConformance from '../../test/describeConformance';

describe('<AccordionActions />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionActions>Conformance</AccordionActions>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordionActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp'],
  }));

  it('should render a children element', function test() {
    render(
      <AccordionActions>
        <div data-testid="test-children" />
      </AccordionActions>,
    );

    expect(screen.queryByTestId('test-children')).not.to.equal(null);
  });
});
