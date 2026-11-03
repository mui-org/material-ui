import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen, isJsdom } from '@mui/internal-test-utils';
import AccordionSummary, {
  accordionSummaryClasses as classes,
} from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import ButtonBase from '@mui/material/ButtonBase';
import SvgIcon from '@mui/material/SvgIcon';
import describeConformance from '../../test/describeConformance';

const CustomButtonBase = React.forwardRef(({ focusVisible, ...props }, ref) => (
  <ButtonBase ref={ref} {...props} />
));

describe('<AccordionSummary />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionSummary expandIcon="expand" />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiAccordionSummary',
    testVariantProps: { disabled: true },
    testDeepOverrides: { slotName: 'content', slotClassName: classes.content },
    slots: {
      root: {
        expectedClassName: classes.root,
        testWithElement: CustomButtonBase,
      },
      content: {
        expectedClassName: classes.content,
      },
      expandIconWrapper: {
        expectedClassName: classes.expandIconWrapper,
      },
    },
  }));

  it('renders the children inside the .content element', () => {
    const { container } = render(<AccordionSummary>The Summary</AccordionSummary>);

    expect(container.querySelector(`.${classes.content}`)).to.have.text('The Summary');
  });

  it('when disabled should have disabled class', () => {
    render(
      <Accordion disabled>
        <AccordionSummary />
      </Accordion>,
    );

    expect(screen.getByRole('button')).to.have.class(classes.disabled);
  });

  it('renders the content given in expandIcon prop inside the div.expandIconWrapper', () => {
    const { container } = render(<AccordionSummary expandIcon="iconElementContentExample" />);

    const expandIconWrapper = container.querySelector(`.${classes.expandIconWrapper}`);
    expect(expandIconWrapper).to.have.text('iconElementContentExample');
  });

  it('when expanded adds the expanded class to the button and .expandIconWrapper', () => {
    const { container } = render(
      <Accordion expanded>
        <AccordionSummary expandIcon="expand" />
      </Accordion>,
    );

    const button = screen.getByRole('button');
    expect(button).to.have.class(classes.expanded);
    expect(button).to.have.attribute('aria-expanded', 'true');
    expect(container.querySelector(`.${classes.expandIconWrapper}`)).to.have.class(
      classes.expanded,
    );
  });

  it('should fire onBlur when the button blurs', () => {
    const handleBlur = spy();
    render(<AccordionSummary onBlur={handleBlur} />);
    const button = screen.getByRole('button');

    act(() => {
      button.focus();
      button.blur();
    });

    expect(handleBlur.callCount).to.equal(1);
  });

  it('should fire onClick callbacks', () => {
    const handleClick = spy();
    render(<AccordionSummary onClick={handleClick} />);

    screen.getByRole('button').click();

    expect(handleClick.callCount).to.equal(1);
  });

  it('fires onChange of the Accordion if clicked', () => {
    const handleChange = spy();

    render(
      <Accordion onChange={handleChange} expanded={false}>
        <AccordionSummary />
      </Accordion>,
    );

    act(() => {
      screen.getByRole('button').click();
    });

    expect(handleChange.callCount).to.equal(1);
  });

  it.skipIf(isJsdom())('inherits the font of its parent', () => {
    render(
      <div style={{ fontFamily: 'cursive', fontSize: '20px', lineHeight: '30px' }}>
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
        </Accordion>
      </div>,
    );

    expect(screen.getByRole('button')).toHaveComputedStyle({
      fontFamily: 'cursive',
      fontSize: '20px',
      lineHeight: '30px',
    });
  });

  describe('prop: nativeButton', () => {
    it('forwards nativeButton={false} through useSlot to ButtonBase', () => {
      const CustomSpan = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Accordion>
          <AccordionSummary component={CustomSpan} nativeButton={false} />
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      expect(summary).to.have.tagName('SPAN');
      expect(summary).to.have.attribute('aria-expanded', 'false');
      expect(summary).not.to.have.attribute('type');

      // Proves nativeButton={false} was forwarded — without it, ButtonBase
      // would warn about a non-button host with nativeButton omitted.
      expect(errorSpy.mock.calls.length).to.equal(0);
      errorSpy.mockRestore();
    });
  });

  describe('WCAG 2.2 conformance', () => {
    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the summary', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">Before</button>
          <Accordion>
            <AccordionSummary>Summary</AccordionSummary>
          </Accordion>
          <button type="button">After</button>
        </React.Fragment>,
      );

      await user.tab();
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: 'Summary' })).toHaveFocus();

      // Tab moves focus back out of the summary — it is never captured.
      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

      // Shift+Tab moves back onto it.
      await user.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'Summary' })).toHaveFocus();
    });

    describe('2.4.3 Focus Order', () => {
      it('is a single tab stop in natural DOM order with no positive tabIndex', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">Before</button>
            <Accordion>
              <AccordionSummary>Summary</AccordionSummary>
            </Accordion>
            <button type="button">After</button>
          </React.Fragment>,
        );
        expect(screen.getByRole('button', { name: 'Summary' })).to.have.property('tabIndex', 0);

        await user.tab();
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'Summary' })).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      });

      it('removes a disabled summary from the tab order', async () => {
        const { user } = render(
          <React.Fragment>
            <Accordion disabled>
              <AccordionSummary>Disabled</AccordionSummary>
            </Accordion>
            <button type="button">After</button>
          </React.Fragment>,
        );

        // Tab skips the disabled summary and lands on the next control.
        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      });
    });

    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())(
      '2.4.7 Focus Visible: applies the focus-visible state on keyboard focus',
      function test() {
        const handleFocusVisible = spy();
        render(<AccordionSummary onFocusVisible={handleFocusVisible} />);
        // simulate pointer device
        fireEvent.mouseDown(document.body);

        // this doesn't actually apply focus like in the browser. we need to move focus manually
        fireEvent.keyDown(document.body, { key: 'Tab' });
        act(() => {
          screen.getByRole('button').focus();
        });

        expect(handleFocusVisible.callCount).to.equal(1);
      },
    );

    it('2.5.2 Pointer Cancellation: activates on click, but not when released off the target', async () => {
      const handleChange = spy();
      const { user } = render(
        <React.Fragment>
          <Accordion onChange={handleChange} expanded={false}>
            <AccordionSummary>Summary</AccordionSummary>
          </Accordion>
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const button = screen.getByRole('button');

      // Press on the summary, move away, then release: nothing runs on the down
      // event, and releasing off the target cancels the activation.
      await user.pointer([
        { keys: '[MouseLeft>]', target: button },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(handleChange.callCount).to.equal(0);

      // A full click — press and release over the target — toggles the accordion.
      await user.click(button);
      expect(handleChange.callCount).to.equal(1);
    });

    it('3.2.1 On Focus: moving keyboard focus to the summary does not toggle it', async () => {
      const handleChange = spy();
      const { user } = render(
        <Accordion onChange={handleChange} expanded={false}>
          <AccordionSummary>Summary</AccordionSummary>
        </Accordion>,
      );

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
      // Focus alone changes no context.
      expect(handleChange.callCount).to.equal(0);
    });

    it('3.2.2 On Input: the panel toggles only from explicit activation, never on its own', async () => {
      const handleChange = spy();
      const { user } = render(
        <Accordion onChange={handleChange} expanded={false}>
          <AccordionSummary>Summary</AccordionSummary>
        </Accordion>,
      );

      // Rendering the summary and its aria-expanded state toggles nothing on its own.
      expect(handleChange.callCount).to.equal(0);

      // The panel toggles only when the user explicitly activates the summary.
      await user.click(screen.getByRole('button'));
      expect(handleChange.callCount).to.equal(1);
    });

    it('2.5.3 Label in Name: the accessible name is the visible label', () => {
      render(
        <Accordion>
          <AccordionSummary
            expandIcon={
              <SvgIcon>
                <path d="M0 0h24v24H0z" />
              </SvgIcon>
            }
          >
            Billing details
          </AccordionSummary>
        </Accordion>,
      );

      // An SvgIcon expandIcon is aria-hidden by default, so the name is exactly
      // the visible text. getByRole with `name` only resolves on an exact match.
      expect(screen.getByRole('button', { name: 'Billing details' })).not.to.equal(null);
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('exposes the button role with its accessible name', () => {
        render(
          <Accordion>
            <AccordionSummary>Shipping</AccordionSummary>
          </Accordion>,
        );

        expect(screen.getByRole('button', { name: 'Shipping' })).to.have.tagName('button');
      });

      it('reflects the open state through aria-expanded', async () => {
        const { user } = render(
          <Accordion>
            <AccordionSummary>Shipping</AccordionSummary>
          </Accordion>,
        );
        const summary = screen.getByRole('button');
        expect(summary).to.have.attribute('aria-expanded', 'false');

        await user.click(summary);
        expect(summary).to.have.attribute('aria-expanded', 'true');
      });
    });
  });
});
