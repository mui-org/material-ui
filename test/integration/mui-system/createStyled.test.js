import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import createStyled from '@mui/system/createStyled';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createRenderer, screen } from '@mui/internal-test-utils';

describe('createStyled', () => {
  const { render } = createRenderer();

  // These tests rely on implementation details (namely `displayName`)
  // Ideally we'd just test if the proper name appears in a React warning.
  // But React warnings are deduplicated during module lifetime.
  // We would need to reset modules to make the tests work in watchmode.
  describe.skipIf(process.env.NODE_ENV === 'production')('displayName', () => {
    it('uses the `componentName` if set', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled('div', { name: 'SomeMuiComponent' })({});

      expect(SomeMuiComponent).to.have.property('displayName', 'SomeMuiComponent');
    });

    it('falls back to the decorated tag name', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled('div')({});

      expect(SomeMuiComponent).to.have.property('displayName', 'Styled(div)');
    });

    it('falls back to the decorated computed displayName', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled(function SomeMuiComponent() {
        return null;
      })({});

      expect(SomeMuiComponent).to.have.property('displayName', 'Styled(SomeMuiComponent)');
    });

    it('has a fallback name if the display name cannot be computed', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled(() => null)({});

      expect(SomeMuiComponent).to.have.property('displayName', 'Styled(Component)');
    });
  });

  describe('composition', () => {
    it('should call styleFunctionSx once', () => {
      const styled = createStyled();
      const spySx = spy();
      const Child = styled('div')({});

      render(<Child sx={spySx} />);

      expect(spySx.callCount).to.equal(2); // React 18 renders twice in strict mode.
    });

    it('should still call styleFunctionSx once', () => {
      const styled = createStyled();
      const spySx = spy();
      const Child = styled('div')({});
      const Parent = styled(Child)({});

      render(<Parent sx={spySx} />);

      expect(spySx.callCount).to.equal(2); // React 18 renders twice in strict mode.
    });

    it('both child and parent still accept `sx` prop', () => {
      const styled = createStyled();
      const Child = styled('div')({});
      const Parent = styled(Child)({});

      render(
        <React.Fragment>
          <Parent data-testid="parent" sx={{ color: 'rgb(0, 0, 255)' }} />
          <Child data-testid="child" sx={{ color: 'rgb(255, 0, 0)' }} />
        </React.Fragment>,
      );
      expect(screen.getByRole('parent')).toHaveComputedStyle({ color: 'rgb(0, 0, 255)' });
      expect(screen.getByRole('child')).toHaveComputedStyle({ color: 'rgb(255, 0, 0)' });
    });
  });

  it('default overridesResolver', () => {
    const styled = createStyled({});
    const Button = styled('button', {
      name: 'MuiButton',
      slot: 'root',
    })({
      display: 'flex',
    });

    render(
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiButton: {
              styleOverrides: {
                root: {
                  width: '300px',
                  height: '200px',
                },
              },
            },
          },
        })}
      >
        <Button data-testid="button" color="primary" variant="contained" className="Mui-disabled">
          Hello
        </Button>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('button')).toHaveComputedStyle({
      width: '300px',
      height: '200px',
    });
  });

  describe('styles', () => {
    it('styles of pseudo classes of variants are merged', () => {
      const theme = createTheme({
        components: {
          MuiButton: {
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  '&.Mui-disabled': {
                    width: '300px',
                  },
                },
              },
              {
                props: { variant: 'contained', color: 'primary' },
                style: {
                  '&.Mui-disabled': {
                    height: '200px',
                  },
                },
              },
            ],
          },
        },
      });
      const styled = createStyled({});
      const Button = styled('button', {
        shouldForwardProp: (prop) => prop !== 'color' && prop !== 'contained',
        name: 'MuiButton',
        slot: 'Root',
        overridesResolver: (props, styles) => styles.root,
      })({
        display: 'flex',
      });

      render(
        <ThemeProvider theme={theme}>
          <Button data-testid="button" color="primary" variant="contained" className="Mui-disabled">
            Hello
          </Button>
        </ThemeProvider>,
      );

      expect(screen.getByTestId('button')).toHaveComputedStyle({
        width: '300px',
        height: '200px',
      });
    });
  });

  describe('styleOverrides callback', () => {
    const styled = createStyled({});
    const ButtonRoot = styled('button', {
      name: 'MuiButton',
      slot: 'Root',
      overridesResolver: (props, styles) => [
        styles.root,
        { [`& .MuiButton-avatar`]: styles.avatar },
      ],
    })({});
    const ButtonIcon = styled('span', {
      name: 'MuiButton',
      slot: 'Icon',
      overridesResolver: (props, styles) => styles.icon,
    })({});
    function Button({ children, startIcon, endIcon, color = 'primary', ...props }) {
      const ownerState = { startIcon, endIcon, color, ...props };
      return (
        <ButtonRoot data-testid="button" ownerState={ownerState}>
          {startIcon && <ButtonIcon ownerState={ownerState}>{startIcon}</ButtonIcon>}
          {children}
          {endIcon && <ButtonIcon ownerState={ownerState}>{endIcon}</ButtonIcon>}
        </ButtonRoot>
      );
    }

    it('spread ownerState as props to the slot styleOverrides', () => {
      const finalTheme = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              avatar: () => {
                return {
                  width: '100px',
                };
              },
            },
          },
        },
      });
      render(
        <ThemeProvider theme={finalTheme}>
          <Button>
            <div className="MuiButton-avatar" data-testid="button-avatar" />
            Hello
          </Button>
        </ThemeProvider>,
      );
      expect(screen.getByTestId('button-avatar')).toHaveComputedStyle({
        width: '100px',
      });
    });

    it('support slot as nested class', () => {
      const finalTheme = createTheme({
        typography: {
          button: {
            fontSize: '20px',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState, theme }) => {
                const { color, variant } = ownerState;
                const styles = [];
                if (color === 'primary') {
                  styles.push({
                    width: 120,
                    height: 48,
                  });
                }
                if (variant === 'contained') {
                  styles.push(theme.typography.button);
                }
                return styles;
              },
              icon: ({ ownerState }) => [
                ownerState.startIcon && { marginRight: 8 },
                ownerState.endIcon && { marginLeft: 8 },
              ],
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={finalTheme}>
          <Button color="primary" variant="contained" startIcon="foo">
            Hello
          </Button>
        </ThemeProvider>,
      );
      expect(screen.getByRole('button')).toHaveComputedStyle({
        width: '120px',
        height: '48px',
        fontSize: '20px',
      });
      expect(
        container.firstChild.firstChild, // startIcon
      ).toHaveComputedStyle({
        marginRight: '8px',
      });
    });

    it('support object return from the callback', () => {
      const finalTheme = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: () => ({
                width: '300px',
              }),
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={finalTheme}>
          <Button>Hello</Button>
        </ThemeProvider>,
      );
      expect(container.firstChild).toHaveComputedStyle({
        width: '300px',
      });
    });

    it('support template string return from the callback', () => {
      const finalTheme = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: () => `
                width: 300px;
              `,
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={finalTheme}>
          <Button>Hello</Button>
        </ThemeProvider>,
      );
      expect(container.firstChild).toHaveComputedStyle({
        width: '300px',
      });
    });

    it('works with sx', () => {
      const finalTheme = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ theme }) =>
                theme.unstable_sx({
                  pt: 10,
                }),
              icon: ({ ownerState, theme }) => [
                ownerState.color === 'primary' &&
                  theme.unstable_sx({
                    mr: 10,
                  }),
              ],
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={finalTheme}>
          <Button startIcon="✅">Hello</Button>
        </ThemeProvider>,
      );
      expect(container.firstChild).toHaveComputedStyle({
        paddingTop: '80px',
      });
      expect(container.firstChild.firstChild).toHaveComputedStyle({
        marginRight: '80px',
      });
    });
  });

  it('does not spread `sx` prop to DOM', () => {
    const styled = createStyled({});
    const Button = styled('button')({});

    render(
      <Button data-testid="button" sx={{ bgcolor: 'red' }}>
        Link
      </Button>,
    );
    expect(screen.getByTestId('button')).not.to.have.attribute('sx');
  });

  it('does not forward `ownerState` prop to DOM', () => {
    const styled = createStyled({});
    const Button = styled('button')({});

    render(<Button data-testid="button" ownerState={{}} />);
    expect(screen.getByTestId('button')).not.to.have.attribute('ownerState');
  });

  describe('default behaviors', () => {
    it('does not forward invalid props to DOM if no `slot` specified', () => {
      // This scenario is usually used by library consumers
      const styled = createStyled({});
      const Button = styled('button')({});

      render(
        <Button data-testid="button" color="red" shouldBeRemoved data-foo="bar">
          Link
        </Button>,
      );
      const button = screen.getByTestId('button');
      expect(button.getAttribute('data-foo')).to.equal('bar');
      expect(button.getAttribute('color')).to.equal('red'); // color is for Safari mask-icon link
      expect(button.getAttribute('shouldBeRemoved')).not.to.equal('true');
    });

    it('can use `as` prop', () => {
      const styled = createStyled({});
      const Button = styled('button')({});

      render(<Button data-testid="button" as="a" href="/" />);

      expect(screen.getByTestId('button')).to.have.tagName('a');
      expect(screen.getByTestId('button')).to.have.attribute('href', '/');
    });

    it('able to pass props to `as` styled component', () => {
      const styled = createStyled({});
      const ChildRoot = styled('div')({});
      function Child({ component }) {
        return <ChildRoot as={component}>content</ChildRoot>;
      }
      const Button = styled('button')({});
      const { container } = render(<Button as={Child} component="span" />);

      expect(container.firstChild).to.have.tagName('span');
    });
  });

  describe('variants key', () => {
    it('should accept variants in object style arg', () => {
      const styled = createStyled({});

      const Test = styled('div')({
        variants: [
          {
            props: { color: 'blue', variant: 'filled' },
            style: {
              backgroundColor: 'rgb(0,0,255)',
            },
          },
          {
            props: { color: 'blue', variant: 'text' },
            style: {
              color: 'rgb(0,0,255)',
            },
          },
        ],
      });

      render(
        <React.Fragment>
          <Test data-testid="filled" color="blue" variant="filled">
            Filled
          </Test>
          <Test data-testid="text" color="blue" variant="text">
            Text
          </Test>
        </React.Fragment>,
      );

      expect(screen.getByTestId('filled')).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
      expect(screen.getByTestId('text')).toHaveComputedStyle({ color: 'rgb(0, 0, 255)' });
    });

    it('should accept variants in function style arg', () => {
      const styled = createStyled({ defaultTheme: { colors: { blue: 'rgb(0, 0, 255)' } } });

      const Test = styled('div')(({ theme }) => ({
        variants: [
          {
            props: { color: 'blue', variant: 'filled' },
            style: {
              backgroundColor: theme.colors.blue,
            },
          },
          {
            props: { color: 'blue', variant: 'text' },
            style: {
              color: theme.colors.blue,
            },
          },
        ],
      }));

      render(
        <React.Fragment>
          <Test data-testid="filled" color="blue" variant="filled">
            Filled
          </Test>
          <Test data-testid="text" color="blue" variant="text">
            Text
          </Test>
        </React.Fragment>,
      );

      expect(screen.getByTestId('filled')).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
      expect(screen.getByTestId('text')).toHaveComputedStyle({ color: 'rgb(0, 0, 255)' });
    });

    it('should accept variants in function style arg with props usage', () => {
      const styled = createStyled({
        defaultTheme: {
          colors: { blue: 'rgb(0, 0, 255)', red: 'rgb(255, 0, 0)', green: 'rgb(0, 255, 0)' },
        },
      });

      const Test = styled('div')(({ theme, color }) => ({
        variants: [
          {
            props: (props) => props.color !== 'blue',
            style: {
              backgroundColor: theme.colors[color],
            },
          },
        ],
      }));

      render(
        <React.Fragment>
          <Test data-testid="red" color="red">
            Filled
          </Test>
          <Test data-testid="green" color="green">
            Text
          </Test>
        </React.Fragment>,
      );

      expect(screen.getByTestId('green')).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 255, 0)',
      });
      expect(screen.getByTestId('red')).toHaveComputedStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    });

    it('should merge props and ownerState in props callback', () => {
      const styled = createStyled({
        defaultTheme: {
          colors: { blue: 'rgb(0, 0, 255)', red: 'rgb(255, 0, 0)', green: 'rgb(0, 255, 0)' },
        },
      });

      const Test = styled('div')(({ theme, color }) => ({
        variants: [
          {
            props: (props) => props.color === 'green' || props.color === 'red',
            style: {
              backgroundColor: theme.colors[color],
            },
          },
        ],
      }));

      render(
        <React.Fragment>
          <Test data-testid="red" ownerState={{ color: 'red' }}>
            Red
          </Test>
          <Test data-testid="green" ownerState={{ color: 'green' }}>
            Green
          </Test>
        </React.Fragment>,
      );

      expect(screen.getByTestId('green')).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 255, 0)',
      });
      expect(screen.getByTestId('red')).toHaveComputedStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    });

    it('should accept variants in arrays', () => {
      const styled = createStyled({ defaultTheme: { colors: { blue: 'rgb(0, 0, 255)' } } });

      const Test = styled('div')(
        ({ theme }) => ({
          variants: [
            {
              props: { color: 'blue', variant: 'filled' },
              style: {
                backgroundColor: theme.colors.blue,
              },
            },
            {
              props: { color: 'blue', variant: 'text' },
              style: {
                color: theme.colors.blue,
              },
            },
          ],
        }),
        {
          variants: [
            {
              props: { color: 'blue', variant: 'outlined' },
              style: {
                borderTopColor: 'rgb(0,0,255)',
              },
            },
            // This is overriding the previous definition
            {
              props: { color: 'blue', variant: 'text' },
              style: {
                color: 'rgb(0,0,220)',
              },
            },
          ],
        },
      );

      render(
        <React.Fragment>
          <Test data-testid="filled" color="blue" variant="filled">
            Filled
          </Test>
          <Test data-testid="text" color="blue" variant="text">
            Text
          </Test>
          <Test data-testid="outlined" color="blue" variant="outlined">
            Outlined
          </Test>
        </React.Fragment>,
      );

      expect(screen.getByTestId('filled')).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
      expect(screen.getByTestId('text')).toHaveComputedStyle({ color: 'rgb(0, 0, 220)' });
      expect(screen.getByTestId('outlined')).toHaveComputedStyle({
        borderTopColor: 'rgb(0, 0, 255)',
      });
    });

    it('theme variants should override styled variants', () => {
      const styled = createStyled({});

      const Test = styled('div', { name: 'Test' })({
        variants: [
          {
            props: { color: 'blue', variant: 'filled' },
            style: {
              backgroundColor: 'rgb(0,0,255)',
            },
          },
          // This is overriding the previous definition
          {
            props: { color: 'blue', variant: 'text' },
            style: {
              color: 'rgb(0,0,255)',
            },
          },
        ],
      });

      render(
        <ThemeProvider
          theme={{
            components: {
              Test: {
                variants: [
                  {
                    props: { variant: 'text', color: 'blue' },
                    style: {
                      color: 'rgb(0,0,220)',
                    },
                  },
                ],
              },
            },
          }}
        >
          <Test data-testid="filled" color="blue" variant="filled">
            Filled
          </Test>
          <Test data-testid="text" color="blue" variant="text">
            Text
          </Test>
        </ThemeProvider>,
      );

      expect(screen.getByTestId('filled')).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
      expect(screen.getByTestId('text')).toHaveComputedStyle({ color: 'rgb(0, 0, 220)' });
    });

    it('should accept variants in function props arg', () => {
      const styled = createStyled({ defaultTheme: { colors: { blue: 'rgb(0, 0, 255)' } } });

      const Test = styled('div')(({ theme }) => ({
        variants: [
          {
            props: (props) => props.color === 'blue' && props.variant === 'filled',
            style: {
              backgroundColor: theme.colors.blue,
            },
          },
          {
            props: (props) => props.color === 'blue' && props.variant === 'text',
            style: {
              color: theme.colors.blue,
            },
          },
        ],
      }));

      render(
        <React.Fragment>
          <Test data-testid="filled" color="blue" variant="filled">
            Filled
          </Test>
          <Test data-testid="text" color="blue" variant="text">
            Text
          </Test>
        </React.Fragment>,
      );

      expect(screen.getByTestId('filled')).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
      expect(screen.getByTestId('text')).toHaveComputedStyle({ color: 'rgb(0, 0, 255)' });
    });

    it('should accept variants with both object and function props arg', () => {
      const styled = createStyled({ defaultTheme: { colors: { blue: 'rgb(0, 0, 255)' } } });

      const Test = styled('div')(({ theme }) => ({
        variants: [
          {
            props: (props) => props.color === 'blue' && props.variant === 'filled',
            style: {
              backgroundColor: theme.colors.blue,
            },
          },
          {
            props: { color: 'blue', variant: 'outlined' },
            style: {
              borderColor: theme.colors.blue,
            },
          },
          {
            props: (props) => props.color === 'blue' && props.variant === 'text',
            style: {
              color: theme.colors.blue,
            },
          },
        ],
      }));

      render(
        <React.Fragment>
          <Test data-testid="filled" color="blue" variant="filled">
            Filled
          </Test>
          <Test data-testid="outlined" color="blue" variant="outlined">
            Outlined
          </Test>
          <Test data-testid="text" color="blue" variant="text">
            Text
          </Test>
        </React.Fragment>,
      );

      expect(screen.getByTestId('filled')).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
      expect(screen.getByTestId('outlined')).toHaveComputedStyle({
        borderTopColor: 'rgb(0, 0, 255)',
      });
      expect(screen.getByTestId('text')).toHaveComputedStyle({ color: 'rgb(0, 0, 255)' });
    });

    it('should not consume values from nested ownerState', () => {
      const styled = createStyled({ defaultTheme: { colors: { blue: 'rgb(0, 0, 255)' } } });

      const Test = styled('div')(({ theme }) => ({
        variants: [
          {
            props: ({ ownerState }) => ownerState.color === 'blue',
            style: {
              backgroundColor: theme.colors.blue,
            },
          },
        ],
      }));

      const ownerState = { color: 'blue' };

      render(
        <React.Fragment>
          <Test data-testid="blue" ownerState={ownerState}>
            Blue
          </Test>
          <Test data-testid="nested" ownerState={{ ownerState }}>
            Nested ownerState
          </Test>
        </React.Fragment>,
      );

      expect(screen.getByTestId('blue')).toHaveComputedStyle({ backgroundColor: 'rgb(0, 0, 255)' });
      expect(screen.getByTestId('nested')).not.toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
    });
  });
});
