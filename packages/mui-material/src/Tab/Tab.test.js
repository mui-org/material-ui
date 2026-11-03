import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import {
  createRenderer,
  simulatePointerDevice,
  focusVisible,
  screen,
  isJsdom,
} from '@mui/internal-test-utils';
import Tab, { tabClasses as classes } from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<Tab />', () => {
  const { render } = createRenderer();

  describeConformance(<Tab textColor="inherit" />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render: (node) => {
      // `Tab` must be a direct child of `Tabs`, which injects state into its children via
      // `cloneElement`. Some conformance tests wrap the element(s) in a provider (e.g.
      // `ThemeProvider`), so we slot `Tabs` *inside* the wrapper around the `Tab`s. Otherwise
      // `Tabs` would clone the provider with `Tab`-internal props (`fullWidth`, `indicator`, …),
      // tripping the provider's `exactProp` check under React 18.
      // TODO: React 19 dropped runtime propType/`exactProp` validation, so once we stop testing
      // React 18 this can revert to rendering `node` directly: `<Tabs value={0}>{node}</Tabs>`.
      const isWrapped = node.type !== Tab;
      const tabs = <Tabs value={0}>{isWrapped ? node.props.children : node}</Tabs>;
      const { container, ...other } = render(
        isWrapped ? React.cloneElement(node, undefined, tabs) : tabs,
      );

      return {
        container: container.firstChild.firstChild.firstChild,
        ...other,
      };
    },
    muiName: 'MuiTab',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('should have a ripple', async () => {
    const { container } = render(
      <Tabs value={0}>
        <Tab value={0} TouchRippleProps={{ className: 'touch-ripple' }} />
      </Tabs>,
    );
    await ripple.startTouch(container.querySelector('button'));
    expect(container.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple', async () => {
    const { container } = render(
      <Tabs value={0}>
        <Tab value={0} disableRipple TouchRippleProps={{ className: 'touch-ripple' }} />
      </Tabs>,
    );

    await ripple.startTouch(container.querySelector('button'));
    expect(container.querySelector('.touch-ripple')).to.equal(null);
  });

  // JSDOM doesn't support :focus-visible
  it.skipIf(isJsdom())('should have a focusRipple', async function test() {
    const { container } = render(
      <Tabs value={0}>
        <Tab value={0} TouchRippleProps={{ classes: { ripplePulsate: 'focus-ripple' } }} />
      </Tabs>,
    );
    simulatePointerDevice();

    await ripple.startFocus(container.querySelector('button'));

    expect(container.querySelector('.focus-ripple')).not.to.equal(null);
  });

  it('can disable the focusRipple', async () => {
    const { container } = render(
      <Tabs value={0}>
        <Tab
          value={0}
          disableFocusRipple
          TouchRippleProps={{ classes: { ripplePulsate: 'focus-ripple' } }}
        />
      </Tabs>,
    );
    simulatePointerDevice();

    await ripple.startFocus(container.querySelector('button'));

    expect(container.querySelector('.focus-ripple')).to.equal(null);
  });

  describe('prop: selected', () => {
    it('should render with the selected and root classes', () => {
      render(
        <Tabs value={0} textColor="secondary">
          <Tab value={0} />
        </Tabs>,
      );

      const tab = screen.getByRole('tab');
      expect(tab).to.have.class(classes.root);
      expect(tab).to.have.class(classes.selected);
      expect(tab).to.have.class(classes.textColorSecondary);
      expect(tab).to.have.attribute('aria-selected', 'true');
    });
  });

  describe('prop: disabled', () => {
    it('should render with the disabled and root classes', () => {
      render(
        <Tabs value={0} textColor="secondary">
          <Tab value={0} disabled />
        </Tabs>,
      );

      const tab = screen.getByRole('tab');
      expect(tab).to.have.class(classes.root);
      expect(tab).to.have.class(classes.disabled);
      expect(tab).to.have.class(classes.textColorSecondary);
    });
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      render(
        <Tabs value={0}>
          <Tab value={0} onClick={handleClick} />
        </Tabs>,
      );

      screen.getByRole('tab').click();

      expect(handleClick.callCount).to.equal(1);
    });
  });

  describe('prop: onFocus', () => {
    it('should be called once when focus is triggered', async () => {
      const handleFocus = spy();
      const { user } = render(
        <Tabs value={0}>
          <Tab value={0} onFocus={handleFocus} />
        </Tabs>,
      );

      await user.tab();

      expect(handleFocus.callCount).to.equal(1);
    });
  });

  describe('prop: label', () => {
    it('should render label', () => {
      render(
        <Tabs value={0}>
          <Tab value={0} label="foo" />
        </Tabs>,
      );

      expect(screen.getByRole('tab')).to.have.text('foo');
    });
  });

  describe('prop: wrapped', () => {
    it('should add the wrapped class', () => {
      render(
        <Tabs value={0}>
          <Tab value={0} wrapped />
        </Tabs>,
      );

      expect(screen.getByRole('tab')).to.have.class(classes.wrapped);
    });
  });

  describe('prop: icon', () => {
    it('should render icon element', () => {
      render(
        <Tabs value={0}>
          <Tab value={0} icon={<div data-testid="icon" />} />
        </Tabs>,
      );

      expect(screen.getByTestId('icon')).not.to.equal(null);
    });

    it('should add a classname when passed together with label', () => {
      render(
        <Tabs value={0}>
          <Tab value={0} icon={<div className="test-icon" />} label="foo" />
        </Tabs>,
      );
      const wrapper = screen.getByRole('tab').children[0];
      expect(wrapper).to.have.class(classes.icon);
      expect(wrapper).to.have.class('test-icon');
    });

    it('should have bottom margin when passed together with label', () => {
      render(
        <Tabs value={0}>
          <Tab value={0} icon={<div />} label="foo" />
        </Tabs>,
      );
      const wrapper = screen.getByRole('tab').children[0];
      expect(wrapper).toHaveComputedStyle({ marginBottom: '6px' });
    });
  });

  describe('prop: textColor', () => {
    it('should support the inherit value', () => {
      render(
        <Tabs value={0} textColor="inherit">
          <Tab value={0} />
        </Tabs>,
      );

      const tab = screen.getByRole('tab');
      expect(tab).to.have.class(classes.selected);
      expect(tab).to.have.class(classes.textColorInherit);
      expect(tab).to.have.class(classes.root);
    });
  });

  describe('prop: fullWidth', () => {
    it('should have the fullWidth class', () => {
      render(
        <Tabs value={0} variant="fullWidth">
          <Tab value={0} />
        </Tabs>,
      );

      expect(screen.getByRole('tab')).to.have.class(classes.fullWidth);
    });
  });

  describe('prop: style', () => {
    it('should be able to override everything', () => {
      render(
        <Tabs value={0} variant="fullWidth">
          <Tab value={0} style={{ width: '80%', color: 'red', alignText: 'center' }} />
        </Tabs>,
      );

      const { style } = screen.getByRole('tab');
      expect(style).to.have.property('width', '80%');
      expect(style).to.have.property('color', 'red');
      expect(style).to.have.property('alignText', 'center');
    });
  });

  it.skipIf(isJsdom())('should apply icon styles from theme', function test() {
    const theme = createTheme({
      components: {
        MuiTab: {
          styleOverrides: {
            icon: {
              backgroundColor: 'rgb(0, 0, 255)',
            },
          },
        },
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <Tabs value={0}>
          <Tab value={0} icon={<div>hello</div>} label="icon" />
        </Tabs>
      </ThemeProvider>,
    );

    const icon = screen.getByRole('tab').querySelector(`.${classes.icon}`);
    expect(icon).toHaveComputedStyle({
      backgroundColor: 'rgb(0, 0, 255)',
    });
  });

  describe('prop: nativeButton', () => {
    it('forwards nativeButton={false} and preserves role="tab" over pseudo-button role', () => {
      const CustomSpan = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Tabs value={0}>
          <Tab value={0} component={CustomSpan} nativeButton={false} />
        </Tabs>,
      );

      const tab = screen.getByRole('tab');
      expect(tab).to.have.tagName('SPAN');
      expect(tab).to.have.attribute('role', 'tab');
      expect(tab).not.to.have.attribute('type');

      // Proves nativeButton={false} was forwarded — without it, ButtonBase
      // would warn about a non-button host with nativeButton omitted.
      expect(errorSpy.mock.calls.length).to.equal(0);
      errorSpy.mockRestore();
    });
  });

  describe('theme.focusVisible', () => {
    it.skipIf(isJsdom())('insets the focus ring so a Tabs scroller cannot clip it', () => {
      const theme = createTheme({
        focusVisible: true,
        components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
      });
      render(
        <ThemeProvider theme={theme}>
          <Tabs value={0}>
            <Tab label="One" />
          </Tabs>
        </ThemeProvider>,
      );
      const tab = screen.getByRole('tab');
      simulatePointerDevice();
      focusVisible(tab);
      // Tab insets deeper than the default mirror (offset 3 → −3 × the 2px outlineOffset).
      expect(tab).toHaveComputedStyle({ outlineOffset: '-6px' });
    });

    it.skipIf(isJsdom())('insets a user box-shadow automatically on clip-prone components', () => {
      const theme = createTheme({
        focusVisible: { boxShadow: '0 0 0 3px rgb(255, 0, 0)' },
        components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
      });
      render(
        <ThemeProvider theme={theme}>
          <Tabs value={0}>
            <Tab label="One" />
          </Tabs>
        </ThemeProvider>,
      );
      const tab = screen.getByRole('tab');
      simulatePointerDevice();
      focusVisible(tab);
      expect(window.getComputedStyle(tab).boxShadow).to.match(/inset/);
    });
  });
});
