import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Switch, { switchClasses as classes } from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import describeConformance from '../../test/describeConformance';

describe('<Switch />', () => {
  const { render } = createRenderer();

  function CustomSwitchBase({
    centerRipple,
    focusRipple,
    ownerState,
    internalDisabledThemeFocusVisible,
    ...props
  }) {
    return <div data-testid="custom" {...props} />;
  }

  describeConformance(<Switch />, () => ({
    classes,
    render,
    muiName: 'MuiSwitch',
    testDeepOverrides: [
      { slotName: 'track', slotClassName: classes.track },
      { slotName: 'input', slotClassName: classes.input },
    ],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      track: {
        expectedClassName: classes.track,
      },
      thumb: {
        expectedClassName: classes.thumb,
      },
      switchBase: {
        expectedClassName: classes.switchBase,
        testWithElement: CustomSwitchBase,
      },
      input: {
        expectedClassName: classes.input,
      },
    },
    refInstanceof: window.HTMLSpanElement,
    skip: [
      'componentProp',
      'themeDefaultProps',
      'themeVariants',
      // Props are spread to the root's child but className is added to the root
      // We cannot use the standard mergeClassName test which relies on data-testid on the root
      // We should fix this when refactoring with Base UI
      'mergeClassName',
    ],
  }));

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
    });
  });

  it.skipIf(isJsdom())('disables CSS transitions when reduced motion is always', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Switch />
      </ThemeProvider>,
    );

    expect(container.querySelector(`.${classes.switchBase}`)).toHaveComputedStyle({
      transitionDuration: '0s',
    });
    expect(container.querySelector(`.${classes.track}`)).toHaveComputedStyle({
      transitionDuration: '0s',
    });
  });

  it('should render an .thumb element inside the .switchBase element', () => {
    const { container } = render(
      <Switch classes={{ thumb: 'thumb', switchBase: 'switch-base' }} />,
    );

    expect(container.querySelector('.switch-base .thumb')).not.to.equal(null);
  });

  it('should render the track as the 2nd child', () => {
    const {
      container: { firstChild: root },
    } = render(<Switch />);

    expect(root.childNodes[1]).to.have.property('tagName', 'SPAN');
    expect(root.childNodes[1]).to.have.class(classes.track);
  });

  it('preserves `role="switch"` when input slotProps are provided as an object', () => {
    render(<Switch slotProps={{ input: { 'aria-label': 'Dark mode' } }} />);

    expect(screen.getByRole('switch', { name: 'Dark mode' })).to.have.property('checked', false);
  });

  it('preserves `role="switch"` when input slotProps are provided as a function', () => {
    render(<Switch slotProps={{ input: () => ({ 'aria-label': 'Dark mode' }) }} />);

    expect(screen.getByRole('switch', { name: 'Dark mode' })).to.have.property('checked', false);
  });

  it('the switch can be readonly', () => {
    render(<Switch readOnly />);

    expect(screen.getByRole('switch')).to.have.property('readOnly', true);
  });

  it('renders a custom icon when provided', () => {
    render(<Switch icon={<span data-testid="icon" />} />);

    expect(screen.getByTestId('icon')).toBeVisible();
  });

  it('renders a custom checked icon when provided', () => {
    render(<Switch defaultChecked checkedIcon={<span data-testid="icon" />} />);

    expect(screen.getByTestId('icon')).toBeVisible();
  });

  it('should not show warnings when custom `type` is provided', () => {
    expect(() => render(<Switch type="submit" />)).not.toErrorDev();
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        render(
          <FormControl>
            <Switch />
          </FormControl>,
        );

        expect(screen.getByRole('switch')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl>
            <Switch disabled />
          </FormControl>,
        );

        expect(screen.getByRole('switch')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        render(
          <FormControl disabled>
            <Switch />
          </FormControl>,
        );

        expect(screen.getByRole('switch')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl disabled>
            <Switch disabled={false} />
          </FormControl>,
        );

        expect(screen.getByRole('switch')).not.to.have.attribute('disabled');
      });
    });
  });

  describe('mergeClassName', () => {
    it('should merge the className', () => {
      const { container } = render(<Switch className="test-class-name" />);

      expect(container.firstChild).to.have.class('test-class-name');
    });
  });

  describe('WCAG 2.2 conformance', () => {
    it('2.1.1 Keyboard: toggles the checked state with the Space key', async () => {
      const handleChange = spy();
      const { user } = render(<Switch onChange={handleChange} />);
      const switchControl = screen.getByRole('switch');

      await user.tab();
      expect(switchControl).toHaveFocus();

      await user.keyboard('[Space]');
      expect(switchControl).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);

      await user.keyboard('[Space]');
      expect(switchControl).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(2);
    });

    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the switch', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">Before</button>
          <Switch />
          <button type="button">After</button>
        </React.Fragment>,
      );

      await user.tab();
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('switch')).toHaveFocus();

      // Tab moves focus back out of the switch — it is never captured.
      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

      // Shift+Tab moves back onto it.
      await user.tab({ shift: true });
      expect(screen.getByRole('switch')).toHaveFocus();
    });

    describe('2.4.3 Focus Order', () => {
      it('is a single tab stop in natural DOM order with no positive tabIndex', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">Before</button>
            <Switch />
            <button type="button">After</button>
          </React.Fragment>,
        );
        expect(screen.getByRole('switch')).to.have.property('tabIndex', 0);

        await user.tab();
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('switch')).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      });

      it('removes a disabled switch from the tab order', async () => {
        const { user } = render(
          <React.Fragment>
            <Switch disabled />
            <button type="button">After</button>
          </React.Fragment>,
        );

        // Tab skips the disabled switch and lands on the next control.
        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      });
    });

    it('2.5.2 Pointer Cancellation: activates on click, but not when released off the target', async () => {
      const handleChange = spy();
      const { user } = render(
        <React.Fragment>
          <Switch onChange={handleChange} />
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const switchControl = screen.getByRole('switch');

      // Press on the switch, move away, then release: nothing runs on the down
      // event, and releasing off the target cancels the activation.
      await user.pointer([
        { keys: '[MouseLeft>]', target: switchControl },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(switchControl).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);

      // A full click — press and release over the target — activates.
      await user.click(switchControl);
      expect(switchControl).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);
    });

    it('2.5.3 Label in Name: the accessible name contains the visible label', () => {
      render(<FormControlLabel control={<Switch />} label="Dark mode" />);
      // getByRole with `name` only resolves if the accessible name matches the visible label.
      expect(screen.getByRole('switch', { name: 'Dark mode' })).to.have.property('checked', false);
    });

    it('3.2.1 On Focus: moving keyboard focus to the switch does not change its state', async () => {
      const handleChange = spy();
      const { user } = render(<Switch onChange={handleChange} />);
      const switchControl = screen.getByRole('switch');

      await user.tab();

      expect(switchControl).toHaveFocus();
      // Focus alone changes no context.
      expect(switchControl).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);
    });

    it('3.2.2 On Input: state changes only from explicit activation, never on its own', async () => {
      const handleChange = spy();
      const { user } = render(<Switch onChange={handleChange} />);
      const switchControl = screen.getByRole('switch');

      // Rendering does not toggle the switch on its own.
      expect(switchControl).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);

      // Toggling flips the value and fires onChange; per WCAG a value change is not a change of context.
      await user.click(switchControl);
      expect(switchControl).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('exposes role="switch" and the unchecked state by default', () => {
        render(<Switch />);
        expect(screen.getByRole('switch')).to.have.property('checked', false);
      });

      it('reflects the checked state', () => {
        render(<Switch defaultChecked />);
        expect(screen.getByRole('switch')).to.have.property('checked', true);
      });

      it('reflects the disabled state', () => {
        render(<Switch disabled />);
        expect(screen.getByRole('switch')).to.have.property('disabled', true);
      });
    });
  });
});
