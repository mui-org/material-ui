import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
  accordionDetailsClasses as classes,
} from '@mui/material/AccordionDetails';
import describeConformance from '../../test/describeConformance';

describe('<AccordionDetails />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionDetails>Conformance</AccordionDetails>, () => ({
    classes,
    inheritComponent: 'div',
    render: (node) => {
      const { container, ...other } = render(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          {node}
        </Accordion>,
      );

      return {
        container: container.querySelector('[role="region"]'),
        ...other,
      };
    },
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordionDetails',
    skip: ['componentProp', 'themeVariants'],
  }));

  it('should render a children element', () => {
    render(
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
        <AccordionDetails>
          <div data-testid="test-children" />
        </AccordionDetails>
      </Accordion>,
    );

    expect(screen.queryByTestId('test-children')).not.to.equal(null);
  });
});
