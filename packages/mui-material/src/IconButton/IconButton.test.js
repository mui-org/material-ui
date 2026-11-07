import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import { act, createRenderer, isJsdom, reactMajor, screen, within } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton, { iconButtonClasses as classes } from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import ButtonBase from '@mui/material/ButtonBase';
import SvgIcon from '@mui/material/SvgIcon';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';
import { contrastRatio, WCAG_MINIMUM_RATIO, WCAG_NON_TEXT_RATIO } from '../../test/contrast';
import { FAILING_PALETTE_COLORS, PALETTE_CONTRAST_COLORS } from '../../test/contrastContract';

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

  describe('WCAG 2.2 conformance', () => {
    const icon = (
      <SvgIcon data-testid="icon">
        <path d="M6 19h12V7H6z" />
      </SvgIcon>
    );

    describe('1.1.1 Non-text Content', () => {
      it('names an icon-only button from its aria-label', () => {
        render(<IconButton aria-label="Delete">{icon}</IconButton>);

        expect(screen.getByRole('button')).toHaveAccessibleName('Delete');
      });

      it('hides the decorative icon from assistive technology', () => {
        render(<IconButton aria-label="Delete">{icon}</IconButton>);

        expect(screen.getByTestId('icon')).to.have.attribute('aria-hidden', 'true');
      });
    });

    it('1.4.3 Contrast (Minimum): text children fall short of 4.5:1 only in the documented palette colors', () => {
      const theme = createTheme();
      render(
        <React.Fragment>
          {PALETTE_CONTRAST_COLORS.map((color) => (
            <IconButton key={color} aria-label={color} color={color}>
              A
            </IconButton>
          ))}
        </React.Fragment>,
      );

      // Text children take the `main` color, on the paper background.
      const failing = PALETTE_CONTRAST_COLORS.filter((color) => {
        const { color: textColor } = window.getComputedStyle(
          screen.getByRole('button', { name: color }),
        );
        return (
          contrastRatio(textColor, theme.palette.background.paper) < WCAG_MINIMUM_RATIO.normalText
        );
      });
      expect(failing).to.deep.equal([...FAILING_PALETTE_COLORS]);
    });

    it('1.4.3 Contrast (Minimum): text children in the default color reach 4.5:1', () => {
      const theme = createTheme();
      render(<IconButton aria-label="Default">A</IconButton>);

      // The default color is `action.active`, about 4.59:1 on the paper background.
      const { color: textColor } = window.getComputedStyle(screen.getByRole('button'));
      expect(
        contrastRatio(textColor, theme.palette.background.paper),
        `default text color ${textColor}`,
      ).to.be.at.least(WCAG_MINIMUM_RATIO.normalText);
    });

    it('1.4.11 Non-text Contrast: the icon reaches 3:1 against the paper background in every color', () => {
      const theme = createTheme();
      const colors = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];
      render(
        <React.Fragment>
          {colors.map((color) => (
            <IconButton key={color} aria-label={color} color={color}>
              {icon}
            </IconButton>
          ))}
        </React.Fragment>,
      );

      colors.forEach((color) => {
        const { color: iconColor } = window.getComputedStyle(
          screen.getByRole('button', { name: color }),
        );
        expect(contrastRatio(iconColor, theme.palette.background.paper)).to.be.at.least(
          WCAG_NON_TEXT_RATIO,
          `${color} icon color ${iconColor}`,
        );
      });
    });

    it('2.1.1 Keyboard: Enter and Space activate the button', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <IconButton aria-label="Delete" onClick={handleClick}>
          {icon}
        </IconButton>,
      );

      await user.tab();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the button', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">Before</button>
          <IconButton aria-label="Middle">{icon}</IconButton>
          <button type="button">After</button>
        </React.Fragment>,
      );

      await user.tab();
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: 'Middle' })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

      await user.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'Middle' })).toHaveFocus();

      await user.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
    });

    describe('2.4.3 Focus Order', () => {
      it('is a single tab stop in natural DOM order with no positive tabIndex', () => {
        render(<IconButton aria-label="Delete">{icon}</IconButton>);

        expect(screen.getByRole('button')).to.have.property('tabIndex', 0);
      });

      it('removes a disabled button from the tab order', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">Before</button>
            <IconButton aria-label="Skipped" disabled>
              {icon}
            </IconButton>
            <button type="button">After</button>
          </React.Fragment>,
        );

        await user.tab();
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

        await user.tab({ shift: true });
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
      });

      // Documented gap: Chromium blurs a focused button when it becomes disabled.
      // This fails once https://github.com/mui/material-ui/pull/49540 keeps focus on it.
      it.skipIf(isJsdom() || !/chrome/i.test(navigator.userAgent))(
        'focus leaves the button when `loading` is set while focused',
        async () => {
          const { setProps } = render(
            <IconButton aria-label="Save" loading={false}>
              {icon}
            </IconButton>,
          );
          const button = screen.getByRole('button', { name: 'Save' });

          await act(async () => {
            button.focus();
          });
          expect(document.activeElement).to.equal(button);

          setProps({ loading: true });
          await act(async () => {
            await new Promise((resolve) => {
              requestAnimationFrame(() => requestAnimationFrame(resolve));
            });
          });

          expect(document.activeElement).not.to.equal(button);
        },
      );
    });

    it('2.5.2 Pointer Cancellation: activates on click, but not when released off the target', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <React.Fragment>
          <IconButton aria-label="Delete" onClick={handleClick}>
            {icon}
          </IconButton>
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const button = screen.getByRole('button', { name: 'Delete' });

      // Press on the button, move away, then release: nothing runs.
      await user.pointer([
        { keys: '[MouseLeft>]', target: button },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(handleClick).toHaveBeenCalledTimes(0);

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('3.2.1 On Focus: moving keyboard focus to the button does not activate it', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <IconButton aria-label="Delete" onClick={handleClick}>
          {icon}
        </IconButton>,
      );

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    describe('3.2.2 On Input', () => {
      it('toggling the pressed state with the keyboard keeps focus and changes no context', async () => {
        function FavoriteToggle() {
          const [pressed, setPressed] = React.useState(false);
          return (
            <IconButton
              aria-label="Favorite"
              aria-pressed={pressed}
              onClick={() => setPressed((previous) => !previous)}
            >
              {icon}
            </IconButton>
          );
        }
        const { user } = render(<FavoriteToggle />);
        await user.tab();
        const button = screen.getByRole('button', { name: 'Favorite' });

        await user.keyboard('{Enter}');
        expect(button).to.have.attribute('aria-pressed', 'true');
        expect(button).toHaveFocus();

        await user.keyboard(' ');
        expect(button).to.have.attribute('aria-pressed', 'false');
        expect(button).toHaveFocus();
      });

      it('a programmatic change to aria-pressed or loading does not activate the button', async () => {
        const handleClick = vi.fn();
        const { setProps, user } = render(
          <IconButton
            aria-label="Favorite"
            aria-pressed={false}
            loading={false}
            onClick={handleClick}
          >
            {icon}
          </IconButton>,
        );
        const button = screen.getByRole('button', { name: 'Favorite' });

        await user.tab();
        setProps({ 'aria-pressed': true });
        expect(button).to.have.attribute('aria-pressed', 'true');
        expect(button).toHaveFocus();
        expect(handleClick).toHaveBeenCalledTimes(0);

        // `loading` disables the button. Where focus goes then is a 2.4.3 gap.
        setProps({ loading: true });
        expect(handleClick).toHaveBeenCalledTimes(0);

        // Only an explicit activation runs the handler.
        setProps({ loading: false });
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('renders a native button with the correct role and name', () => {
        render(<IconButton aria-label="Delete">{icon}</IconButton>);

        expect(screen.getByRole('button', { name: 'Delete' })).to.have.tagName('button');
      });

      it('exposes the link role when rendered as an anchor', () => {
        render(
          <IconButton href="/settings" aria-label="Settings">
            {icon}
          </IconButton>,
        );

        expect(screen.getByRole('link', { name: 'Settings' })).to.have.tagName('a');
      });

      it('reflects the disabled state', () => {
        render(
          <IconButton aria-label="Delete" disabled>
            {icon}
          </IconButton>,
        );

        expect(screen.getByRole('button', { name: 'Delete' })).to.have.property('disabled', true);
      });

      it('exposes the pressed state of a toggle icon button', () => {
        render(
          <IconButton aria-label="Favorite" aria-pressed>
            {icon}
          </IconButton>,
        );

        expect(screen.getByRole('button', { name: 'Favorite' })).to.have.attribute(
          'aria-pressed',
          'true',
        );
      });

      it('names the loading progressbar after the button', () => {
        render(
          <IconButton aria-label="Save" loading>
            {icon}
          </IconButton>,
        );

        const button = screen.getByRole('button', { name: 'Save' });
        expect(within(button).getByRole('progressbar')).toHaveAccessibleName('Save');
      });
    });
  });
});
