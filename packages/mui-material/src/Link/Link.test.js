import { describe, it, expect } from 'vitest';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link, { linkClasses as classes } from '@mui/material/Link';
import Typography, { typographyClasses } from '@mui/material/Typography';
import describeConformance from '../../test/describeConformance';

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
});
