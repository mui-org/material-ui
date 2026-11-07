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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

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

  // JSDOM does no layout, so the one-line heights are only measurable in a real
  // browser. The content is 1.75em tall whatever the font family, so these are
  // the minimums rather than anything font-dependent.
  it.skipIf(isJsdom())('keeps the one-line height of each extended size', () => {
    render(
      <React.Fragment>
        <Fab variant="extended" data-testid="large">
          Save
        </Fab>
        <Fab variant="extended" size="medium" data-testid="medium">
          Save
        </Fab>
        <Fab variant="extended" size="small" data-testid="small">
          Save
        </Fab>
      </React.Fragment>,
    );

    expect(screen.getByTestId('large').getBoundingClientRect().height).to.equal(48);
    expect(screen.getByTestId('medium').getBoundingClientRect().height).to.equal(40);
    expect(screen.getByTestId('small').getBoundingClientRect().height).to.equal(34);
  });

  it.skipIf(isJsdom())('does not stretch to fill a flex parent', () => {
    render(
      <div style={{ display: 'flex', height: 160 }}>
        <Fab variant="extended">Save</Fab>
      </div>,
    );

    expect(screen.getByRole('button').getBoundingClientRect().height).to.equal(48);
  });

  // JSDOM does no layout, so the overflow this guards against is only visible
  // in a real browser.
  it.skipIf(isJsdom())('keeps a wrapping label inside the extended button', () => {
    render(
      <div style={{ width: 120 }}>
        <Fab variant="extended">
          <span data-testid="label">Create new deployment</span>
        </Fab>
      </div>,
    );

    const fab = screen.getByRole('button').getBoundingClientRect();
    const label = screen.getByTestId('label').getBoundingClientRect();

    // The button grew past its one-line height, so the label wrapped.
    expect(fab.height).to.be.greaterThan(48);
    expect(label.top).to.be.at.least(fab.top);
    expect(label.bottom).to.be.at.most(fab.bottom);
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
});
