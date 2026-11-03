import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import { createRenderer, reactMajor, screen, within } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton, { iconButtonClasses as classes } from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import ButtonBase from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<IconButton />', () => {
  const { render } = createRenderer();

  describeConformance(<IconButton>book</IconButton>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiIconButton',
    testVariantProps: { edge: 'end', disabled: true },
    skip: ['componentProp'],
  }));

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon data-testid="icon" className={childClassName} />;
    render(<IconButton>{iconChild}</IconButton>);

    expect(screen.getByTestId('icon')).to.have.class(childClassName);
  });

  it('should have a ripple', async () => {
    const { container } = render(
      <IconButton TouchRippleProps={{ className: 'touch-ripple' }}>book</IconButton>,
    );
    await ripple.startTouch(screen.getByRole('button'));
    expect(container.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple and hover effect', async () => {
    const { container } = render(
      <IconButton disableRipple TouchRippleProps={{ className: 'touch-ripple' }}>
        book
      </IconButton>,
    );
    await ripple.startTouch(screen.getByRole('button'));
    expect(container.querySelector('.touch-ripple')).to.equal(null);
  });

  describe('prop: size', () => {
    it('should render the right class', () => {
      let root;
      root = render(<IconButton size="small">book</IconButton>).container.firstChild;
      expect(root).to.have.class(classes.sizeSmall);

      root = render(<IconButton size="medium">book</IconButton>).container.firstChild;
      expect(root).not.to.have.class(classes.sizeSmall);

      root = render(<IconButton size="large">book</IconButton>).container.firstChild;
      expect(root).to.have.class(classes.sizeLarge);

      root = render(<IconButton>book</IconButton>).container.firstChild;
      expect(root).not.to.have.class(classes.sizeSmall);
      expect(root).not.to.have.class(classes.sizeLarge);
    });
  });

  describe('prop: edge', () => {
    it('edge="start" should render the right class', () => {
      const { container } = render(<IconButton edge="start">book</IconButton>);

      expect(container.firstChild).to.have.class(classes.edgeStart);
    });

    it('edge="end" should render the right class', () => {
      const { container } = render(<IconButton edge="end">book</IconButton>);

      expect(container.firstChild).to.have.class(classes.edgeEnd);
    });

    it('no edge should render the right class', () => {
      const { container } = render(<IconButton>book</IconButton>);

      expect(container.firstChild).not.to.have.class(classes.edgeStart);
      expect(container.firstChild).not.to.have.class(classes.edgeEnd);
    });
  });

  describe('prop: disabled', () => {
    it('should disable the component', () => {
      render(<IconButton disabled>book</IconButton>);
      const button = screen.getByRole('button');

      expect(button).to.have.property('disabled', true);
      expect(button).to.have.class(classes.disabled);
    });
  });

  describe('prop: color', () => {
    ['primary', 'secondary', 'error', 'info', 'success', 'warning'].forEach((color) => {
      it(`should render the ${color} class`, () => {
        render(<IconButton color={color}>Hello World</IconButton>);
        const button = screen.getByRole('button');
        expect(button).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  // React 19 removed prop types support
  it.skipIf(reactMajor >= 19)(
    'should raise a warning about onClick in children because of Firefox',
    function test() {
      expect(() => {
        PropTypes.checkPropTypes(
          IconButton.propTypes,
          { classes: {}, children: <svg onClick={() => {}} /> },
          'prop',
          'MockedName',
        );
      }).toErrorDev(['MUI: You are providing an onClick event listener']);
    },
  );

  it('should not throw error for a custom color', () => {
    expect(() => (
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiIconButton: {
              defaultProps: {
                color: 'custom',
              },
            },
          },
        })}
      >
        <IconButton />
      </ThemeProvider>
    )).not.to.throw();
  });

  it('should disable ripple if disableRipple:true is set in MuiButtonBase', async () => {
    const { container } = render(
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiButtonBase: {
              defaultProps: {
                disableRipple: true,
              },
            },
          },
        })}
      >
        <IconButton TouchRippleProps={{ className: 'touch-ripple' }}>book</IconButton>,
      </ThemeProvider>,
    );
    await ripple.startTouch(screen.getByRole('button'));
    expect(container.querySelector('.touch-ripple')).to.equal(null);
  });

  describe('prop: loading', () => {
    it('does not render the wrapper by default', () => {
      render(<IconButton />);

      const button = screen.getByRole('button');
      expect(button).to.have.property('disabled', false);
      expect(button.firstChild).to.equal(null);
    });

    it('disables the button', () => {
      render(<IconButton loading />);

      const button = screen.getByRole('button');
      expect(button).to.have.property('tabIndex', -1);
      expect(button).to.have.property('disabled', true);
    });

    it('cannot be enabled while `loading`', () => {
      render(<IconButton disabled={false} loading />);

      expect(screen.getByRole('button')).to.have.property('disabled', true);
    });

    it('renders a progressbar that is labelled by the button', () => {
      render(<IconButton loading>Submit</IconButton>);

      const button = screen.getByRole('button');
      const progressbar = within(button).getByRole('progressbar');
      expect(progressbar).toHaveAccessibleName('Submit');
    });

    it('has no id when `loading=false` and no `id` prop is present`', () => {
      const id = 'some-id';
      render(
        <React.Fragment>
          <IconButton />
          <IconButton id={id} />
        </React.Fragment>,
      );

      const buttons = screen.getAllByRole('button');

      expect(buttons[0]).not.to.have.attribute('id');
      expect(buttons[1]).to.have.attribute('id', id);
    });
  });

  describe('prop: loadingIndicator', () => {
    it('is not rendered by default', () => {
      render(<IconButton loadingIndicator="loading">Test</IconButton>);

      expect(screen.getByRole('button')).to.have.text('Test');
    });

    it('is rendered before the children when `loading`', () => {
      render(
        <IconButton loadingIndicator="loading…" loading>
          Test
        </IconButton>,
      );

      expect(screen.getByRole('button')).to.have.text('loading…Test');
    });
  });

  describe('prop: nativeButton', () => {
    it('forwards nativeButton={false} to ButtonBase with a custom component', () => {
      const CustomSpan = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <IconButton component={CustomSpan} nativeButton={false}>
          icon
        </IconButton>,
      );

      const button = screen.getByRole('button');
      expect(button).to.have.tagName('SPAN');
      expect(button).not.to.have.attribute('type');

      // Proves nativeButton={false} was forwarded — without it, ButtonBase
      // would warn about a non-button host with nativeButton omitted.
      expect(errorSpy.mock.calls.length).to.equal(0);
      errorSpy.mockRestore();
    });
  });
});
