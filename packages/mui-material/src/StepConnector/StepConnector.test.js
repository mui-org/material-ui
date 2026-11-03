import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses as classes } from '@mui/material/StepConnector';
import describeConformance from '../../test/describeConformance';

describe('<StepConnector />', () => {
  const { render } = createRenderer();

  describeConformance(<StepConnector />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiStepConnector',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'themeVariants'],
  }));

  describe('rendering', () => {
    it('renders a div containing a span', () => {
      const { container } = render(<StepConnector />);

      const stepConnector = container.querySelector(`.${classes.root}`);
      const span = stepConnector.querySelector('span');
      expect(stepConnector).not.to.equal(null);
      expect(span).not.to.equal(null);
    });

    it('has the class when active', () => {
      const { container } = render(
        <Step active>
          <StepConnector />
        </Step>,
      );

      const stepConnector = container.querySelector(`.${classes.root}`);
      expect(stepConnector).to.have.class(classes.active);
    });

    it('has the class when completed', () => {
      const { container } = render(
        <Step completed>
          <StepConnector />
        </Step>,
      );

      const stepConnector = container.querySelector(`.${classes.root}`);
      expect(stepConnector).to.have.class(classes.completed);
    });

    it('has the class when disabled', () => {
      const { container } = render(
        <Step disabled>
          <StepConnector />
        </Step>,
      );

      const stepConnector = container.querySelector(`.${classes.root}`);
      expect(stepConnector).to.have.class(classes.disabled);
    });
  });
});
