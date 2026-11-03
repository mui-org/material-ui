import { describe, it, expect } from 'vitest';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import Backdrop, { backdropClasses as classes } from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<Backdrop />', () => {
  const { clock, render } = createRenderer();

  describeConformance(<Backdrop open />, () => ({
    classes,
    inheritComponent: Fade,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiBackdrop',
    testVariantProps: { invisible: true },
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      transition: {
        testWithElement: null,
      },
    },
  }));

  it('should render a backdrop div with content of nested children', () => {
    const { container } = render(
      <Backdrop open>
        <h1>Hello World</h1>
      </Backdrop>,
    );
    expect(container.querySelector('h1')).to.have.text('Hello World');
  });

  describe('prop: transitionDuration', () => {
    clock.withFakeTimers();

    it('delays appearance of its children', () => {
      const handleEntered = spy();
      render(
        <Backdrop open transitionDuration={1954} onEntered={handleEntered}>
          <div />
        </Backdrop>,
      );

      expect(handleEntered.callCount).to.equal(0);

      clock.tick(1954);

      expect(handleEntered.callCount).to.equal(1);
    });

    it('enters on the next task when reduced motion is always', () => {
      const handleEntered = spy();
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <Backdrop open transitionDuration={1954} onEntered={handleEntered}>
            <div />
          </Backdrop>
        </ThemeProvider>,
      );

      expect(handleEntered.callCount).to.equal(0);
      clock.tick(0);
      expect(handleEntered.callCount).to.equal(1);
    });
  });
});
