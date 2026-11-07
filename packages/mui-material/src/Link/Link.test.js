import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link, { linkClasses as classes } from '@mui/material/Link';
import Typography, { typographyClasses } from '@mui/material/Typography';
import describeConformance from '../../test/describeConformance';
import { blend, contrastRatio, WCAG_MINIMUM_RATIO } from '../../test/contrast';
import { FAILING_PALETTE_COLORS, PALETTE_CONTRAST_COLORS } from '../../test/contrastContract';

function focusVisible(element) {
  act(() => {
    element.blur();
    document.dispatchEvent(new window.Event('keydown'));
    element.focus();
  });
}

describe('<Link />', () => {
  const { render } = createRenderer();

  describeConformance(<Link href="/">Home</Link>, () => ({
    classes,
    inheritComponent: Typography,
    render,
    muiName: 'MuiLink',
    refInstanceof: window.HTMLAnchorElement,
    testVariantProps: { color: 'secondary', variant: 'h1' },
    testStateOverrides: { prop: 'underline', value: 'always', styleKey: 'underlineAlways' },
  }));

  it('should render children', () => {
    render(<Link href="/">Home</Link>);

    expect(screen.queryByText('Home')).not.to.equal(null);
  });

  it('should pass props to the <Typography> component', () => {
    const { container } = render(
      <Link href="/" variant="body2" classes={{ body2: 'link-body2' }}>
        Test
      </Link>,
    );
    expect(container.firstChild).to.have.class(typographyClasses.body2);
    expect(container.firstChild).not.to.have.class('link-body2');
  });

  it('using sx color as a function should not crash', () => {
    expect(() =>
      render(
        <Link href="/" sx={{ color: (theme) => theme.palette.primary.light }}>
          Test
        </Link>,
      ),
    ).not.to.throw();
  });

  describe('underline color', () => {
    it('using a named CSS color should not crash', () => {
      expect(() =>
        render(
          <Link href="/" color="white" underline="always">
            Test
          </Link>,
        ),
      ).not.to.throw();
    });

    it.skipIf(isJsdom())('should apply transparency to a named CSS color', () => {
      render(
        <Link href="/" color="white" underline="always">
          Test
        </Link>,
      );
      const link = screen.getByRole('link');

      expect(getComputedStyle(link).textDecorationColor).to.equal('color(srgb 1 1 1 / 0.4)');
    });

    it.skipIf(isJsdom())('should derive the underline color from the color prop', () => {
      const theme = createTheme({
        components: {
          MuiLink: {
            styleOverrides: {
              root: {
                color: '#ff5252',
              },
            },
          },
        },
      });
      render(
        <ThemeProvider theme={theme}>
          <Link href="/">Test</Link>
        </ThemeProvider>,
      );
      const link = screen.getByRole('link');

      expect(getComputedStyle(link).color).to.equal('rgb(255, 82, 82)');
      expect(getComputedStyle(link).textDecorationColor).to.equal('rgba(25, 118, 210, 0.4)');
    });
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onBlur', 'onFocus'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const { container } = render(
        <Link href="/" {...handlers}>
          Home
        </Link>,
      );
      const anchor = container.querySelector('a');

      events.forEach((n) => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        fireEvent[event](anchor);
        expect(handlers[n].callCount).to.equal(1);
      });
    });
  });

  describe('keyboard focus', () => {
    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())('should add the focusVisible class when focused', function test() {
      const { container } = render(<Link href="/">Home</Link>);
      const anchor = container.querySelector('a');

      expect(anchor).not.to.have.class(classes.focusVisible);

      focusVisible(anchor);

      expect(anchor).to.have.class(classes.focusVisible);

      act(() => {
        anchor.blur();
      });

      expect(anchor).not.to.have.class(classes.focusVisible);
    });
  });

  describe('theme.focusVisible', () => {
    it.skipIf(isJsdom())('renders the curated ring on keyboard focus when set', () => {
      const { container } = render(
        <ThemeProvider theme={createTheme({ focusVisible: true })}>
          <Link href="/">Home</Link>
        </ThemeProvider>,
      );
      const anchor = container.querySelector('a');
      focusVisible(anchor);
      expect(anchor).to.have.class(classes.focusVisible);
      expect(anchor).toHaveComputedStyle({
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineOffset: '2px',
      });
    });

    it.skipIf(isJsdom())('curated ring replaces the button variant outline: auto', () => {
      const { container } = render(
        <ThemeProvider theme={createTheme({ focusVisible: true })}>
          <Link component="button">Home</Link>
        </ThemeProvider>,
      );
      const button = container.querySelector('button');
      focusVisible(button);
      expect(button).to.have.class(classes.focusVisible);
      expect(button).toHaveComputedStyle({
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineOffset: '2px',
      });
    });
  });

  describe('WCAG 2.2 conformance', () => {
    describe('1.4.3 Contrast (Minimum)', () => {
      // `inherit` takes the color of the text around it, so it is not rated here.
      const TEXT_COLORS = ['textPrimary', 'textSecondary', 'textDisabled'];
      const COLORS = [...PALETTE_CONTRAST_COLORS, ...TEXT_COLORS];

      function renderFailingColors(theme) {
        render(
          <ThemeProvider theme={theme}>
            {COLORS.map((color) => (
              <Link key={color} href="#" color={color}>
                {color}
              </Link>
            ))}
          </ThemeProvider>,
        );

        // The link text is on the page background.
        return COLORS.filter((color) => {
          const { color: textColor } = window.getComputedStyle(
            screen.getByRole('link', { name: color }),
          );
          return (
            contrastRatio(textColor, theme.palette.background.default) <
            WCAG_MINIMUM_RATIO.normalText
          );
        });
      }

      it('only the documented colors fall short of 4.5:1 in light mode', () => {
        expect(renderFailingColors(createTheme())).to.deep.equal([
          ...FAILING_PALETTE_COLORS,
          'textDisabled',
        ]);
      });

      it('every color meets 4.5:1 in dark mode', () => {
        expect(renderFailingColors(createTheme({ palette: { mode: 'dark' } }))).to.deep.equal([]);
      });
    });

    describe('1.4.1 Use of Color', () => {
      // G183: a link without an underline needs 3:1 against the body text.
      const COLORS = [
        ...PALETTE_CONTRAST_COLORS,
        'textPrimary',
        'textSecondary',
        'textDisabled',
        'inherit',
      ];

      function renderFailingColors(theme) {
        const background = theme.palette.background.default;
        render(
          <ThemeProvider theme={theme}>
            {/* Body text as with `CssBaseline`, inline so that JSDOM resolves it. */}
            <p data-testid="body" style={{ color: theme.palette.text.primary }}>
              {COLORS.map((color) => (
                <Link key={color} href="#" color={color} underline="none">
                  {color}
                </Link>
              ))}
            </p>
          </ThemeProvider>,
        );

        // Both colors are painted on the page background.
        const body = blend(
          window.getComputedStyle(screen.getByTestId('body')).color,
          1,
          background,
        );
        return COLORS.filter((color) => {
          const link = blend(
            window.getComputedStyle(screen.getByRole('link', { name: color })).color,
            1,
            background,
          );
          return contrastRatio(link, body) < WCAG_MINIMUM_RATIO.largeText;
        });
      }

      it('only the documented colors fall short of 3:1 against body text in light mode', () => {
        expect(renderFailingColors(createTheme())).to.deep.equal([
          'secondary',
          'textPrimary',
          'textSecondary',
          'inherit',
        ]);
      });

      it('only the documented colors fall short of 3:1 against body text in dark mode', () => {
        expect(renderFailingColors(createTheme({ palette: { mode: 'dark' } }))).to.deep.equal([
          'primary',
          'secondary',
          'info',
          'success',
          'warning',
          'textPrimary',
          'textSecondary',
          'inherit',
        ]);
      });
    });

    // JSDOM doesn't expand the text-decoration shorthand
    it.skipIf(isJsdom())(
      '1.4.1 Use of Color: the default link is underlined, so it does not rely on color',
      () => {
        render(<Link href="#">Settings</Link>);

        expect(window.getComputedStyle(screen.getByRole('link')).textDecorationLine).to.equal(
          'underline',
        );
      },
    );

    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())(
      '2.4.7 Focus Visible: a button link shows the browser outline on keyboard focus',
      () => {
        render(<Link component="button">Show more</Link>);
        const button = screen.getByRole('button');

        expect(button).toHaveComputedStyle({ outlineStyle: 'none' });
        focusVisible(button);
        expect(button).to.have.class(classes.focusVisible);
        expect(button).toHaveComputedStyle({ outlineStyle: 'auto' });
      },
    );

    describe('2.1.1 Keyboard', () => {
      it('activates an href link with Enter', async () => {
        const handleClick = spy((event) => event.preventDefault());
        const { user } = render(
          <Link href="#target" onClick={handleClick}>
            Settings
          </Link>,
        );

        await user.tab();
        await user.keyboard('{Enter}');
        expect(handleClick.callCount).to.equal(1);
      });

      it('activates a button link with Enter and Space', async () => {
        const handleClick = spy();
        const { user } = render(
          <Link component="button" onClick={handleClick}>
            Show more
          </Link>,
        );

        await user.tab();
        await user.keyboard('{Enter}');
        await user.keyboard(' ');
        expect(handleClick.callCount).to.equal(2);
      });
    });

    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the link', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">Before</button>
          <Link href="#">Middle</Link>
          <button type="button">After</button>
        </React.Fragment>,
      );

      await user.tab();
      await user.tab();
      expect(screen.getByRole('link', { name: 'Middle' })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

      await user.tab({ shift: true });
      await user.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
    });

    describe('2.4.3 Focus Order', () => {
      it('is a single tab stop in DOM order', async () => {
        const { user } = render(
          <React.Fragment>
            <Link href="#one">One</Link>
            <Link href="#two">Two</Link>
          </React.Fragment>,
        );

        await user.tab();
        expect(screen.getByRole('link', { name: 'One' })).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('link', { name: 'Two' })).toHaveFocus();
      });

      it('is not a tab stop without href, like a native anchor', async () => {
        const { user } = render(
          <React.Fragment>
            <Link>No destination</Link>
            <button type="button">After</button>
          </React.Fragment>,
        );

        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      });
    });

    it('2.5.2 Pointer Cancellation: activates on click, but not when released off the target', async () => {
      const handleClick = spy((event) => event.preventDefault());
      const { user } = render(
        <React.Fragment>
          <Link href="#target" onClick={handleClick}>
            Settings
          </Link>
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const link = screen.getByRole('link', { name: 'Settings' });

      await user.pointer([
        { keys: '[MouseLeft>]', target: link },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(handleClick.callCount).to.equal(0);

      await user.click(link);
      expect(handleClick.callCount).to.equal(1);
    });

    it('2.5.3 Label in Name: the accessible name is the visible text', () => {
      render(<Link href="#">Account settings</Link>);

      expect(screen.getByRole('link')).toHaveAccessibleName('Account settings');
    });

    it('3.2.1 On Focus: moving keyboard focus to the link does not activate it', async () => {
      const handleClick = spy();
      const { user } = render(
        <Link href="#" onClick={handleClick}>
          Settings
        </Link>,
      );

      await user.tab();
      expect(screen.getByRole('link')).toHaveFocus();
      expect(handleClick.callCount).to.equal(0);
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('has the link role with href', () => {
        render(<Link href="/settings">Settings</Link>);

        expect(screen.getByRole('link', { name: 'Settings' })).to.have.tagName('a');
      });

      it('has the button role with component="button"', () => {
        render(<Link component="button">Show more</Link>);

        expect(screen.getByRole('button', { name: 'Show more' })).to.have.tagName('button');
      });
    });
  });
});
