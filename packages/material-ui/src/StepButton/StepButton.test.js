import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import { fireEvent } from '@testing-library/dom';
import StepButton, { stepButtonClasses as classes } from '@material-ui/core/StepButton';
import Step from '@material-ui/core/Step';
import StepLabel, { stepLabelClasses } from '@material-ui/core/StepLabel';
import ButtonBase from '@material-ui/core/ButtonBase';

describe('<StepButton />', () => {
  const render = createClientRender();

  describe('internals', () => {
    describeConformanceV5(<StepButton />, () => ({
      classes,
      inheritComponent: ButtonBase,
      muiName: 'MuiStepButton',
      refInstanceof: window.HTMLButtonElement,
      render,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }));

    it('passes active, completed, disabled to StepLabel', () => {
      const { container, getByText } = render(
        <Step active completed disabled>
          <StepButton>Step One</StepButton>
        </Step>,
      );

      const stepLabelRoot = container.querySelector(`.${stepLabelClasses.root}`);
      const stepLabel = container.querySelector(`.${stepLabelClasses.label}`);

      expect(stepLabelRoot).to.have.class(stepLabelClasses.disabled);
      expect(stepLabel).to.have.class(stepLabelClasses.active);
      expect(stepLabel).to.have.class(stepLabelClasses.completed);
      getByText('Step One');
    });

    it('should pass props to a provided StepLabel', () => {
      const { container, getByText } = render(
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
      getByText('Step One');
    });
  });

  it('should disable the button', () => {
    const { getByRole } = render(<StepButton disabled>Step One</StepButton>);

    expect(getByRole('button')).to.have.property('disabled', true);
  });

  describe('event handlers', () => {
    it('should forward mouseenter, mouseleave and touchstart', function touchTests() {
      // only run in supported browsers
      if (typeof Touch === 'undefined') {
        this.skip();
      }

      const handleMouseEnter = spy();
      const handleMouseLeave = spy();
      const handleTouchStart = spy();
      const { getByRole } = render(
        <StepButton
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
        >
          Step One
        </StepButton>,
      );
      const button = getByRole('button');

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
    });
  });

  it('can be used as a child of `Step`', () => {
    // a simple smoke test to check that these two
    // integrate without any errors/warnings
    // TODO: move into integration test for Stepper component
    const { getByRole } = render(
      <Step>
        <StepButton>Next</StepButton>
      </Step>,
    );

    expect(getByRole('button')).not.to.equal(null);
  });
});
