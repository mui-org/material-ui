import * as React from 'react';
import { expect } from 'chai';
import { describeConformanceV5, createClientRender, screen } from 'test/utils';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import defaultTheme from '@material-ui/core/styles/defaultTheme';
import Grid, { gridClasses as classes } from '@material-ui/core/Grid';
import { generateRowGap, generateColumnGap } from './Grid';

describe('<Grid />', () => {
  const render = createClientRender();

  describeConformanceV5(<Grid />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiGrid',
    testVariantProps: { container: true, spacing: 5 },
    testStateOverrides: { prop: 'container', value: true, styleKey: 'container' },
    skip: ['componentsProp'],
  }));

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const { container } = render(<Grid container />);
      expect(container.firstChild).to.have.class(classes.container);
    });
  });

  describe('prop: item', () => {
    it('should apply the item class', () => {
      const { container } = render(<Grid item />);
      expect(container.firstChild).to.have.class(classes.item);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const { container } = render(<Grid item xs />);
      expect(container.firstChild).to.have.class(classes['grid-xs-true']);
    });

    it('should apply the flex size class', () => {
      const { container } = render(<Grid item xs={3} />);
      expect(container.firstChild).to.have.class(classes['grid-xs-3']);
    });

    it('should apply the flex auto class', () => {
      const { container } = render(<Grid item xs="auto" />);
      expect(container.firstChild).to.have.class(classes['grid-xs-auto']);
    });
  });

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const { container } = render(<Grid container spacing={1} />);
      expect(container.firstChild).to.have.class(classes['spacing-xs-1']);
    });

    it('should support decimal values', () => {
      const { container } = render(
        <Grid container spacing={1.5}>
          <Grid item data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).to.have.class('MuiGrid-spacing-xs-1.5');
      expect(screen.getByTestId('child')).toHaveComputedStyle({
        paddingTop: '12px',
        paddingLeft: '12px',
      });
    });
  });

  it('should generate responsive styles', () => {
    const theme = createTheme();
    expect(
      generateRowGap({
        styleProps: {
          container: true,
          rowSpacing: { xs: 1, sm: 2 },
        },
        theme,
      }),
    ).to.deep.equal({
      '@media (min-width:0px)': {
        '& > .MuiGrid-item': {
          paddingTop: '8px',
        },
        marginTop: '-8px',
      },
      [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
        '& > .MuiGrid-item': {
          paddingTop: '16px',
        },
        marginTop: '-16px',
      },
    });

    expect(
      generateColumnGap({
        styleProps: {
          container: true,
          columnSpacing: { xs: 1, sm: 2 },
        },
        theme,
      }),
    ).to.deep.equal({
      '@media (min-width:0px)': {
        '& > .MuiGrid-item': {
          paddingLeft: '8px',
        },
        marginLeft: '-8px',
        width: 'calc(100% + 8px)',
      },
      [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
        '& > .MuiGrid-item': {
          paddingLeft: '16px',
        },
        marginLeft: '-16px',
        width: 'calc(100% + 16px)',
      },
    });
  });

  describe('spacing', () => {
    it('should generate the right values', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) this.skip();

      const parentWidth = 500;
      const remValue = 16;
      const remTheme = createTheme({
        spacing: (factor) => `${0.25 * factor}rem`,
      });

      const { rerender } = render(
        <div style={{ width: parentWidth }}>
          <ThemeProvider theme={remTheme}>
            <Grid data-testid="grid" container spacing={2}>
              <Grid item data-testid="first-custom-theme" />
              <Grid item />
            </Grid>
          </ThemeProvider>
        </div>,
      );

      expect(screen.getByTestId('grid')).toHaveComputedStyle({
        marginTop: `${-1 * remValue * 0.5}px`, // '-0.5rem'
        marginLeft: `${-1 * remValue * 0.5}px`, // '-0.5rem'
        width: `${parentWidth + remValue * 0.5}px`, // 'calc(100% + 0.5rem)'
      });

      expect(screen.getByTestId('first-custom-theme')).toHaveComputedStyle({
        paddingTop: `${0.5 * remValue}px`, // 0.5rem
        paddingLeft: `${0.5 * remValue}px`, // 0.5rem
      });

      rerender(
        <div style={{ width: parentWidth }}>
          <Grid data-testid="grid" container spacing={2}>
            <Grid item data-testid="first-default-theme" />
            <Grid item />
          </Grid>
        </div>,
      );

      expect(screen.getByTestId('grid')).toHaveComputedStyle({
        marginTop: '-16px',
        marginLeft: '-16px',
        width: `${parentWidth + 16}px`, // 'calc(100% + 16px)'
      });

      expect(screen.getByTestId('first-default-theme')).toHaveComputedStyle({
        paddingTop: '16px',
        paddingLeft: '16px',
      });
    });
  });

  it('combines system properties with the sx prop', () => {
    const { container } = render(<Grid mt={2} mr={1} sx={{ marginRight: 5, mb: 2 }} />);

    expect(container.firstChild).toHaveComputedStyle({
      marginTop: '16px',
      marginRight: '40px',
      marginBottom: '16px',
    });
  });
});
