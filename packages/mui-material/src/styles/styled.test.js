import { describe, it, expect, beforeAll } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import createTheme from './createTheme';
import styled from './styled';
import ThemeProvider from './ThemeProvider';

describe('styled', () => {
  const { render } = createRenderer();

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

    beforeAll(() => {
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

      const testOverridesResolver = (props, styles) => [
        styles.root,
        props.variant && styles[props.variant],
      ];

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
      const testOverridesResolver = (props, styles) => [
        styles.root,
        props.variant && styles[props.variant],
      ];

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
      const regExp = /.*-MuiComponent-slot$/;
      const regExpSC = /MuiComponent-slot-.*/;
      let containsValidClass = false;

      classList.forEach((className) => {
        if (regExp.test(className) || regExpSC.test(className)) {
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
      const regExp = /.*-MuiComponent-root$/;
      const regExpSC = /MuiComponent-root.*/;
      let containsValidClass = false;

      classList.forEach((className) => {
        if (regExp.test(className) || regExpSC.test(className)) {
          containsValidClass = true;
        }
      });

      expect(containsValidClass).to.equal(true);
    });

    it('should not propagate classes props to component if it is a root slot', () => {
      const Component = styled(
        (props) => {
          const { classes, ...other } = props;
          return <div data-with-classes={classes !== undefined} {...other} />;
        },
        { name: 'MuiComponent', slot: 'Root' },
      )`
        width: 200px;
        height: 300px;
      `;

      render(
        <Component data-testid="root" classes={{ root: 'foo' }}>
          Test
        </Component>,
      );

      expect(screen.getByTestId('root').getAttribute('data-with-classes')).to.equal('false');
    });

    it('should propagate classes props to component if it is not a root slot', () => {
      const Component = styled(
        (props) => {
          const { classes, ...other } = props;
          return <div data-with-classes={classes !== undefined} {...other} />;
        },
        { name: 'MuiComponent', slot: 'Slot' },
      )`
        width: 200px;
        height: 300px;
      `;

      render(
        <React.Fragment>
          <Component data-testid="with-classes" classes={{ root: 'foo' }}>
            Test
          </Component>
          <Component data-testid="without-classes">Test</Component>
        </React.Fragment>,
      );

      expect(screen.getByTestId('with-classes').getAttribute('data-with-classes')).to.equal('true');
      expect(screen.getByTestId('without-classes').getAttribute('data-with-classes')).to.equal(
        'false',
      );
    });

    it('should propagate classes props to component if no slot is specified', () => {
      const Component = styled((props) => {
        const { classes, ...other } = props;
        return <div data-with-classes={classes !== undefined} {...other} />;
      })`
        width: 200px;
        height: 300px;
      `;

      render(
        <React.Fragment>
          <Component data-testid="with-classes" classes={{ root: 'foo' }}>
            Test
          </Component>
          <Component data-testid="without-classes">Test</Component>
        </React.Fragment>,
      );

      expect(screen.getByTestId('with-classes').getAttribute('data-with-classes')).to.equal('true');
      expect(screen.getByTestId('without-classes').getAttribute('data-with-classes')).to.equal(
        'false',
      );
    });

    it('classes props should be correctly applied to root and slot elements', () => {
      function Child(props) {
        const { classes = {}, className, ...other } = props;

        return (
          <div
            data-testid="child"
            className={`${classes.root} ${className} MuiChild-root`}
            {...other}
          />
        );
      }

      const ParentRoot = styled('div', { name: 'MuiParent', slot: 'Root' })``;
      const ParentSlot = styled(Child, { name: 'MuiChild', slot: 'Slot' })``;

      function Parent(props) {
        const { classes = {}, className, ...other } = props;

        return (
          <ParentRoot
            data-testid="parent"
            className={`${classes.root} ${className} MuiParent-root`}
            {...other}
          >
            {/* The classes prop here should not be blocked by the styled() utility */}
            <ParentSlot classes={{ root: classes.slot }} />
          </ParentRoot>
        );
      }

      const { container } = render(<Parent classes={{ root: 'root', slot: 'slot' }} />);

      expect(
        container.getElementsByClassName('MuiParent-root')[0]?.classList.contains('root'),
      ).to.equal(true);

      // child has the correct class
      expect(
        container.getElementsByClassName('MuiChild-root')[0]?.classList.contains('slot'),
      ).to.equal(true);

      // none of the elements should have the classes attribute
      expect(container.querySelectorAll('[classes]').length).to.equal(0);
    });
  });
});
