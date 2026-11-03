import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import {
  createRenderer,
  screen,
  isJsdom,
  focusVisible,
  simulatePointerDevice,
} from '@mui/internal-test-utils';
import ToggleButton, { toggleButtonClasses as classes } from '@mui/material/ToggleButton';
import ButtonBase, { buttonBaseClasses } from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';

describe('<ToggleButton />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(<ToggleButton value="X">Hello, World!</ToggleButton>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiToggleButton',
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'size', value: 'large', styleKey: 'sizeLarge' },
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'div',
    skip: ['componentProp'],
  }));

  it('adds the `selected` class to the root element if selected={true}', () => {
    render(
      <ToggleButton data-testid="root" selected value="hello">
        Hello World
      </ToggleButton>,
    );

    expect(screen.getByTestId('root')).to.have.class(classes.selected);
  });

  describe('prop: color', () => {
    it('adds the class if color="primary"', () => {
      render(
        <ToggleButton data-testid="root" color="primary" value="hello">
          Hello World
        </ToggleButton>,
      );

      expect(screen.getByTestId('root')).to.have.class(classes.primary);
    });
  });

  it('should render a disabled button if `disabled={true}`', () => {
    render(
      <ToggleButton disabled value="hello">
        Hello World
      </ToggleButton>,
    );

    expect(screen.getByRole('button')).to.have.property('disabled', true);
  });

  it('should remain in the tab order when rendered standalone', () => {
    render(<ToggleButton value="hello">Hello World</ToggleButton>);

    expect(screen.getByRole('button')).to.have.property('tabIndex', 0);
  });

  it('can render a small button', () => {
    render(
      <ToggleButton data-testid="root" size="small" value="hello">
        Hello World
      </ToggleButton>,
    );

    const root = screen.getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).to.have.class(classes.sizeSmall);
    expect(root).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large button', () => {
    render(
      <ToggleButton data-testid="root" size="large" value="hello">
        Hello World
      </ToggleButton>,
    );

    const root = screen.getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).not.to.have.class(classes.sizeSmall);
    expect(root).to.have.class(classes.sizeLarge);
  });

  describe('prop: onChange', () => {
    it('should be called when clicked', () => {
      const handleChange = spy();

      render(
        <ToggleButton value="1" onChange={handleChange}>
          Hello
        </ToggleButton>,
      );

      screen.getByRole('button').click();

      expect(handleChange.callCount).to.equal(1);
    });

    it('should be called with the button value', () => {
      const handleChange = spy();

      render(
        <ToggleButton value="1" onChange={handleChange}>
          Hello
        </ToggleButton>,
      );

      screen.getByRole('button').click();

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('1');
    });

    it('should not be called if the click is prevented', () => {
      const handleChange = spy();

      render(
        <ToggleButton
          value="one"
          onChange={handleChange}
          onClick={(event) => event.preventDefault()}
        >
          Hello
        </ToggleButton>,
      );

      screen.getByRole('button').click();

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describe('prop: nativeButton', () => {
    it('forwards nativeButton={false} to ButtonBase with a custom component', () => {
      const CustomSpan = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <ToggleButton component={CustomSpan} value="one" nativeButton={false}>
          One
        </ToggleButton>,
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
    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the toggle', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">Before</button>
          <ToggleButton value="x" disableRipple>
            Middle
          </ToggleButton>
          <button type="button">After</button>
        </React.Fragment>,
      );

      await user.tab();
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: 'Middle' })).toHaveFocus();

      // Tab moves focus back out of the toggle — it is never captured.
      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

      // Shift+Tab moves back onto it.
      await user.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'Middle' })).toHaveFocus();
    });

    describe('2.4.3 Focus Order', () => {
      it('is a single tab stop in natural DOM order with no positive tabIndex', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">Before</button>
            <ToggleButton value="x" disableRipple>
              Middle
            </ToggleButton>
            <button type="button">After</button>
          </React.Fragment>,
        );
        expect(screen.getByRole('button', { name: 'Middle' })).to.have.property('tabIndex', 0);

        await user.tab();
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'Middle' })).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      });

      it('removes a disabled toggle from the tab order', async () => {
        const { user } = render(
          <React.Fragment>
            <ToggleButton value="x" disableRipple disabled>
              Disabled
            </ToggleButton>
            <button type="button">After</button>
          </React.Fragment>,
        );

        // Tab skips the disabled toggle and lands on the next control.
        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      });
    });

    // `:focus-visible` is only reliable in a real browser, so this runs there (not jsdom).
    it.skipIf(isJsdom())(
      '2.4.7 Focus Visible: disableRipple removes the only focus indicator',
      () => {
        render(
          <ToggleButton value="x" disableRipple>
            Toggle
          </ToggleButton>,
        );
        const button = screen.getByRole('button');

        simulatePointerDevice();
        focusVisible(button);

        // Keyboard focus is detected, but `disableRipple` leaves no ripple — the only
        // focus style the component provides.
        expect(button).to.have.class(buttonBaseClasses.focusVisible);
        expect(button.querySelector('.MuiTouchRipple-root')).to.equal(null);
      },
    );

    it('2.5.2 Pointer Cancellation: activates on click, but not when released off the target', async () => {
      const handleChange = spy();
      const { user } = render(
        <React.Fragment>
          <ToggleButton value="x" onChange={handleChange} disableRipple>
            Pointer cancellation
          </ToggleButton>
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const button = screen.getByRole('button', { name: 'Pointer cancellation' });

      // Press on the toggle, move away, then release: nothing runs on the down event,
      // and releasing off the target cancels the activation.
      await user.pointer([
        { keys: '[MouseLeft>]', target: button },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(handleChange.callCount).to.equal(0);

      // A full click — press and release over the target — activates.
      await user.click(button);
      expect(handleChange.callCount).to.equal(1);
    });

    it('2.5.3 Label in Name: the accessible name contains the visible label', () => {
      render(
        <ToggleButton value="bold" aria-label="Bold formatting">
          Bold
        </ToggleButton>,
      );

      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-label')).to.contain(button.textContent);
    });

    it('3.2.1 On Focus: moving keyboard focus to the toggle does not activate it', async () => {
      const handleChange = spy();
      const { user } = render(
        <ToggleButton value="x" onChange={handleChange} disableRipple>
          On focus
        </ToggleButton>,
      );

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
      // Focus alone changes no context.
      expect(handleChange.callCount).to.equal(0);
    });

    it('3.2.2 On Input: the pressed state changes only from explicit activation', async () => {
      const handleChange = spy();
      const { user } = render(
        <ToggleButton value="x" onChange={handleChange} selected disableRipple>
          Pressed
        </ToggleButton>,
      );

      // Rendering in the pressed state does not activate the toggle on its own.
      expect(handleChange.callCount).to.equal(0);

      // The change is surfaced only when the user explicitly activates it.
      await user.click(screen.getByRole('button', { name: 'Pressed' }));
      expect(handleChange.callCount).to.equal(1);
    });

    it('4.1.2 Name, Role, Value: reflects the selected state as aria-pressed', async () => {
      function ControlledToggle() {
        const [selected, setSelected] = React.useState(false);
        return (
          <ToggleButton
            value="bold"
            selected={selected}
            onChange={() => setSelected((prev) => !prev)}
            disableRipple
          >
            Bold
          </ToggleButton>
        );
      }
      const { user } = render(<ControlledToggle />);
      const button = screen.getByRole('button');
      expect(button).to.have.attribute('aria-pressed', 'false');

      await user.click(button);
      expect(button).to.have.attribute('aria-pressed', 'true');
    });
  });

  describe.skipIf(!isJsdom())('server-side', () => {
    it('should server-side render', () => {
      const { container } = renderToString(<ToggleButton value="hello">Hello World</ToggleButton>);
      expect(container.firstChild).to.have.text('Hello World');
    });
  });
});
