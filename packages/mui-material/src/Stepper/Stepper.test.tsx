import { describe, it, expect } from 'vitest';
import { spy } from 'sinon';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { StepProps } from '@mui/material/Step';
import Step, { stepClasses } from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepContent, { stepContentClasses } from '@mui/material/StepContent';
import Stepper, { stepperClasses as classes } from '@mui/material/Stepper';
import describeConformance from '../../test/describeConformance';
import StepButton from '../StepButton';

describe('<Stepper />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Stepper>
      <Step />
    </Stepper>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiStepper',
      refInstanceof: window.HTMLOListElement,
      testVariantProps: { variant: 'foo' },
      testStateOverrides: { prop: 'alternativeLabel', value: true, styleKey: 'alternativeLabel' },
    }),
  );

  describe('rendering children', () => {
    it('renders 3 Step and 2 StepConnector components', () => {
      const { container } = render(
        <Stepper>
          <Step />
          <Step />
          <Step />
        </Stepper>,
      );

      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);
      const steps = container.querySelectorAll(`.${stepClasses.root}`);

      expect(connectors).to.have.length(2);
      expect(steps).to.have.length(3);
    });
  });

  describe('controlling child props', () => {
    it('controls children linearly based on the activeStep prop', () => {
      const { container, setProps } = render(
        <Stepper activeStep={0}>
          <Step />
          <Step />
          <Step />
        </Stepper>,
      );

      const steps = container.querySelectorAll(`.${stepClasses.root}`);
      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(steps[0]).not.to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).to.have.class(stepConnectorClasses.disabled);
      expect(connectors[1]).to.have.class(stepConnectorClasses.disabled);

      setProps({ activeStep: 1 });

      expect(steps[0]).to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[0]).to.have.class(stepConnectorClasses.active);
      expect(connectors[1]).to.have.class(stepConnectorClasses.disabled);
    });

    it('controls children non-linearly based on the activeStep prop', () => {
      const { container, setProps } = render(
        <Stepper nonLinear activeStep={0}>
          <Step />
          <Step />
          <Step />
        </Stepper>,
      );

      const steps = container.querySelectorAll(`.${stepClasses.root}`);
      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(steps[0]).not.to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[1]).not.to.have.class(stepConnectorClasses.disabled);

      setProps({ activeStep: 1 });

      expect(steps[0]).not.to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[0]).to.have.class(stepConnectorClasses.active);
      expect(connectors[1]).not.to.have.class(stepConnectorClasses.disabled);

      setProps({ activeStep: 2 });

      expect(steps[0]).not.to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[1]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[1]).to.have.class(stepConnectorClasses.active);
    });

    it('passes index down correctly when rendering children containing arrays', () => {
      function CustomStep({ index }: StepProps) {
        return <div data-index={index} data-testid="step" />;
      }

      render(
        <Stepper nonLinear>
          <CustomStep />
          {[<CustomStep key={1} />, <CustomStep key={2} />]}
        </Stepper>,
      );

      const steps = screen.getAllByTestId('step');

      expect(steps[0]).to.have.attribute('data-index', '0');
      expect(steps[1]).to.have.attribute('data-index', '1');
      expect(steps[2]).to.have.attribute('data-index', '2');
    });
  });

  describe('step connector', () => {
    it('should have a default step connector', () => {
      const { container } = render(
        <Stepper>
          <Step />
          <Step />
        </Stepper>,
      );

      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(connectors).to.have.length(1);
    });

    it('should allow the developer to specify a custom step connector', () => {
      function CustomConnector() {
        return <div className="CustomConnector" />;
      }
      const { container } = render(
        <Stepper connector={<CustomConnector />}>
          <Step />
          <Step />
        </Stepper>,
      );

      const defaultConnectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);
      const customConnectors = container.querySelectorAll('.CustomConnector');

      expect(defaultConnectors).to.have.length(0);
      expect(customConnectors).to.have.length(1);
    });

    it('should allow the step connector to be removed', () => {
      const { container } = render(
        <Stepper connector={null}>
          <Step />
          <Step />
        </Stepper>,
      );

      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(connectors).to.have.length(0);
    });

    it('should pass active prop to connector when second step is active', () => {
      const { container } = render(
        <Stepper activeStep={1}>
          <Step />
          <Step />
        </Stepper>,
      );

      const connector = container.querySelector(`.${stepConnectorClasses.root}`);

      expect(connector).to.have.class(stepConnectorClasses.active);
    });

    it('should pass completed prop to connector when second step is completed', () => {
      const { container } = render(
        <Stepper activeStep={2}>
          <Step />
          <Step />
        </Stepper>,
      );

      const connector = container.querySelector(`.${stepConnectorClasses.root}`);

      expect(connector).to.have.class(stepConnectorClasses.completed);
    });

    it('should pass correct active and completed props to the StepConnector with nonLinear prop', () => {
      const steps = ['Step1', 'Step2', 'Step3'];

      const { container } = render(
        <Stepper orientation="horizontal" nonLinear connector={<StepConnector />}>
          {steps.map((label, index) => (
            <Step key={label} active completed={index === 2}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>,
      );

      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(connectors).to.have.length(2);
      expect(connectors[0]).to.have.class(stepConnectorClasses.active);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.completed);

      expect(connectors[1]).to.have.class(stepConnectorClasses.active);
      expect(connectors[1]).to.have.class(stepConnectorClasses.completed);
    });
  });

  it('renders with a null child', () => {
    const { container } = render(
      <Stepper>
        <Step />
        {null}
      </Stepper>,
    );

    const steps = container.querySelectorAll(`.${stepClasses.root}`);

    expect(steps).to.have.length(1);
  });

  it('should hide the last connector', () => {
    const { container } = render(
      <Stepper orientation="vertical">
        <Step>
          <StepLabel>one</StepLabel>
          <StepContent />
        </Step>
        <Step>
          <StepLabel>two</StepLabel>
          <StepContent />
        </Step>
      </Stepper>,
    );

    const stepContent = container.querySelectorAll(`.${stepContentClasses.root}`);

    expect(stepContent[0]).not.to.have.class(stepContentClasses.last);
    expect(stepContent[1]).to.have.class(stepContentClasses.last);
  });

  it('should apply non-linear class', () => {
    const { container } = render(
      <Stepper nonLinear activeStep={0}>
        <Step />
        <Step />
        <Step />
      </Stepper>,
    );

    const stepper = container.querySelector(`.${classes.root}`);
    expect(stepper).to.have.class(classes.nonLinear);
  });

  it('should render a tablist when at least one step is a StepButton', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step>
          <StepButton>one</StepButton>
        </Step>
      </Stepper>,
    );

    const stepper = container.querySelector(`.${classes.root}`);
    expect(stepper).to.have.attribute('role', 'tablist');
    expect(stepper).to.have.attribute('aria-orientation', 'horizontal');
  });

  it('should render a vertical tablist when at least one step is a StepButton and orientation is vertical', () => {
    const { container } = render(
      <Stepper activeStep={0} orientation="vertical">
        <Step>
          <StepButton>one</StepButton>
        </Step>
      </Stepper>,
    );

    const stepper = container.querySelector(`.${classes.root}`);
    expect(stepper).to.have.attribute('role', 'tablist');
    expect(stepper).to.have.attribute('aria-orientation', 'vertical');
  });

  it('should not render a tablist when no steps are StepButtons', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>one</StepLabel>
        </Step>
      </Stepper>,
    );

    const stepper = container.querySelector(`.${classes.root}`);
    expect(stepper).not.to.have.attribute('role', 'tablist');
    expect(stepper).not.to.have.attribute('aria-orientation');
  });

  describe('keyboard navigation', () => {
    it('should move focus to the next tab when pressing the right arrow key', async () => {
      const { user } = render(
        <Stepper nonLinear>
          <Step>
            <StepButton>one</StepButton>
          </Step>
          <Step disabled>
            <StepButton>two</StepButton>
          </Step>
          <Step>
            <StepButton>three</StepButton>
          </Step>
        </Stepper>,
      );

      const tabElements = screen.getAllByRole('tab');

      await user.tab();
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[1]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowRight}');
      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[2]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowRight}');
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[2]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowLeft}');
      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[2]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowLeft}');
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[2]).to.have.attribute('tabIndex', '-1');
    });

    it('should support Home and End keyboard navigation', async () => {
      const { user } = render(
        <Stepper nonLinear>
          <Step>
            <StepButton>one</StepButton>
          </Step>
          <Step>
            <StepButton>two</StepButton>
          </Step>
          <Step>
            <StepButton>three</StepButton>
          </Step>
        </Stepper>,
      );

      const tabElements = screen.getAllByRole('tab');

      await user.tab();
      expect(tabElements[0]).toHaveFocus();

      await user.keyboard('{End}');
      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[2]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{Home}');
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[2]).to.have.attribute('tabIndex', '-1');
    });

    it('should support vertical keyboard navigation with ArrowUp/ArrowDown', async () => {
      const { user } = render(
        <Stepper nonLinear orientation="vertical">
          <Step>
            <StepButton>one</StepButton>
          </Step>
          <Step disabled>
            <StepButton>two</StepButton>
          </Step>
          <Step>
            <StepButton>three</StepButton>
          </Step>
        </Stepper>,
      );

      const tabElements = screen.getAllByRole('tab');

      await user.tab();
      expect(tabElements[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(tabElements[2]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(tabElements[0]).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(tabElements[2]).toHaveFocus();
    });

    it('should reverse horizontal navigation in RTL mode', async () => {
      const { user } = render(
        <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
          <Stepper nonLinear>
            <Step>
              <StepButton>one</StepButton>
            </Step>
            <Step>
              <StepButton>two</StepButton>
            </Step>
            <Step>
              <StepButton>three</StepButton>
            </Step>
          </Stepper>
        </ThemeProvider>,
      );

      const tabElements = screen.getAllByRole('tab');

      await user.tab();
      expect(tabElements[0]).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(tabElements[1]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(tabElements[0]).toHaveFocus();
    });

    it('should add tabindex="0" to the focused tab', async () => {
      const { user } = render(
        <Stepper nonLinear>
          <Step>
            <StepButton>one</StepButton>
          </Step>
          <Step>
            <StepButton>two</StepButton>
          </Step>
        </Stepper>,
      );

      const tabElements = screen.getAllByRole('tab');

      await user.click(tabElements[1]);
      expect(tabElements[1]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      await user.click(tabElements[0]);
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[1]).to.have.attribute('tabIndex', '-1');
    });

    it('should compose the onFocus and onKeyDown handlers', async () => {
      const onFocusSpy = spy();
      const onKeyDownSpy = spy();

      const { user } = render(
        <Stepper nonLinear>
          <Step>
            <StepButton onFocus={onFocusSpy} onKeyDown={onKeyDownSpy}>
              one
            </StepButton>
          </Step>
          <Step>
            <StepButton>two</StepButton>
          </Step>
        </Stepper>,
      );

      const tabElements = screen.getAllByRole('tab');

      await user.click(tabElements[0]);
      expect(onFocusSpy.callCount).to.equal(1);

      await user.keyboard('{ArrowRight}');
      expect(onKeyDownSpy.callCount).to.equal(1);
    });
  });
});
