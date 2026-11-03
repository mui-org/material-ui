import { describe, it, expect, vi } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { collapseClasses } from '@mui/material/Collapse';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepContent, { stepContentClasses as classes } from '@mui/material/StepContent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<StepContent />', () => {
  const { clock, render } = createRenderer();

  describeConformance(<StepContent />, () => ({
    classes,
    inheritComponent: 'div',
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
    skip: ['componentProp', 'themeVariants'],
    slots: {
      transition: {
        expectedClassName: classes.transition,
        testWithElement: null,
      },
    },
  }));

  it('renders children inside an Collapse component', () => {
    const { container } = render(
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
    screen.getByText('This is my content!');
  });

  describe('prop: transitionDuration', () => {
    clock.withFakeTimers();

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

    it('should use custom transition slot', () => {
      function CustomTransition() {
        return <div data-testid="custom-transition" />;
      }

      const { container } = render(
        <Stepper orientation="vertical">
          <Step>
            <StepContent slots={{ transition: CustomTransition }}>
              <div />
            </StepContent>
          </Step>
        </Stepper>,
      );

      const collapse = container.querySelector(`.${collapseClasses.container}`);
      expect(collapse).to.equal(null);
      screen.getByTestId('custom-transition');
    });

    it('enters on the next task when reduced motion is always', () => {
      const handleEntered = vi.fn();
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      function Test(props) {
        return (
          <ThemeProvider theme={theme}>
            <Stepper orientation="vertical">
              <Step active={props.active}>
                <StepContent
                  transitionDuration={250}
                  slotProps={{ transition: { onEntered: handleEntered } }}
                >
                  <div>Content</div>
                </StepContent>
              </Step>
            </Stepper>
          </ThemeProvider>
        );
      }

      const { setProps } = render(<Test active={false} />);

      setProps({ active: true });

      expect(handleEntered).toHaveBeenCalledTimes(0);
      clock.tick(0);
      expect(handleEntered).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Content')).not.to.equal(null);
    });
  });
});
