import { describe, it, expect } from 'vitest';
import { createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import AppBar, { appBarClasses as classes } from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import { ThemeProvider, CssVarsProvider, hexToRgb } from '@mui/material/styles';
import defaultTheme from '../styles/defaultTheme';
import describeConformance from '../../test/describeConformance';

describe('<AppBar />', () => {
  const { render } = createRenderer();

  describeConformance(<AppBar>Conformance?</AppBar>, () => ({
    classes,
    inheritComponent: Paper,
    render,
    muiName: 'MuiAppBar',
    refInstanceof: window.HTMLElement,
    testVariantProps: { position: 'relative' },
    testStateOverrides: { prop: 'color', value: 'secondary', styleKey: 'colorSecondary' },
  }));

  it('should render with the root class and primary', () => {
    const { container } = render(<AppBar>Hello World</AppBar>);
    const appBar = container.firstChild;
    expect(appBar).to.have.class(classes.root);
    expect(appBar).to.have.class(classes.colorPrimary);
    expect(appBar).not.to.have.class(classes.colorSecondary);
  });

  it('should render a primary app bar', () => {
    const { container } = render(<AppBar color="primary">Hello World</AppBar>);
    const appBar = container.firstChild;
    expect(appBar).to.have.class(classes.root);
    expect(appBar).to.have.class(classes.colorPrimary);
    expect(appBar).not.to.have.class(classes.colorSecondary);
  });

  it('should render an secondary app bar', () => {
    const { container } = render(<AppBar color="secondary">Hello World</AppBar>);
    const appBar = container.firstChild;
    expect(appBar).to.have.class(classes.root);
    expect(appBar).not.to.have.class(classes.colorPrimary);
    expect(appBar).to.have.class(classes.colorSecondary);
  });

  it('should change elevation', () => {
    render(
      <AppBar data-testid="root" elevation={5} classes={{ elevation5: 'app-bar-elevation-5' }}>
        Hello World
      </AppBar>,
    );

    const appBar = screen.getByTestId('root');
    expect(appBar).not.to.have.class(classes.elevation5);
    expect(appBar).not.to.have.class('app-bar-elevation-5');
  });

  describe('Dialog', () => {
    it('should add a .mui-fixed class', () => {
      const { container } = render(<AppBar position="fixed">Hello World</AppBar>);
      const appBar = container.firstChild;
      expect(appBar).to.have.class('mui-fixed');
    });
  });

  it.skipIf(isJsdom())('should inherit Paper background color with ThemeProvider', function test() {
    render(
      <ThemeProvider theme={defaultTheme}>
        <AppBar data-testid="root" color="inherit">
          Hello World
        </AppBar>
      </ThemeProvider>,
    );

    const appBar = screen.getByTestId('root');
    expect(appBar).toHaveComputedStyle({
      backgroundColor: hexToRgb(defaultTheme.palette.background.paper),
    });
  });

  it.skipIf(isJsdom())(
    'should inherit Paper background color with CssVarsProvider',
    function test() {
      render(
        <CssVarsProvider>
          <AppBar data-testid="root" color="inherit">
            Hello World
          </AppBar>
        </CssVarsProvider>,
      );

      const appBar = screen.getByTestId('root');
      expect(appBar).toHaveComputedStyle({
        backgroundColor: hexToRgb(defaultTheme.palette.background.paper),
      });
    },
  );
});
