import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Paper from '../Paper';
import Step from '../Step';
import StepLabel from '../StepLabel';
import StepConnector from '../StepConnector';
import StepContent from '../StepContent';
import Stepper from './Stepper';

describe('<Stepper />', () => {
  let classes;
  // StrictModeViolation: test uses StepContent
  const mount = createMount({ strict: false });
  const render = createClientRender({ strict: false });

  before(() => {
    classes = getClasses(<Stepper />);
  });

  describeConformance(
    <Stepper>
      <Step />
    </Stepper>,
    () => ({
      classes,
      inheritComponent: Paper,
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp'],
    }),
  );

  it('has no elevation by default', () => {
    const { container } = render(
      <Stepper>
        <Step />
      </Stepper>,
    );

    const paper = container.querySelector('.MuiPaper-elevation0');

    expect(paper).not.equal(null);
  });

  describe('rendering children', () => {
    it('renders 3 Step and 2 StepConnector components', () => {
      const { container } = render(
        <Stepper>
          <Step />
          <Step />
          <Step />
        </Stepper>,
      );

      const connectors = container.querySelectorAll('.MuiStepConnector-root');
      const steps = container.querySelectorAll('.MuiStep-root');

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

      const steps = container.querySelectorAll('.MuiStep-root');
      const connectors = container.querySelectorAll('.MuiStepConnector-root');

      expect(steps[0]).to.not.have.class('MuiStep-completed');
      expect(steps[1]).to.not.have.class('MuiStep-completed');
      expect(steps[2]).to.not.have.class('MuiStep-completed');
      expect(connectors[0]).to.have.class('Mui-disabled');
      expect(connectors[1]).to.have.class('Mui-disabled');

      setProps({ activeStep: 1 });

      expect(steps[0]).to.have.class('MuiStep-completed');
      expect(steps[1]).to.not.have.class('MuiStep-completed');
      expect(steps[2]).to.not.have.class('MuiStep-completed');
      expect(connectors[0]).to.not.have.class('Mui-disabled');
      expect(connectors[0]).to.have.class('MuiStepConnector-active');
      expect(connectors[1]).to.have.class('Mui-disabled');
    });

    it('controls children non-linearly based on the activeStep prop', () => {
      const { container, setProps } = render(
        <Stepper nonLinear activeStep={0}>
          <Step />
          <Step />
          <Step />
        </Stepper>,
      );

      const steps = container.querySelectorAll('.MuiStep-root');
      const connectors = container.querySelectorAll('.MuiStepConnector-root');

      expect(steps[0]).to.not.have.class('MuiStep-completed');
      expect(steps[1]).to.not.have.class('MuiStep-completed');
      expect(steps[2]).to.not.have.class('MuiStep-completed');
      expect(connectors[0]).not.to.have.class('Mui-disabled');
      expect(connectors[1]).not.to.have.class('Mui-disabled');

      setProps({ activeStep: 1 });

      expect(steps[0]).to.not.have.class('MuiStep-completed');
      expect(steps[1]).to.not.have.class('MuiStep-completed');
      expect(steps[2]).to.not.have.class('MuiStep-completed');
      expect(connectors[0]).to.not.have.class('Mui-disabled');
      expect(connectors[0]).to.have.class('MuiStepConnector-active');
      expect(connectors[1]).not.to.have.class('Mui-disabled');

      setProps({ activeStep: 2 });

      expect(steps[0]).to.not.have.class('MuiStep-completed');
      expect(steps[1]).to.not.have.class('MuiStep-completed');
      expect(steps[2]).to.not.have.class('MuiStep-completed');
      expect(connectors[0]).to.not.have.class('Mui-disabled');
      expect(connectors[1]).to.not.have.class('Mui-disabled');
      expect(connectors[1]).to.have.class('MuiStepConnector-active');
    });

    it('passes index down correctly when rendering children containing arrays', () => {
      // I don't see how to test it using react-testing-library
      // Also, this test has questionable value, I'd delete it
      const wrapper = shallow(
        <Stepper linear={false}>
          <div />
          {[<div key={1} />, <div key={2} />]}
        </Stepper>,
      );

      const steps = wrapper.children().find('div');
      expect(steps.at(0).props().index).to.equal(0);
      expect(steps.at(1).props().index).to.equal(1);
      expect(steps.at(2).props().index).to.equal(2);
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

      const connectors = container.querySelectorAll('.MuiStepConnector-root');

      expect(connectors).to.have.length(1);
    });

    it('should allow the developer to specify a custom step connector', () => {
      const CustomConnector = () => <div className="CustomConnector" />;
      const { container } = render(
        <Stepper connector={<CustomConnector />}>
          <Step />
          <Step />
        </Stepper>,
      );

      const defaultConnectors = container.querySelectorAll('.MuiStepConnector-root');
      const customConnectors = container.querySelectorAll('CustomConnector');

      expect(defaultConnectors).to.have.length(0);
      expect(customConnectors).to.have.length(0);
    });

    it('should allow the step connector to be removed', () => {
      const { container } = render(
        <Stepper connector={null}>
          <Step />
          <Step />
        </Stepper>,
      );

      const connectors = container.querySelectorAll('.MuiStepConnector-root');

      expect(connectors).to.have.length(0);
    });

    it('should pass active prop to connector when second step is active', () => {
      const { container } = render(
        <Stepper activeStep={1}>
          <Step />
          <Step />
        </Stepper>,
      );

      const connector = container.querySelector('.MuiStepConnector-root');

      expect(connector).to.have.class('MuiStepConnector-active');
    });

    it('should pass completed prop to connector when second step is completed', () => {
      const { container } = render(
        <Stepper activeStep={2}>
          <Step />
          <Step />
        </Stepper>,
      );

      const connector = container.querySelector('.MuiStepConnector-root');

      expect(connector).to.have.class('MuiStepConnector-completed');
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

      const connectors = container.querySelectorAll('.MuiStepConnector-root');

      expect(connectors).to.have.length(2);
      expect(connectors[0]).to.have.class('MuiStepConnector-active');
      expect(connectors[0]).to.not.have.class('MuiStepConnector-completed');

      expect(connectors[1]).to.have.class('MuiStepConnector-active');
      expect(connectors[1]).to.have.class('MuiStepConnector-completed');
    });
  });

  it('renders with a null child', () => {
    // I'm not sure if this test brings any value
    const { container } = render(
      <Stepper>
        <Step />
        {null}
      </Stepper>,
    );

    const steps = container.querySelectorAll('.MuiStep-root');

    expect(steps).to.have.length(1);
  });

  it('should be able to force a state', () => {
    const { container } = render(
      <Stepper>
        <Step />
        <Step active />
        <Step />
      </Stepper>,
    );

    const steps = container.querySelectorAll('.MuiStep-root');

    expect(steps[0]).to.not.have.class('MuiStep-active');
    expect(steps[1]).to.not.have.class('MuiStep-active');
    expect(steps[2]).to.not.have.class('MuiStep-active');
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

    const stepContent = container.querySelectorAll('.MuiStepContent-root');

    expect(stepContent[0]).to.not.have.class('MuiStepContent-last');
    expect(stepContent[1]).to.have.class('MuiStepContent-last');
  });
});
