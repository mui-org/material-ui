import { describe, it, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Skeleton, { skeletonClasses as classes } from '@mui/material/Skeleton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<Skeleton />', () => {
  const { render } = createRenderer();

  describeConformance(<Skeleton />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    refInstanceof: window.HTMLSpanElement,
    muiName: 'MuiSkeleton',
    testVariantProps: { variant: 'circular', animation: 'wave' },
  }));

  it('should render', () => {
    const { container } = render(<Skeleton />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  it.skipIf(isJsdom())('disables pulse animation when reduced motion is always', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Skeleton animation="pulse" />
      </ThemeProvider>,
    );

    expect(window.getComputedStyle(container.firstChild).animationName).to.equal('none');
  });

  it.skipIf(isJsdom())('disables wave animation when reduced motion is always', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Skeleton animation="wave" />
      </ThemeProvider>,
    );

    const wave = window.getComputedStyle(container.firstChild, '::after');

    expect(wave.animationName).to.equal('none');
    expect(wave.display).to.equal('none');
  });

  it('should get withChildren class when passed children', () => {
    const { container } = render(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(container.firstChild).to.have.class(classes.withChildren);
  });

  it('should get fitContent class when passed children and no width', () => {
    const { container: containerWithoutWidth } = render(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutWidth.firstChild).to.have.class(classes.fitContent);

    const { container: containerWithWidth } = render(
      <Skeleton width="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithWidth.firstChild).not.to.have.class(classes.fitContent);
  });

  it('should get heightAuto class when passed children and no height', () => {
    const { container: containerWithoutHeight } = render(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutHeight.firstChild).to.have.class(classes.heightAuto);

    const { container: containerWithHeight } = render(
      <Skeleton height="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithHeight.firstChild).not.to.have.class(classes.heightAuto);
  });
});
