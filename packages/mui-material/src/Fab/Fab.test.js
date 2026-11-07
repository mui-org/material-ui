import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import {
  createRenderer,
  screen,
  isJsdom,
  focusVisible,
  simulatePointerDevice,
} from '@mui/internal-test-utils';
import Fab, { fabClasses as classes } from '@mui/material/Fab';
import ButtonBase, { touchRippleClasses } from '@mui/material/ButtonBase';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';
import { contrastRatio, WCAG_MINIMUM_RATIO, WCAG_NON_TEXT_RATIO } from '../../test/contrast';
import { FAILING_PALETTE_COLORS, PALETTE_CONTRAST_COLORS } from '../../test/contrastContract';

describe('<Fab />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(<Fab>Conformance?</Fab>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiFab',
    testVariantProps: { variant: 'extended' },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    refInstanceof: window.HTMLButtonElement,
  }));

  it('should render with the root class but no others', () => {
    render(<Fab>Fab</Fab>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.primary);
    expect(button).not.to.have.class(classes.secondary);
    expect(button).not.to.have.class(classes.extended);
    expect(button).not.to.have.class(classes.focusVisible);
    expect(button).not.to.have.class(classes.disabled);
    expect(button).not.to.have.class(classes.colorInherit);
    expect(button).not.to.have.class(classes.fullWidth);
    expect(button).not.to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeMedium);
  });

  it('should render an extended floating action button', () => {
    render(<Fab variant="extended">Fab</Fab>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.extended);
  });

  it('should render a primary floating action button', () => {
    render(<Fab color="primary">Fab</Fab>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.primary);
    expect(button).not.to.have.class(classes.secondary);
  });

  it('should render a secondary floating action button', () => {
    render(<Fab color="secondary">Fab</Fab>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.primary);
    expect(button).to.have.class(classes.secondary);
  });
  ['info', 'error', 'warning', 'success'].forEach((color) => {
    it(`should render a ${color} floating action button`, () => {
      render(<Fab color={color}>Fab</Fab>);
      const button = screen.getByRole('button');

      expect(button).to.have.class(classes.root);
      expect(button).not.to.have.class(classes.primary);
      expect(button).to.have.class(classes[color]);
    });
  });

  it('should render a small floating action button', () => {
    render(<Fab size="small">Fab</Fab>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.sizeSmall);
    expect(button).not.to.have.class(classes.sizeMedium);
  });

  it('should render a medium floating action button', () => {
    render(<Fab size="medium">Fab</Fab>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).not.to.have.class(classes.sizeSmall);
    expect(button).to.have.class(classes.sizeMedium);
  });

  it('should have a ripple', async () => {
    const { container } = render(<Fab>Fab</Fab>);
    await ripple.startTouch(screen.getByRole('button'));
    expect(container.querySelector(`.${touchRippleClasses.root}`)).not.to.equal(null);
  });

  it('should pass disableRipple to ButtonBase', async () => {
    const { container } = render(<Fab disableRipple>Fab</Fab>);
    await ripple.startTouch(screen.getByRole('button'));
    expect(container.querySelector(`.${touchRippleClasses.root}`)).to.equal(null);
  });

  // JSDOM doesn't support :focus-visible
  it.skipIf(isJsdom())('should have a focusRipple', async function test() {
    render(
      <Fab
        TouchRippleProps={{
          classes: { ripplePulsate: 'pulsate-focus-visible' },
        }}
      >
        Fab
      </Fab>,
    );

    const button = screen.getByRole('button');

    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).not.to.equal(null);
  });

  it('should pass disableFocusRipple to ButtonBase', async () => {
    render(
      <Fab
        TouchRippleProps={{
          classes: { ripplePulsate: 'pulsate-focus-visible' },
        }}
        disableFocusRipple
      >
        Fab
      </Fab>,
    );

    const button = screen.getByRole('button');

    await ripple.startFocus(button);

    expect(button.querySelector('.pulsate-focus-visible')).to.equal(null);
  });

  it('should pass disabled class to ButtonBase', () => {
    const disabledClassName = 'testDisabledClassName';
    const { container } = render(<Fab disabled classes={{ disabled: disabledClassName }} />);

    expect(container.querySelector('button')).to.have.class(disabledClassName);
  });

  it('does not pass classes.root to ButtonBase classes', () => {
    render(<Fab classes={{ root: 'my-root-class' }}>Fab</Fab>);
    const button = screen.getByRole('button');
    const classList = button.className.split(' ');
    expect(classList.filter((c) => c === 'my-root-class')).to.have.length(1);
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon data-testid="icon" className={childClassName} />;
    render(<Fab>{iconChild}</Fab>);
    const renderedIconChild = screen.getByTestId('icon');

    expect(renderedIconChild).not.to.equal(null);
    expect(renderedIconChild).to.have.class(childClassName);
  });

  describe('prop: nativeButton', () => {
    it('forwards nativeButton={false} to ButtonBase with a custom component', () => {
      const CustomSpan = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Fab component={CustomSpan} nativeButton={false}>
          Fab
        </Fab>,
      );

      const fab = screen.getByRole('button');
      expect(fab).to.have.tagName('SPAN');
      expect(fab).not.to.have.attribute('type');

      // Proves nativeButton={false} was forwarded — without it, ButtonBase
      // would warn about a non-button host with nativeButton omitted.
      expect(errorSpy.mock.calls.length).to.equal(0);
      errorSpy.mockRestore();
    });
  });

  describe.skipIf(!isJsdom())('server-side', () => {
    it('should server-side render', () => {
      const { container } = renderToString(<Fab>Fab</Fab>);
      expect(container.firstChild).to.have.text('Fab');
    });
  });

  describe('theme.focusVisible', () => {
    // The effective box-shadow is the last matching rule in source order (equal specificity here).
    // Read it from the CSSOM rather than getComputedStyle, which returns a mid-transition value.
    function effectiveBoxShadow(el) {
      let shadow = '';
      for (const sheet of Array.from(document.styleSheets)) {
        let rules;
        try {
          rules = sheet.cssRules;
        } catch {
          continue;
        }
        for (const rule of Array.from(rules)) {
          if (!rule.style || !rule.style.boxShadow || !rule.selectorText) {
            continue;
          }
          const matches = rule.selectorText.split(',').some((selector) => {
            try {
              return el.matches(selector.trim());
            } catch {
              return false;
            }
          });
          if (matches) {
            shadow = rule.style.boxShadow;
          }
        }
      }
      return shadow;
    }

    it.skipIf(isJsdom())('a user box-shadow wins over the focus elevation', () => {
      render(
        <ThemeProvider
          theme={createTheme({
            focusVisible: { boxShadow: '0 0 0 4px rgb(255, 0, 0)' },
            components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
          })}
        >
          <Fab>Fab</Fab>
        </ThemeProvider>,
      );
      const fab = screen.getByRole('button');
      simulatePointerDevice();
      focusVisible(fab);
      expect(fab).to.have.class(classes.focusVisible);
      expect(effectiveBoxShadow(fab)).to.contain('rgb(255, 0, 0)');
    });
  });

  describe('WCAG 2.2 conformance', () => {
    const icon = (
      <SvgIcon data-testid="icon">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
      </SvgIcon>
    );

    /** The rendered foreground and fill of each palette color, as an exact ratio. */
    function renderPaletteFabs(props, children) {
      render(
        <React.Fragment>
          {PALETTE_CONTRAST_COLORS.map((color) => (
            <Fab key={color} color={color} aria-label={color} {...props}>
              {children ?? color}
            </Fab>
          ))}
        </React.Fragment>,
      );
      return PALETTE_CONTRAST_COLORS.map((color) => {
        const { color: foreground, backgroundColor } = window.getComputedStyle(
          screen.getByRole('button', { name: color }),
        );
        return { color, ratio: contrastRatio(foreground, backgroundColor) };
      });
    }

    describe('1.1.1 Non-text Content', () => {
      it('names an icon-only Fab from its aria-label', () => {
        render(<Fab aria-label="Add">{icon}</Fab>);

        expect(screen.getByRole('button')).toHaveAccessibleName('Add');
      });

      it('hides the decorative icon from assistive technology', () => {
        render(<Fab aria-label="Add">{icon}</Fab>);

        expect(screen.getByTestId('icon')).to.have.attribute('aria-hidden', 'true');
      });
    });

    it('1.4.3 Contrast (Minimum): only the documented palette colors fall short of 4.5:1', () => {
      const failing = renderPaletteFabs({ variant: 'extended' })
        .filter(({ ratio }) => ratio < WCAG_MINIMUM_RATIO.normalText)
        .map(({ color }) => color);

      // The extended label is `contrastText` on `main`, like a contained Button. The
      // contract lists colors that fail in either direction; both agree while
      // `contrastText` and `background.paper` are both white.
      expect(failing).to.deep.equal([...FAILING_PALETTE_COLORS]);
    });

    it('1.4.11 Non-text Contrast: the icon reaches 3:1 against the fill in each palette color at rest', () => {
      // `SvgIcon` paints with `currentColor`, the color of the Fab.
      renderPaletteFabs({}, icon).forEach(({ color, ratio }) => {
        expect(ratio).to.be.at.least(WCAG_NON_TEXT_RATIO, color);
      });
    });

    it('2.1.1 Keyboard: Enter and Space activate the Fab', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <Fab aria-label="Add" onClick={handleClick}>
          {icon}
        </Fab>,
      );

      await user.tab();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the Fab', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">Before</button>
          <Fab aria-label="Middle">{icon}</Fab>
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
        render(<Fab aria-label="Add">{icon}</Fab>);

        expect(screen.getByRole('button')).to.have.property('tabIndex', 0);
      });

      it('removes a disabled Fab from the tab order', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">Before</button>
            <Fab aria-label="Skipped" disabled>
              {icon}
            </Fab>
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
    });

    it('2.5.2 Pointer Cancellation: activates on click, but not when released off the target', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <React.Fragment>
          <Fab aria-label="Add" onClick={handleClick}>
            {icon}
          </Fab>
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const fab = screen.getByRole('button', { name: 'Add' });

      // Press on the Fab, move away, then release: nothing runs.
      await user.pointer([
        { keys: '[MouseLeft>]', target: fab },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(handleClick).toHaveBeenCalledTimes(0);

      await user.click(fab);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('2.5.3 Label in Name: an extended Fab takes its name from the visible text', () => {
      render(
        <Fab variant="extended">
          {icon}
          Navigate
        </Fab>,
      );

      expect(screen.getByRole('button')).toHaveAccessibleName('Navigate');
    });

    it('3.2.1 On Focus: moving keyboard focus to the Fab does not activate it', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <Fab aria-label="Add" onClick={handleClick}>
          {icon}
        </Fab>,
      );

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    describe('3.2.2 On Input', () => {
      it('a toggle activated with Enter changes aria-pressed and keeps focus', async () => {
        function ToggleFab() {
          const [pressed, setPressed] = React.useState(false);
          return (
            <Fab
              aria-label="Favorite"
              aria-pressed={pressed}
              onClick={() => setPressed((previous) => !previous)}
            >
              {icon}
            </Fab>
          );
        }
        const { user } = render(<ToggleFab />);
        const fab = screen.getByRole('button', { name: 'Favorite' });

        await user.tab();
        expect(fab).to.have.attribute('aria-pressed', 'false');

        await user.keyboard('{Enter}');
        expect(fab).to.have.attribute('aria-pressed', 'true');
        expect(fab).toHaveFocus();

        await user.keyboard('{Enter}');
        expect(fab).to.have.attribute('aria-pressed', 'false');
        expect(fab).toHaveFocus();
      });

      it('a change of aria-pressed from the parent does not run onClick', async () => {
        const handleClick = vi.fn();
        const { rerender, user } = render(
          <Fab aria-label="Favorite" onClick={handleClick} aria-pressed={false}>
            {icon}
          </Fab>,
        );
        await user.tab();
        const fab = screen.getByRole('button');

        rerender(
          <Fab aria-label="Favorite" onClick={handleClick} aria-pressed>
            {icon}
          </Fab>,
        );
        expect(fab).to.have.attribute('aria-pressed', 'true');
        expect(fab).toHaveFocus();
        expect(handleClick).toHaveBeenCalledTimes(0);
      });
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('renders a native button with the correct role and name', () => {
        render(<Fab aria-label="Add">{icon}</Fab>);

        expect(screen.getByRole('button', { name: 'Add' })).to.have.tagName('button');
      });

      it('exposes the link role when rendered as an anchor', () => {
        render(
          <Fab href="/compose" aria-label="Compose">
            {icon}
          </Fab>,
        );

        expect(screen.getByRole('link', { name: 'Compose' })).to.have.tagName('a');
      });

      it('reflects the disabled state', () => {
        render(
          <Fab aria-label="Add" disabled>
            {icon}
          </Fab>,
        );

        expect(screen.getByRole('button', { name: 'Add' })).to.have.property('disabled', true);
      });

      it('exposes the pressed state of a toggle Fab', () => {
        render(
          <Fab aria-label="Favorite" aria-pressed>
            {icon}
          </Fab>,
        );

        expect(screen.getByRole('button', { name: 'Favorite', pressed: true })).not.to.equal(null);
      });
    });
  });
});
