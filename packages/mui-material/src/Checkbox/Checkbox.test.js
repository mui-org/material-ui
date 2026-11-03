import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  screen,
  isJsdom,
  simulatePointerDevice,
  focusVisible,
} from '@mui/internal-test-utils';
import Checkbox, { checkboxClasses as classes } from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonBase, { buttonBaseClasses } from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<Checkbox />', () => {
  const { render } = createRenderer();

  function CustomRoot({ checkedIcon, ownerState, disableRipple, slots, slotProps, ...props }) {
    return <div {...props} />;
  }

  describeConformance(<Checkbox checked />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiCheckbox',
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'color', value: 'secondary', styleKey: 'colorSecondary' },
    refInstanceof: window.HTMLSpanElement,
    slots: {
      root: {
        expectedClassName: classes.root,
        testWithElement: CustomRoot,
      },
      input: {
        expectedClassName: classes.input,
      },
    },
    skip: ['componentProp', 'rootClass'],
  }));

  it('should have the classes required for Checkbox', () => {
    expect(typeof classes.root).to.equal('string');
    expect(typeof classes.checked).to.equal('string');
    expect(typeof classes.disabled).to.equal('string');
  });

  it('renders an unchecked `checkbox` by default', () => {
    render(<Checkbox />);

    expect(screen.getByRole('checkbox')).to.have.property('checked', false);
  });

  it('renders an checked `checkbox` when `checked={true}`', () => {
    render(<Checkbox checked />);

    expect(screen.getByRole('checkbox')).to.have.property('checked', true);
  });

  it('flips the checked property when clicked and calls onchange with the checked state', () => {
    const handleChange = spy();
    render(<Checkbox onChange={handleChange} />);

    act(() => {
      screen.getByRole('checkbox').click();
    });

    expect(screen.getByRole('checkbox')).to.have.property('checked', true);
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.getCall(0).args[0].target).to.have.property('checked', true);

    act(() => {
      screen.getByRole('checkbox').click();
    });

    expect(screen.getByRole('checkbox')).to.have.property('checked', false);
    expect(handleChange.callCount).to.equal(2);
    expect(handleChange.getCall(1).args[0].target).to.have.property('checked', false);
  });

  describe('prop: readOnly', () => {
    it('prevents interaction', async () => {
      const changeSpy = spy();
      const { user } = render(<Checkbox readOnly defaultChecked onChange={changeSpy} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).to.have.attribute('readonly');
      expect(checkbox).to.have.attribute('checked');
      await user.click(checkbox);
      expect(checkbox).to.have.attribute('checked');
      expect(changeSpy.callCount).to.equal(0);
    });
  });

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByTestId('IndeterminateCheckBoxIcon')).not.to.equal(null);
    });

    it('should not set aria-checked', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByRole('checkbox')).not.to.have.attribute('aria-checked');
    });

    it('should set the indeterminate property on the input', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByRole('checkbox')).to.have.property('indeterminate', true);
    });

    it('should unset the indeterminate property on the input when no longer indeterminate', () => {
      const { setProps } = render(<Checkbox indeterminate />);

      setProps({ indeterminate: false });
      expect(screen.getByRole('checkbox')).to.have.property('indeterminate', false);
    });

    it('should keep the indeterminate property on the input after a click', async () => {
      const { user } = render(<Checkbox indeterminate />);

      await user.click(screen.getByRole('checkbox'));
      expect(screen.getByRole('checkbox')).to.have.property('indeterminate', true);
    });

    it('should set the indeterminate property on the input when the input slot changes', () => {
      const CustomInput = React.forwardRef(({ ownerState, ...props }, ref) => (
        <input ref={ref} {...props} />
      ));
      const { setProps } = render(<Checkbox indeterminate />);

      setProps({ slots: { input: CustomInput } });
      expect(screen.getByRole('checkbox')).to.have.property('indeterminate', true);
    });
  });

  describe('prop: size', () => {
    it('add sizeSmall class to the root element when the size prop equals "small"', () => {
      render(<Checkbox size="small" />);
      const checkbox = screen.getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class(classes.sizeSmall);
    });

    it('add sizeMedium class to the root element when the size prop equals "medium"', () => {
      render(<Checkbox size="medium" />);
      const checkbox = screen.getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class(classes.sizeMedium);
    });

    it('add sizeMedium class to the root element when the size is not expplicitly provided', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class(classes.sizeMedium);
    });
  });

  describe('theme: customization', () => {
    it.skipIf(isJsdom())(
      'should be customizable in the theme using the size prop.',
      function test() {
        const theme = createTheme({
          components: {
            MuiCheckbox: {
              styleOverrides: {
                sizeMedium: {
                  marginTop: 40,
                  paddingLeft: 20,
                },
                sizeSmall: {
                  marginLeft: -40,
                  paddingRight: 2,
                },
              },
            },
          },
        });

        const { container } = render(
          <ThemeProvider theme={theme}>
            <Checkbox />
            <Checkbox size="small" />
          </ThemeProvider>,
        );

        expect(container.querySelector(`.${classes.sizeMedium}`)).toHaveComputedStyle({
          marginTop: '40px',
          paddingLeft: '20px',
        });

        expect(container.querySelector(`.${classes.sizeSmall}`)).toHaveComputedStyle({
          marginLeft: '-40px',
          paddingRight: '2px',
        });
      },
    );
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        render(
          <FormControl>
            <Checkbox />
          </FormControl>,
        );

        expect(screen.getByRole('checkbox')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl>
            <Checkbox disabled />
          </FormControl>,
        );

        expect(screen.getByRole('checkbox')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        render(
          <FormControl disabled>
            <Checkbox />
          </FormControl>,
        );

        expect(screen.getByRole('checkbox')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl disabled>
            <Checkbox disabled={false} />
          </FormControl>,
        );

        expect(screen.getByRole('checkbox')).not.to.have.attribute('disabled');
      });
    });
  });

  it('should allow custom icon font sizes', () => {
    const fontSizeSpy = spy();
    function MyIcon(props) {
      const { fontSize, ...other } = props;

      React.useEffect(() => {
        fontSizeSpy(fontSize);
      });

      return <div {...other} />;
    }
    render(<Checkbox icon={<MyIcon fontSize="foo" />} />);

    expect(fontSizeSpy.args[0][0]).to.equal('foo');
  });

  it('should have a ripple', async () => {
    render(<Checkbox TouchRippleProps={{ className: 'touch-ripple' }} />);
    const checkbox = screen.getByRole('checkbox').parentElement;
    await ripple.startTouch(checkbox);
    expect(checkbox.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('should not have ripple', async () => {
    render(<Checkbox disableRipple TouchRippleProps={{ className: 'touch-ripple' }} />);

    const checkbox = screen.getByRole('checkbox').parentElement;
    await ripple.startTouch(checkbox);
    expect(checkbox.querySelector('.touch-ripple')).to.equal(null);
  });

  it('should respect a global disableRipple from MuiButtonBase defaultProps', async () => {
    const theme = createTheme({
      components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
    });
    render(
      <ThemeProvider theme={theme}>
        <Checkbox TouchRippleProps={{ className: 'touch-ripple' }} />
      </ThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox').parentElement;
    await ripple.startTouch(checkbox);
    expect(checkbox.querySelector('.touch-ripple')).to.equal(null);
  });

  it('should let an explicit disableRipple={false} override a global disableRipple', async () => {
    const theme = createTheme({
      components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
    });
    render(
      <ThemeProvider theme={theme}>
        <Checkbox disableRipple={false} TouchRippleProps={{ className: 'touch-ripple' }} />
      </ThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox').parentElement;
    await ripple.startTouch(checkbox);
    expect(checkbox.querySelector('.touch-ripple')).not.to.equal(null);
  });

  // Deterministic checks for the WCAG success criteria the report rates as
  // automatable. See packages/mui-material/src/Checkbox/accessibility.md.
  describe('WCAG 2.2 conformance', () => {
    it('2.1.1 Keyboard: toggles the checked state with the Space key', async () => {
      const handleChange = spy();
      const { user } = render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.tab();
      expect(checkbox).toHaveFocus();

      await user.keyboard('[Space]');
      expect(checkbox).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);

      await user.keyboard('[Space]');
      expect(checkbox).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(2);
    });

    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the checkbox', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">before</button>
          <Checkbox />
          <button type="button">after</button>
        </React.Fragment>,
      );
      const checkbox = screen.getByRole('checkbox');

      await user.tab();
      expect(screen.getByRole('button', { name: 'before' })).toHaveFocus();

      await user.tab();
      expect(checkbox).toHaveFocus();

      // Tab moves focus back out of the checkbox; it is never captured.
      await user.tab();
      expect(screen.getByRole('button', { name: 'after' })).toHaveFocus();

      // Shift+Tab moves back onto it.
      await user.tab({ shift: true });
      expect(checkbox).toHaveFocus();
    });

    describe('2.4.3 Focus Order', () => {
      it('is a single tab stop in natural DOM order with no positive tabIndex', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">first</button>
            <Checkbox />
            <button type="button">last</button>
          </React.Fragment>,
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).to.have.property('tabIndex', 0);

        await user.tab();
        expect(screen.getByRole('button', { name: 'first' })).toHaveFocus();
        await user.tab();
        expect(checkbox).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'last' })).toHaveFocus();
      });

      it('removes a disabled checkbox from the tab order', async () => {
        const { user } = render(
          <React.Fragment>
            <Checkbox disabled />
            <button type="button">after</button>
          </React.Fragment>,
        );

        // Tab skips the disabled checkbox and lands on the next control.
        await user.tab();
        expect(screen.getByRole('button', { name: 'after' })).toHaveFocus();
      });
    });

    it('2.5.2 Pointer Cancellation: activates on click, but not when released off the target', async () => {
      const handleChange = spy();
      const { user } = render(
        <React.Fragment>
          <Checkbox onChange={handleChange} />
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const checkbox = screen.getByRole('checkbox');

      // Press on the checkbox, move away, then release: nothing runs on the down
      // event, and releasing off the target cancels the activation.
      await user.pointer([
        { keys: '[MouseLeft>]', target: checkbox },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(checkbox).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);

      // A full click (press and release over the target) activates.
      await user.click(checkbox);
      expect(checkbox).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);
    });

    it('2.5.3 Label in Name: exposes an accessible name matching the visible label', () => {
      render(<FormControlLabel control={<Checkbox />} label="Remember me" />);
      // getByRole with `name` only resolves if the accessible name matches the visible label.
      expect(screen.getByRole('checkbox', { name: 'Remember me' })).to.have.property(
        'checked',
        false,
      );
    });

    it('3.2.1 On Focus: moving keyboard focus to the checkbox does not activate it', async () => {
      const handleChange = spy();
      const { user } = render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.tab();

      expect(checkbox).toHaveFocus();
      expect(checkbox).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);
    });

    it('3.2.2 On Input: state changes only from explicit activation, never on its own', async () => {
      const handleChange = spy();
      const { user } = render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);

      // A value change is not a change of context.
      await user.click(checkbox);
      expect(checkbox).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('exposes the mixed state through the native indeterminate property', () => {
        // The `prop: indeterminate` block above covers the property lifecycle;
        // this asserts the 4.1.2 exposure: native property, no aria-checked.
        render(<Checkbox indeterminate />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).to.have.property('indeterminate', true);
        expect(checkbox).not.to.have.attribute('aria-checked');
      });

      it('exposes the checkbox role and its accessible name', () => {
        render(<FormControlLabel control={<Checkbox />} label="Subscribe" />);

        expect(screen.getByRole('checkbox', { name: 'Subscribe' })).not.to.equal(null);
      });

      it('reflects the checked state and notifies on change', async () => {
        const { user } = render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).to.have.property('checked', false);

        await user.click(checkbox);
        expect(checkbox).to.have.property('checked', true);
      });

      it('reflects the disabled state', () => {
        render(<Checkbox disabled />);

        expect(screen.getByRole('checkbox')).to.have.property('disabled', true);
      });
    });
  });

  describe('theme.focusVisible', () => {
    // `cssVariables: true` guards the shouldSkipGeneratingVar fix — the recipe must stay inline on
    // the svg. No-vars coverage is the FocusVisible/SelectionControls regression fixture.
    it.skipIf(isJsdom())('draws the focus ring on the icon svg, not the ButtonBase root', () => {
      const theme = createTheme({
        cssVariables: true,
        focusVisible: true,
        components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
      });
      render(
        <ThemeProvider theme={theme}>
          <Checkbox />
        </ThemeProvider>,
      );
      const input = screen.getByRole('checkbox');
      simulatePointerDevice();
      focusVisible(input);
      expect(input.parentElement).to.have.class(buttonBaseClasses.focusVisible);
      expect(input.parentElement.querySelector('svg')).toHaveComputedStyle({
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineOffset: '2px',
      });
      // the shared ButtonBase root ring is off, so there is no double ring
      expect(input.parentElement).toHaveComputedStyle({ outlineStyle: 'none' });
    });
  });
});
