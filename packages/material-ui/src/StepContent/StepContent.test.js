import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import { collapseClasses } from '@material-ui/core/Collapse';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent, { stepContentClasses as classes } from '@material-ui/core/StepContent';

describe('<StepContent />', () => {
  const render = createClientRender();

  describeConformanceV5(<StepContent />, () => ({
    classes,
    inheritComponent: 'div',
    wrapMount: (mount) => (node) => {
      const wrapper = mount(
        <Stepper orientation="vertical">
          <Step>{node}</Step>
        </Stepper>,
      );
      return wrapper.find(Step).childAt(0).childAt(0).childAt(0);
    },
    muiName: 'MuiStepContent',
    refInstanceof: window.HTMLDivElement,
    render: (node) => {
      const { container, ...other } = render(
        <Stepper orientation="vertical">
          <Step>{node}</Step>
        </Stepper>,
      );
      return { container: container.firstChild.firstChild, ...other };
    },
    skip: ['componentProp', 'componentsProp', 'themeVariants', 'reactTestRenderer'],
  }));

  it('renders children inside an Collapse component', () => {
    const { container, getByText } = render(
      <Stepper orientation="vertical">
        <Step>
          <StepContent>
            <div className="test-content">This is my content!</div>
          </StepContent>
        </Step>
      </Stepper>,
    );

    const collapse = container.querySelector(`.${collapseClasses.root}`);
    const innerDiv = container.querySelector(`.test-content`);

    expect(collapse).not.to.equal(null);
    expect(innerDiv).not.to.equal(null);
    getByText('This is my content!');
  });

  describe('prop: transitionDuration', () => {
    it('should use default Collapse component', () => {
      const { container } = render(
        <Stepper orientation="vertical">
          <Step>
            <StepContent>
              <div />
            </StepContent>
          </Step>
        </Stepper>,
      );

      const collapse = container.querySelector(`.${collapseClasses.root}`);
      expect(collapse).not.to.equal(null);
    });

    it('should use custom TransitionComponent', () => {
      const TransitionComponent = () => <div data-testid="custom-transition" />;

      const { container, getByTestId } = render(
        <Stepper orientation="vertical">
          <Step>
            <StepContent TransitionComponent={TransitionComponent}>
              <div />
            </StepContent>
          </Step>
        </Stepper>,
      );

      const collapse = container.querySelector(`.${collapseClasses.container}`);
      expect(collapse).to.equal(null);
      getByTestId('custom-transition');
    });
  });
});
