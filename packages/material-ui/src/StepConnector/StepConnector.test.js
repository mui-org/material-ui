import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import Stepper from '../Stepper';
import Step from '../Step';
import StepConnector from './StepConnector';
import classes from './stepConnectorClasses';

describe('<StepConnector />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<StepConnector />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    muiName: 'MuiStepConnector',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  describe('rendering', () => {
    it('renders a div containing a span', () => {
      const { container } = render(<StepConnector />);

      const stepConnector = container.querySelector(`.${classes.root}`);
      const span = stepConnector.querySelector('span');
      expect(stepConnector).not.to.equal(null);
      expect(span).not.to.equal(null);
    });

    it('has the class when horizontal', () => {
      const { container } = render(
        <Stepper orientation="horizontal">
          <Step>
            <StepConnector />
          </Step>
        </Stepper>,
      );

      const stepConnectorLine = container.querySelector(`.${classes.line}`);
      expect(stepConnectorLine).to.have.class(classes.lineHorizontal);
    });

    it('has the class when vertical', () => {
      const { container } = render(
        <Stepper orientation="vertical">
          <Step>
            <StepConnector />
          </Step>
        </Stepper>,
      );

      const stepConnectorLine = container.querySelector(`.${classes.line}`);
      expect(stepConnectorLine).to.have.class(classes.lineVertical);
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
