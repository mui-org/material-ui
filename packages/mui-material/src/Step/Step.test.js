import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Step, { stepClasses as classes } from '@mui/material/Step';
import Stepper, { StepperContext } from '@mui/material/Stepper';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import StepButton, { stepButtonClasses } from '@mui/material/StepButton';
import describeConformance from '../../test/describeConformance';

describe('<Step />', () => {
  const { render } = createRenderer();

  // StepButton needs to be rendered in a StepperContext.Provider
  function renderInContext(node) {
    return render(
      <StepperContext.Provider
        value={{
          activeStep: 0,
          alternativeLabel: false,
          connector: null,
          nonLinear: false,
          orientation: 'horizontal',
          totalSteps: 1,
          isTabList: false,
        }}
      >
        {node}
      </StepperContext.Provider>,
    );
  }

  describeConformance(<Step />, () => ({
    classes,
    inheritComponent: 'li',
    render: renderInContext,
    muiName: 'MuiStep',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLLIElement,
  }));

  it('merges styles and other props into the root node', () => {
    render(
      <Step
        index={1}
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        data-testid="root"
        orientation="horizontal"
      />,
    );

    const rootNode = screen.getByTestId('root');
    expect(rootNode.style).to.have.property('paddingRight', '200px');
    expect(rootNode.style).to.have.property('color', 'purple');
    expect(rootNode.style).to.have.property('border', '1px solid tomato');
  });

  describe('rendering children', () => {
    it('renders children', () => {
      const { container } = renderInContext(
        <Step>
          <StepButton />
          <StepLabel />
        </Step>,
      );

      const stepLabel = container.querySelector(`.${stepLabelClasses.root}`);
      const stepButton = container.querySelector(`.${stepButtonClasses.root}`);
      expect(stepLabel).not.to.equal(null);
      expect(stepButton).not.to.equal(null);
    });

    it('should handle null children', () => {
      const { container } = renderInContext(
        <Step>
          <StepButton />
          {null}
        </Step>,
      );

      const stepButton = container.querySelector(`.${stepButtonClasses.root}`);
      expect(stepButton).not.to.equal(null);
    });

    it('should add the role presentation to the root node if the context is a tab list', () => {
      renderInContext(
        <Stepper activeStep={0}>
          <Step>
            <StepButton>Step 1</StepButton>
          </Step>
        </Stepper>,
      );

      const stepper = screen.getByRole('tablist');

      expect(stepper.childNodes[0]).to.have.attribute('role', 'presentation');
    });
  });

  describe('overriding context props', () => {
    it('overrides "active" context value', () => {
      render(
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step active>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>,
      );

      const stepLabel = screen.getByText('Step 3');
      expect(stepLabel).to.have.class(stepLabelClasses.active);
    });

    it('overrides "completed" context value', () => {
      render(
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step completed>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>,
      );

      const stepLabel = screen.getByText('Step 3');
      expect(stepLabel).to.have.class(stepLabelClasses.completed);
    });

    it('overrides "disabled" context value', () => {
      const { container } = render(
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step disabled>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>,
      );

      const stepLabels = container.querySelectorAll(`.${stepLabelClasses.root}`);
      expect(stepLabels[1]).to.have.class(stepLabelClasses.disabled);
    });

    it('checks that step connector is a child of the step when alternativeLabel is true', () => {
      const { container } = render(
        <Stepper activeStep={1} connector={<div data-testid="connector" />} alternativeLabel>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>,
      );

      const connectors = container.querySelectorAll('li>[data-testid="connector"]');
      expect(connectors).to.have.lengthOf(2);
    });

    it('checks that step connector is a child of the step when alternativeLabel is false', () => {
      const { container } = render(
        <Stepper
          activeStep={1}
          connector={<div data-testid="connector" />}
          alternativeLabel={false}
        >
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>,
      );

      const connectors = container.querySelectorAll('li>[data-testid="connector"]');
      expect(connectors).to.have.lengthOf(2);
    });
  });
});
