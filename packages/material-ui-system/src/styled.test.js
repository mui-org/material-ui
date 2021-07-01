import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, screen } from 'test/utils';
import { styled, createTheme, ThemeProvider } from '@material-ui/system';

describe('styled', () => {
  const render = createClientRender();

  it('should work', () => {
    const Div = styled('div')`
      width: 200px;
    `;

    const { container } = render(<Div>Test</Div>);

    expect(container.firstChild).toHaveComputedStyle({
      width: '200px',
    });
  });

  it('should work when styles are object', () => {
    const Div = styled('div')({
      width: '200px',
    });

    const { container } = render(<Div>Test</Div>);

    expect(container.firstChild).toHaveComputedStyle({
      width: '200px',
    });
  });

  it('should use defaultTheme if no theme is provided', () => {
    const Div = styled('div')`
      width: ${(props) => props.theme.spacing(1)};
    `;

    const { container } = render(<Div>Test</Div>);

    expect(container.firstChild).toHaveComputedStyle({
      width: '8px',
    });
  });

  it('should use defaultTheme if no theme is provided when styles are object', () => {
    const Div = styled('div')((props) => ({
      width: props.theme.spacing(1),
    }));

    const { container } = render(<Div>Test</Div>);

    expect(container.firstChild).toHaveComputedStyle({
      width: '8px',
    });
  });

  it('should use theme from context if available', () => {
    const Div = styled('div')`
      width: ${(props) => props.theme.spacing(1)};
    `;

    const theme = createTheme({
      spacing: 10,
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Div>Test</Div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      width: '10px',
    });
  });

  it('should use theme from context if available when styles are object', () => {
    const Div = styled('div')((props) => ({
      width: props.theme.spacing(1),
    }));

    const theme = createTheme({
      spacing: 10,
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Div>Test</Div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      width: '10px',
    });
  });

  describe('dynamic styles', () => {
    it('can adapt styles to props', () => {
      const Div = styled('div')`
        font-size: ${(props) => props.scale * 8}px;
        padding-left: ${(props) => props.scale * 2}px;
      `;
      render(<Div scale={4} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        fontSize: '32px',
        paddingLeft: '8px',
      });
    });

    it('can adapt styles to props when styles are object', () => {
      const DivObj = styled('div')((props) => ({
        fontSize: `${props.scale * 8}px`,
        paddingLeft: `${props.scale * 2}px`,
      }));
      render(<DivObj scale={4} data-testid="target" />);

      expect(screen.getByTestId('target')).toHaveComputedStyle({
        fontSize: '32px',
        paddingLeft: '8px',
      });
    });
  });

  describe('muiOptions', () => {
    /**
     * @type {ReturnType<typeof createTheme>}
     */
    let theme;
    /**
     * @type {ReturnType<typeof styled>}
     */
    let Test;
    /**
     * @type {ReturnType<typeof styled>}
     */
    let TestObj;

    before(() => {
      theme = createTheme({
        palette: {
          primary: {
            main: 'rgb(0, 0, 255)',
          },
        },
        components: {
          MuiTest: {
            variants: [
              {
                props: { variant: 'rect', size: 'large' },
                style: {
                  width: '400px',
                  height: '400px',
                },
              },
            ],
            styleOverrides: {
              root: {
                width: '250px',
              },
              rect: {
                height: '250px',
              },
            },
          },
        },
      });

      const testOverridesResolver = (props, styles) => ({
        ...styles.root,
        ...(props.variant && styles[props.variant]),
      });

      Test = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        name: 'MuiTest',
        slot: 'Root',
        overridesResolver: testOverridesResolver,
      })`
        width: 200px;
        height: 300px;
      `;

      TestObj = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        name: 'MuiTest',
        overridesResolver: testOverridesResolver,
      })({
        width: '200px',
        height: '300px',
      });
    });

    it('should support override as long as a resolver is provided', () => {
      const CustomTest = styled('div', {
        name: 'MuiTest',
        slot: 'Rect',
        overridesResolver: (props, styles) => styles.rect,
      })({
        width: '200px',
        height: '300px',
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <CustomTest>Test</CustomTest>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '200px',
        height: '250px',
      });
    });

    it('should work with specified muiOptions', () => {
      const { container } = render(<Test>Test</Test>);

      expect(container.firstChild).toHaveComputedStyle({
        width: '200px',
        height: '300px',
      });
    });

    it('should work with specified muiOptions when styles are object', () => {
      const { container } = render(<TestObj>Test</TestObj>);

      expect(container.firstChild).toHaveComputedStyle({
        width: '200px',
        height: '300px',
      });
    });

    it('overrides should be respected', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test>Test</Test>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '250px',
        height: '300px',
      });
    });

    it('overrides should be respected when styles are object', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <TestObj>Test</TestObj>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '250px',
        height: '300px',
      });
    });

    it('overrides should be respected when prop is specified', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test variant="rect">Test</Test>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '250px',
        height: '250px',
      });
    });

    it('overrides should be respected when prop is specified when styles are object', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <TestObj variant="rect">Test</TestObj>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '250px',
        height: '250px',
      });
    });

    it('variants should be skipped for non root slots', () => {
      const TestSlot = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        name: 'MuiTest',
        slot: 'Slot',
        overridesResolver: (props, styles) => styles.slot,
      })`
        width: 200px;
        height: 300px;
      `;

      const { container } = render(
        <ThemeProvider theme={theme}>
          <TestSlot variant="rect" size="large">
            Test
          </TestSlot>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '200px',
        height: '300px',
      });
    });

    it('variants should respect skipVariantsResolver if defined', () => {
      const TestSlot = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        name: 'MuiTest',
        slot: 'Slot',
        overridesResolver: (props, styles) => styles.slot,
        skipVariantsResolver: false,
      })`
        width: 200px;
        height: 300px;
      `;

      const { container } = render(
        <ThemeProvider theme={theme}>
          <TestSlot variant="rect" size="large">
            Test
          </TestSlot>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '400px',
        height: '400px',
      });
    });

    it('variants should win over overrides', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test variant="rect" size="large">
            Test
          </Test>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '400px',
        height: '400px',
      });
    });

    it('variants should win over overrides when styles are object', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <TestObj variant="rect" size="large">
            Test
          </TestObj>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '400px',
        height: '400px',
      });
    });

    it('styled wrapper should win over variants', () => {
      const CustomTest = styled(Test)`
        width: 500px;
      `;

      const { container } = render(
        <ThemeProvider theme={theme}>
          <CustomTest variant="rect" size="large">
            Test
          </CustomTest>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '500px',
        height: '400px',
      });
    });

    it('styled wrapper should win over variants when styles are object', () => {
      const CustomTest = styled(TestObj)({
        width: '500px',
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <CustomTest variant="rect" size="large">
            Test
          </CustomTest>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '500px',
        height: '400px',
      });
    });

    it('should resolve the sx prop', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test sx={{ color: 'primary.main' }}>Test</Test>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        color: 'rgb(0, 0, 255)',
      });
    });

    it('should resolve the sx prop when styles are object', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <TestObj sx={{ color: 'primary.main' }}>Test</TestObj>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        color: 'rgb(0, 0, 255)',
      });
    });

    it('should respect the skipSx option', () => {
      const testOverridesResolver = (props, styles) => ({
        ...styles.root,
        ...(props.variant && styles[props.variant]),
      });

      const TestNoSx = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        overridesResolver: testOverridesResolver,
        skipSx: true,
      })(({ sx = {} }) => ({
        ...(sx.mt && {
          marginTop: `${sx.mt * -1}px`,
        }),
      }));

      const { container: containerNoSx } = render(
        <ThemeProvider theme={theme}>
          <TestNoSx sx={{ mt: 1 }}>Test</TestNoSx>
        </ThemeProvider>,
      );

      // sx prop ignored, custom function takes place
      expect(containerNoSx.firstChild).toHaveComputedStyle({
        marginTop: '-1px',
      });

      const TestWithSx = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        overridesResolver: testOverridesResolver,
      })(({ sx = {} }) => ({
        ...(sx.mt && {
          marginTop: `${sx.m * -1}px`,
        }),
      }));

      const { container: containerSxProp } = render(
        <ThemeProvider theme={theme}>
          <TestWithSx sx={{ mt: 1 }}>Test</TestWithSx>
        </ThemeProvider>,
      );

      // default sx props takes place
      expect(containerSxProp.firstChild).toHaveComputedStyle({
        marginTop: '8px',
      });
    });

    it('should set displayName properly', () => {
      const Component = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        name: 'MuiComponent',
      })`
        width: 200px;
        height: 300px;
      `;

      expect(Component.displayName).to.equal('MuiComponent');
    });

    it('should set displayName as name + slot if both are specified', () => {
      const Component = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        name: 'MuiComponent',
        slot: 'Root',
      })`
        width: 200px;
        height: 300px;
      `;

      expect(Component.displayName).to.equal('MuiComponentRoot');
    });

    it('should set the className when generating the classes', () => {
      const Component = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        name: 'MuiComponent',
        slot: 'Slot',
      })`
        width: 200px;
        height: 300px;
      `;

      const { container } = render(<Component>Test</Component>);

      const classList = Array.from(container.firstChild.classList);
      const regExp = new RegExp(`.*-MuiComponent-slot$`);
      let containsValidClass = false;

      classList.forEach((className) => {
        if (regExp.test(className)) {
          containsValidClass = true;
        }
      });

      expect(containsValidClass).to.equal(true);
    });

    it('should set the className as root if no slot is specified', () => {
      const Component = styled('div', {
        shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx',
        name: 'MuiComponent',
      })`
        width: 200px;
        height: 300px;
      `;

      const { container } = render(<Component>Test</Component>);

      const classList = Array.from(container.firstChild.classList);
      const regExp = new RegExp(`.*-MuiComponent-root$`);
      let containsValidClass = false;

      classList.forEach((className) => {
        if (regExp.test(className)) {
          containsValidClass = true;
        }
      });

      expect(containsValidClass).to.equal(true);
    });
  });
});
