import { describe, it, expect } from 'vitest';
import { createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/system';
import createTheme from '@mui/system/createTheme';
import Grid, { gridClasses as classes } from '@mui/system/Grid';
import describeConformance from '../../test/describeConformance';

describe('System <Grid />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Grid {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    refInstanceof: window.HTMLElement,
    muiName: 'MuiGrid',
    testVariantProps: { container: true, spacing: 5 },
    skip: ['classesRoot'],
  }));

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const { container } = render(<Grid container />);
      expect(container.firstChild).to.have.class(classes.container);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const { container } = render(<Grid size="grow" />);
      expect(container.firstChild).to.have.class(classes['grid-xs-grow']);
    });

    it('should apply the flex size class', () => {
      const { container } = render(<Grid size={3} />);
      expect(container.firstChild).to.have.class(classes['grid-xs-3']);
    });

    it('should apply the flex auto class', () => {
      const { container } = render(<Grid size="auto" />);
      expect(container.firstChild).to.have.class(classes['grid-xs-auto']);
    });

    // Need full CSS resolution
    it.skipIf(isJsdom())(
      'should apply the styles necessary for variable width nested item when set to auto',
      function test() {
        render(
          <Grid container>
            <Grid container data-testid="auto" size="auto">
              <div style={{ width: '300px' }} />
            </Grid>
            <Grid size={11} />
          </Grid>,
        );
        expect(screen.getByTestId('auto')).toHaveComputedStyle({
          flexBasis: 'auto',
          flexGrow: '0',
          flexShrink: '0',
          maxWidth: 'none',
          width: '300px',
        });
      },
    );
  });

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const { container } = render(<Grid container spacing={1} />);
      expect(container.firstChild).to.have.class(classes['spacing-xs-1']);
    });

    it('should not support undefined values', () => {
      const { container } = render(
        <Grid container>
          <Grid data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).not.to.have.class('MuiGrid-spacing-xs-undefined');
    });

    it('should not support zero values', () => {
      const { container } = render(
        <Grid container spacing={0}>
          <Grid data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).not.to.have.class('MuiGrid-spacing-xs-0');
    });

    it('should support object values', () => {
      const { container } = render(
        <Grid container spacing={{ sm: 1.5, md: 2 }}>
          <Grid data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).to.have.class('MuiGrid-spacing-sm-1.5');
      expect(container.firstChild).to.have.class('MuiGrid-spacing-md-2');
    });

    it('should ignore object values of zero', () => {
      const { container } = render(
        <Grid container spacing={{ sm: 0, md: 2 }}>
          <Grid data-testid="child" />
        </Grid>,
      );
      expect(container.firstChild).not.to.have.class('MuiGrid-spacing-sm-0');
      expect(container.firstChild).to.have.class('MuiGrid-spacing-md-2');
    });
  });

  describe('spacing', () => {
    it.skipIf(isJsdom())('should generate the right values', function test() {
      const parentWidth = 500;
      const remValue = 16;
      const remTheme = createTheme({
        spacing: (factor) => `${0.25 * factor}rem`,
      });

      const view = render(
        <div style={{ width: parentWidth }}>
          <ThemeProvider theme={remTheme}>
            <Grid data-testid="grid" container spacing={2}>
              <Grid data-testid="first-custom-theme" />
              <Grid />
            </Grid>
          </ThemeProvider>
        </div>,
      );

      expect(screen.getByTestId('grid')).toHaveComputedStyle({
        rowGap: `${0.5 * remValue}px`, // 0.5rem
        columnGap: `${0.5 * remValue}px`, // 0.5rem
      });

      view.rerender(
        <div style={{ width: parentWidth }}>
          <Grid data-testid="grid" container spacing={2}>
            <Grid data-testid="first-default-theme" />
            <Grid />
          </Grid>
        </div>,
      );

      expect(screen.getByTestId('grid')).toHaveComputedStyle({
        rowGap: '16px',
        columnGap: '16px',
      });
    });
  });

  describe('prop: wrap', () => {
    it('should wrap by default', () => {
      render(<Grid container data-testid="wrap" />);
      expect(screen.getByTestId('wrap')).toHaveComputedStyle({
        flexWrap: 'wrap',
      });
    });

    it('should apply nowrap class and style', () => {
      const view = render(<Grid container wrap="nowrap" data-testid="wrap" />);
      expect(view.container.firstChild).to.have.class('MuiGrid-wrap-xs-nowrap');
      expect(screen.getByTestId('wrap')).toHaveComputedStyle({
        flexWrap: 'nowrap',
      });
    });

    it('should apply wrap-reverse class and style', () => {
      const view = render(<Grid container wrap="wrap-reverse" data-testid="wrap" />);
      expect(view.container.firstChild).to.have.class('MuiGrid-wrap-xs-wrap-reverse');
      expect(screen.getByTestId('wrap')).toHaveComputedStyle({
        flexWrap: 'wrap-reverse',
      });
    });
  });

  describe('Custom breakpoints', () => {
    it('should apply the custom breakpoint class', () => {
      const { container } = render(
        <ThemeProvider
          theme={createTheme({
            breakpoints: {
              values: {
                mobile: 0,
                tablet: 640,
                laptop: 1024,
              },
            },
          })}
        >
          {/* `lg` is to mimic mistake, it is not a breakpoint anymore */}
          <Grid
            size={{
              mobile: 2,
              tablet: 3,
              laptop: 'auto',
            }}
          />
        </ThemeProvider>,
      );

      expect(container.firstChild).to.have.class('MuiGrid-grid-mobile-2');
      expect(container.firstChild).to.have.class('MuiGrid-grid-tablet-3');
      expect(container.firstChild).to.have.class('MuiGrid-grid-laptop-auto');

      // The grid should not have class for `lg` prop
      expect(container.firstChild).not.to.have.class('MuiGrid-grid-lg-5');
    });

    it('should apply the custom breakpoint spacing class', () => {
      const { container } = render(
        <ThemeProvider
          theme={createTheme({
            breakpoints: {
              values: {
                mobile: 0,
                tablet: 640,
                laptop: 1024,
              },
            },
          })}
        >
          <Grid container spacing={2} />
          <Grid container spacing={{ tablet: 2, laptop: 4 }} />
        </ThemeProvider>,
      );

      expect(container.firstChild).to.have.class('MuiGrid-spacing-mobile-2');

      expect(container.lastChild).to.have.class('MuiGrid-spacing-tablet-2');
      expect(container.lastChild).to.have.class('MuiGrid-spacing-laptop-4');
    });
  });
});
