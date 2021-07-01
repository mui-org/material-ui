import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Step, { stepClasses as classes } from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel, { stepLabelClasses } from '@material-ui/core/StepLabel';
import StepButton, { stepButtonClasses } from '@material-ui/core/StepButton';

describe('<Step />', () => {
  const render = createClientRender();

  describeConformanceV5(<Step />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiStep',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('merges styles and other props into the root node', () => {
    const { getByTestId } = render(
      <Step
        index={1}
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        data-testid="root"
        orientation="horizontal"
      />,
    );

    const rootNode = getByTestId('root');
    expect(rootNode.style).to.have.property('paddingRight', '200px');
    expect(rootNode.style).to.have.property('color', 'purple');
    expect(rootNode.style).to.have.property('border', '1px solid tomato');
  });

  describe('rendering children', () => {
    it('renders children', () => {
      const { container } = render(
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
      const { container } = render(
        <Step>
          <StepButton />
          {null}
        </Step>,
      );

      const stepButton = container.querySelector(`.${stepButtonClasses.root}`);
      expect(stepButton).not.to.equal(null);
    });
  });

  describe('overriding context props', () => {
    it('overrides "active" context value', () => {
      const { getByText } = render(
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

      const stepLabel = getByText('Step 3');
      expect(stepLabel).to.have.class(stepLabelClasses.active);
    });

    it('overrides "completed" context value', () => {
      const { getByText } = render(
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

      const stepLabel = getByText('Step 3');
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
  });
});
