import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent, supportsTouch } from '@mui/internal-test-utils';
import StepButton, { stepButtonClasses as classes } from '@mui/material/StepButton';
import Step from '@mui/material/Step';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import ButtonBase from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';
import Stepper from '../Stepper';

describe('<StepButton />', () => {
  const { render } = createRenderer();

  describe('internals', () => {
    describeConformance(<StepButton />, () => ({
      classes,
      inheritComponent: ButtonBase,
      muiName: 'MuiStepButton',
      refInstanceof: window.HTMLButtonElement,
      render,
      skip: ['componentProp', 'themeVariants'],
    }));

    it('should receive the correct aria attributes', () => {
      render(
        <Stepper>
          <Step>
            <StepButton>Step One</StepButton>
          </Step>
          <Step>
            <StepButton>Step Two</StepButton>
          </Step>
        </Stepper>,
      );

      const stepButton1 = screen.getByRole('tab', { name: 'Step One' });
      const stepButton2 = screen.getByRole('tab', { name: 'Step Two' });

      expect(stepButton1).to.have.attribute('aria-selected', 'true');
      expect(stepButton1).to.have.attribute('aria-posinset', '1');
      expect(stepButton1).to.have.attribute('aria-setsize', '2');

      expect(stepButton2).not.to.have.attribute('aria-current', 'step');
      expect(stepButton2).to.have.attribute('aria-posinset', '2');
      expect(stepButton2).to.have.attribute('aria-setsize', '2');
    });

    it('passes active, completed, disabled to StepLabel', () => {
      const { container } = render(
        <Step active completed disabled>
          <StepButton>Step One</StepButton>
        </Step>,
      );

      const stepLabelRoot = container.querySelector(`.${stepLabelClasses.root}`);
      const stepLabel = container.querySelector(`.${stepLabelClasses.label}`);

      expect(stepLabelRoot).to.have.class(stepLabelClasses.disabled);
      expect(stepLabel).to.have.class(stepLabelClasses.active);
      expect(stepLabel).to.have.class(stepLabelClasses.completed);
    });

    it('should pass props to a provided StepLabel', () => {
      const { container } = render(
        <Step active completed disabled>
          <StepButton label="Step One">
            <StepLabel>Step One</StepLabel>
          </StepButton>
        </Step>,
      );

      const stepLabelRoot = container.querySelector(`.${stepLabelClasses.root}`);
      const stepLabel = container.querySelector(`.${stepLabelClasses.label}`);

      expect(stepLabelRoot).to.have.class(stepLabelClasses.disabled);
      expect(stepLabel).to.have.class(stepLabelClasses.active);
      expect(stepLabel).to.have.class(stepLabelClasses.completed);
    });
  });

  it('should disable the button', () => {
    render(<StepButton disabled>Step One</StepButton>);

    expect(screen.getByRole('tab')).to.have.property('disabled', true);
  });

  it('should skip disabled steps in the roving tablist path', async () => {
    const { user } = render(
      <Stepper nonLinear orientation="vertical">
        <Step>
          <StepButton>Step One</StepButton>
        </Step>
        <Step disabled>
          <StepButton>Step Two</StepButton>
        </Step>
        <Step>
          <StepButton>Step Three</StepButton>
        </Step>
      </Stepper>,
    );

    const stepOne = screen.getByRole('tab', { name: 'Step One' });
    const stepTwo = screen.getByRole('tab', { name: 'Step Two' });
    const stepThree = screen.getByRole('tab', { name: 'Step Three' });

    expect(stepTwo).to.have.property('disabled', true);

    await user.tab();
    expect(stepOne).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(stepThree).toHaveFocus();
    expect(stepTwo).not.toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(stepOne).toHaveFocus();
    expect(stepTwo).not.toHaveFocus();
  });

  describe('event handlers', () => {
    // only run in supported browsers
    it.skipIf(!supportsTouch())(
      'should forward mouseenter, mouseleave and touchstart',
      function touchTests() {
        const handleMouseEnter = spy();
        const handleMouseLeave = spy();
        const handleTouchStart = spy();

        render(
          <StepButton
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
          >
            Step One
          </StepButton>,
        );

        const button = screen.getByRole('tab', { name: 'Step One' });

        fireEvent.mouseOver(button);

        expect(handleMouseEnter).to.have.property('callCount', 1);
        expect(handleMouseLeave).to.have.property('callCount', 0);
        expect(handleTouchStart).to.have.property('callCount', 0);

        fireEvent.mouseOut(button);

        expect(handleMouseEnter).to.have.property('callCount', 1);
        expect(handleMouseLeave).to.have.property('callCount', 1);
        expect(handleTouchStart).to.have.property('callCount', 0);

        // fake touch
        const firstTouch = new Touch({ identifier: 0, target: button });
        fireEvent.touchStart(button, { touches: [firstTouch] });

        expect(handleMouseEnter).to.have.property('callCount', 1);
        expect(handleMouseLeave).to.have.property('callCount', 1);
        expect(handleTouchStart).to.have.property('callCount', 1);

        fireEvent.mouseOver(button);
        const secondTouch = new Touch({ identifier: 1, target: button });
        fireEvent.touchStart(button, { touches: [firstTouch, secondTouch] });

        expect(handleMouseEnter).to.have.property('callCount', 2);
        expect(handleMouseLeave).to.have.property('callCount', 1);
        expect(handleTouchStart).to.have.property('callCount', 2);
      },
    );
  });

  describe('prop: nativeButton', () => {
    it('forwards nativeButton={false} and preserves role="tab" over pseudo-button role', () => {
      const CustomSpan = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Stepper>
          <Step>
            <StepButton component={CustomSpan} nativeButton={false}>
              Step One
            </StepButton>
          </Step>
        </Stepper>,
      );

      const stepButton = screen.getByRole('tab', { name: 'Step One' });
      expect(stepButton).to.have.tagName('SPAN');
      expect(stepButton).to.have.attribute('role', 'tab');
      expect(stepButton).not.to.have.attribute('type');

      // Proves nativeButton={false} was forwarded — without it, ButtonBase
      // would warn about a non-button host with nativeButton omitted.
      expect(errorSpy.mock.calls.length).to.equal(0);
      errorSpy.mockRestore();
    });
  });

  it('can be used as a child of `Step`', () => {
    render(
      <Step>
        <StepButton>Next</StepButton>
      </Step>,
    );

    expect(screen.getByRole('tab', { name: 'Next' })).not.to.equal(null);
  });
});
