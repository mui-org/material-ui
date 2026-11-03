import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import { Box, ThemeProvider, boxClasses as classes } from '@mui/system';
import createTheme from '@mui/system/createTheme';
import describeConformance from '../../test/describeConformance';

describe('<Box />', () => {
  const { render } = createRenderer();

  describeConformance(<Box />, () => ({
    classes,
    render,
    inheritComponent: 'div',
    skip: [
      'componentProp',
      'rootClass',
      'themeVariants',
      'themeStyleOverrides',
      'themeDefaultProps',
    ],
    refInstanceof: window.HTMLDivElement,
  }));

  const testChildren = (
    <div data-testid="child" className="unique">
      Hello World
    </div>
  );

  it('does not forward style props as DOM attributes', () => {
    const elementRef = React.createRef();
    render(
      <Box
        sx={{
          color: 'primary.main',
          fontFamily: 'Comic Sans',
          fontSize: { xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' },
        }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element).not.to.have.attribute('color');
    expect(element).not.to.have.attribute('font-family');
    expect(element).not.to.have.attribute('font-size');
  });

  it('renders children and box content', () => {
    render(
      <Box data-testid="box" component="span" sx={{ m: 1 }}>
        {testChildren}
      </Box>,
    );
    const box = screen.getByTestId('box');
    expect(box).contain(screen.getByTestId('child'));
    expect(box.tagName).to.equal('SPAN');
  });

  it.skipIf(isJsdom())('respect properties order when generating the CSS', function test() {
    const { container: testCaseBorderColorWins } = render(
      <Box sx={{ border: 1, borderColor: 'rgb(0, 0, 255)' }} />,
    );

    expect(testCaseBorderColorWins.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 255)',
      borderRightColor: 'rgb(0, 0, 255)',
      borderBottomColor: 'rgb(0, 0, 255)',
      borderLeftColor: 'rgb(0, 0, 255)',
    });

    const { container: testCaseBorderWins } = render(
      <Box sx={{ borderColor: 'rgb(0, 0, 255)', border: 1 }} />,
    );

    expect(testCaseBorderWins.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 0)',
      borderRightColor: 'rgb(0, 0, 0)',
      borderBottomColor: 'rgb(0, 0, 0)',
      borderLeftColor: 'rgb(0, 0, 0)',
    });
  });

  it.skipIf(isJsdom())(
    'respect border-*-color properties order when generating the CSS',
    function test() {
      const { container: testCaseBorderPositionColorWins } = render(
        <Box
          sx={{
            borderTop: 1,
            borderTopColor: 'rgb(0, 0, 25)',
            borderRight: 2,
            borderRightColor: 'rgb(0, 0, 50)',
            borderBottom: 3,
            borderBottomColor: 'rgb(0, 0, 75)',
            borderLeft: 4,
            borderLeftColor: 'rgb(0, 0, 100)',
          }}
        />,
      );

      expect(testCaseBorderPositionColorWins.firstChild).toHaveComputedStyle({
        borderTopWidth: '1px',
        borderRightWidth: '2px',
        borderBottomWidth: '3px',
        borderLeftWidth: '4px',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: 'rgb(0, 0, 25)',
        borderRightColor: 'rgb(0, 0, 50)',
        borderBottomColor: 'rgb(0, 0, 75)',
        borderLeftColor: 'rgb(0, 0, 100)',
      });

      const { container: testCaseBorderPositionWins } = render(
        <Box
          sx={{
            borderTopColor: 'rgb(0, 0, 25)',
            borderTop: 1,
            borderRightColor: 'rgb(0, 0, 50)',
            borderRight: 2,
            borderBottomColor: 'rgb(0, 0, 75)',
            borderBottom: 3,
            borderLeftColor: 'rgb(0, 0, 100)',
            borderLeft: 4,
          }}
        />,
      );

      expect(testCaseBorderPositionWins.firstChild).toHaveComputedStyle({
        borderTopWidth: '1px',
        borderRightWidth: '2px',
        borderBottomWidth: '3px',
        borderLeftWidth: '4px',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: 'rgb(0, 0, 0)',
        borderRightColor: 'rgb(0, 0, 0)',
        borderBottomColor: 'rgb(0, 0, 0)',
        borderLeftColor: 'rgb(0, 0, 0)',
      });
    },
  );

  it.skipIf(isJsdom())(
    'respect properties order when generating the CSS from the sx prop',
    function test() {
      const { container: testCaseBorderColorWins } = render(
        <Box sx={{ border: 1, borderColor: 'rgb(0, 0, 255)' }} />,
      );

      expect(testCaseBorderColorWins.firstChild).toHaveComputedStyle({
        borderTopWidth: '1px',
        borderRightWidth: '1px',
        borderBottomWidth: '1px',
        borderLeftWidth: '1px',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: 'rgb(0, 0, 255)',
        borderRightColor: 'rgb(0, 0, 255)',
        borderBottomColor: 'rgb(0, 0, 255)',
        borderLeftColor: 'rgb(0, 0, 255)',
      });

      const { container: testCaseBorderWins } = render(
        <Box sx={{ borderColor: 'rgb(0, 0, 255)', border: 1 }} />,
      );

      expect(testCaseBorderWins.firstChild).toHaveComputedStyle({
        borderTopWidth: '1px',
        borderRightWidth: '1px',
        borderBottomWidth: '1px',
        borderLeftWidth: '1px',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: 'rgb(0, 0, 0)',
        borderRightColor: 'rgb(0, 0, 0)',
        borderBottomColor: 'rgb(0, 0, 0)',
        borderLeftColor: 'rgb(0, 0, 0)',
      });

      const { container: testCaseBorderPositionColorWins } = render(
        <Box
          sx={{
            borderTop: 1,
            borderTopColor: 'rgb(0, 0, 25)',
            borderRight: 2,
            borderRightColor: 'rgb(0, 0, 50)',
            borderBottom: 3,
            borderBottomColor: 'rgb(0, 0, 75)',
            borderLeft: 4,
            borderLeftColor: 'rgb(0, 0, 100)',
          }}
        />,
      );

      expect(testCaseBorderPositionColorWins.firstChild).toHaveComputedStyle({
        borderTopWidth: '1px',
        borderRightWidth: '2px',
        borderBottomWidth: '3px',
        borderLeftWidth: '4px',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: 'rgb(0, 0, 25)',
        borderRightColor: 'rgb(0, 0, 50)',
        borderBottomColor: 'rgb(0, 0, 75)',
        borderLeftColor: 'rgb(0, 0, 100)',
      });

      const { container: testCaseBorderPositionWins } = render(
        <Box
          sx={{
            borderTopColor: 'rgb(0, 0, 25)',
            borderTop: 1,
            borderRightColor: 'rgb(0, 0, 50)',
            borderRight: 2,
            borderBottomColor: 'rgb(0, 0, 75)',
            borderBottom: 3,
            borderLeftColor: 'rgb(0, 0, 100)',
            borderLeft: 4,
          }}
        />,
      );

      expect(testCaseBorderPositionWins.firstChild).toHaveComputedStyle({
        borderTopWidth: '1px',
        borderRightWidth: '2px',
        borderBottomWidth: '3px',
        borderLeftWidth: '4px',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: 'rgb(0, 0, 0)',
        borderRightColor: 'rgb(0, 0, 0)',
        borderBottomColor: 'rgb(0, 0, 0)',
        borderLeftColor: 'rgb(0, 0, 0)',
      });
    },
  );

  it('adds the utility mui class', () => {
    render(<Box data-testid="regular-box" />);

    expect(screen.getByTestId('regular-box')).to.have.class('MuiBox-root');
  });

  describe('prop: maxWidth', () => {
    it.skipIf(isJsdom())('should resolve breakpoints with custom units', function test() {
      const theme = createTheme({
        breakpoints: {
          unit: 'rem',
          values: {
            xs: 10,
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Box sx={{ maxWidth: 'xs' }} />,
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        // 10rem x 16px = 160px
        maxWidth: '160px',
      });
    });
  });
});
