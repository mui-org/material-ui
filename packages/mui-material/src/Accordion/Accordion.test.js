import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import { spy } from 'sinon';
import { createRenderer, fireEvent, isJsdom, reactMajor, screen } from '@mui/internal-test-utils';
import Accordion, { accordionClasses as classes } from '@mui/material/Accordion';
import Paper from '@mui/material/Paper';
import Collapse, { collapseClasses } from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import Zoom from '@mui/material/Zoom';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

function NoTransition(props) {
  const { children, in: inProp } = props;

  if (!inProp) {
    return null;
  }
  return children;
}

const CustomPaper = React.forwardRef(({ square, ...props }, ref) => <Paper ref={ref} {...props} />);

describe('<Accordion />', () => {
  const { clock, render } = createRenderer();

  const minimalChildren = [<AccordionSummary key="header">Header</AccordionSummary>];

  describeConformance(<Accordion>{minimalChildren}</Accordion>, () => ({
    classes,
    inheritComponent: Paper,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordion',
    testVariantProps: { variant: 'rounded' },
    slots: {
      transition: {
        testWithElement: null,
      },
      heading: {
        testWithElement: 'h4',
        expectedClassName: classes.heading,
      },
      root: {
        expectedClassName: classes.root,
        testWithElement: CustomPaper,
      },
      region: {
        expectedClassName: classes.region,
        testWithElement: 'div',
      },
    },
  }));

  it('should render and not be controlled', () => {
    const { container } = render(<Accordion>{minimalChildren}</Accordion>);
    expect(container.firstChild).not.to.have.class(classes.expanded);
  });

  it('should handle defaultExpanded prop', () => {
    const { container } = render(<Accordion defaultExpanded>{minimalChildren}</Accordion>);
    expect(container.firstChild).to.have.class(classes.expanded);
  });

  it('should render the summary and collapse elements', () => {
    render(
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
        <div id="panel-content">Hello</div>
      </Accordion>,
    );

    expect(screen.getByText('Summary')).toBeVisible();
    expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'false');
  });

  it('should be controlled', () => {
    const { container, setProps } = render(
      <Accordion expanded slots={{ transition: NoTransition }}>
        {minimalChildren}
      </Accordion>,
    );
    const panel = container.firstChild;
    expect(panel).to.have.class(classes.expanded);
    setProps({ expanded: false });
    expect(panel).not.to.have.class(classes.expanded);
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();

    render(
      <Accordion onChange={handleChange} slots={{ transition: NoTransition }}>
        {minimalChildren}
      </Accordion>,
    );

    fireEvent.click(screen.getByText('Header'));
    expect(handleChange.callCount).to.equal(1);
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();

    render(
      <Accordion onChange={handleChange} expanded>
        {minimalChildren}
      </Accordion>,
    );

    fireEvent.click(screen.getByText('Header'));
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(false);
  });

  it('when undefined onChange and controlled should not call the onChange', () => {
    const handleChange = spy();
    const { setProps } = render(
      <Accordion onChange={handleChange} expanded>
        {minimalChildren}
      </Accordion>,
    );
    setProps({ onChange: undefined });
    fireEvent.click(screen.getByText('Header'));
    expect(handleChange.callCount).to.equal(0);
  });

  it('when disabled should have the disabled class', () => {
    const { container } = render(<Accordion disabled>{minimalChildren}</Accordion>);
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  it('should handle the slots.transition prop', () => {
    function NoTransitionCollapse(props) {
      return props.in ? <div>{props.children}</div> : null;
    }
    NoTransitionCollapse.propTypes = {
      children: PropTypes.node,
      in: PropTypes.bool,
    };

    function CustomContent() {
      return <div>Hello</div>;
    }
    const { setProps } = render(
      <Accordion expanded slots={{ transition: NoTransitionCollapse }}>
        <AccordionSummary />
        <CustomContent />
      </Accordion>,
    );

    // Collapse is initially shown
    expect(screen.getByText('Hello')).toBeVisible();

    // Hide the collapse
    setProps({ expanded: false });
    expect(screen.queryByText('Hello')).to.equal(null);
  });

  describe('reduced motion', () => {
    clock.withFakeTimers();

    it('expands on the next task when reduced motion is always', () => {
      const handleEntered = vi.fn();
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      function Test(props) {
        return (
          <ThemeProvider theme={theme}>
            <Accordion
              expanded={props.expanded}
              slotProps={{ transition: { onEntered: handleEntered } }}
            >
              <AccordionSummary>Summary</AccordionSummary>
              <div>Hello</div>
            </Accordion>
          </ThemeProvider>
        );
      }

      const { setProps } = render(<Test expanded={false} />);

      setProps({ expanded: true });

      expect(handleEntered).toHaveBeenCalledTimes(0);
      clock.tick(0);
      expect(handleEntered).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Hello')).not.to.equal(null);
    });

    it('does not leak disablePrefersReducedMotion to the transition DOM node', () => {
      const { container } = render(
        <Accordion expanded slotProps={{ transition: { disablePrefersReducedMotion: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <div>Hello</div>
        </Accordion>,
      );

      expect(container.querySelector('[disablePrefersReducedMotion]')).to.equal(null);
    });

    it('allows transition slot props to opt out of reduced motion', () => {
      const handleEntered = vi.fn();
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      function Test(props) {
        return (
          <ThemeProvider theme={theme}>
            <Accordion
              expanded={props.expanded}
              slotProps={{
                transition: {
                  disablePrefersReducedMotion: true,
                  onEntered: handleEntered,
                  timeout: 250,
                },
              }}
            >
              <AccordionSummary>Summary</AccordionSummary>
              <div>Hello</div>
            </Accordion>
          </ThemeProvider>
        );
      }

      const { setProps } = render(<Test expanded={false} />);

      setProps({ expanded: true });

      expect(handleEntered).toHaveBeenCalledTimes(0);
      clock.tick(0);
      expect(handleEntered).toHaveBeenCalledTimes(0);

      clock.tick(250);

      expect(handleEntered).toHaveBeenCalledTimes(1);
    });

    it.skipIf(isJsdom())('disables Accordion CSS transitions when reduced motion is always', () => {
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Accordion expanded>
            <AccordionSummary expandIcon={<span>+</span>}>Summary</AccordionSummary>
            <div>Hello</div>
          </Accordion>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        transitionDuration: '0s',
      });
      expect(screen.getByRole('button')).toHaveComputedStyle({
        transitionDuration: '0s',
      });
      expect(container.querySelector(`.${accordionSummaryClasses.content}`)).toHaveComputedStyle({
        transitionDuration: '0s',
      });
      expect(
        container.querySelector(`.${accordionSummaryClasses.expandIconWrapper}`),
      ).toHaveComputedStyle({
        transitionDuration: '0s',
      });
    });
  });

  it('should handle the `square` prop', () => {
    const { container } = render(<Accordion square>{minimalChildren}</Accordion>);
    expect(container.firstChild).not.toHaveComputedStyle({
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    });
  });

  it('when `square` prop is passed, it should not have the rounded class', () => {
    const { container } = render(<Accordion square>{minimalChildren}</Accordion>);
    expect(container.firstChild).not.to.have.class(classes.rounded);
  });

  describe('prop: children', () => {
    describe.skipIf(reactMajor >= 19)('first child', () => {
      beforeEach(() => {
        PropTypes.resetWarningCache();
      });

      it('requires at least one child', () => {
        expect(() => {
          PropTypes.checkPropTypes(
            Accordion.propTypes,
            { classes: {}, children: [] },
            'prop',
            'MockedName',
          );
        }).toErrorDev(['MUI: Expected the first child']);
      });

      it('needs a valid element as the first child', () => {
        expect(() => {
          PropTypes.checkPropTypes(
            Accordion.propTypes,
            {
              classes: {},
              // eslint-disable-next-line react/jsx-no-useless-fragment
              children: <React.Fragment />,
            },
            'prop',
            'MockedName',
          );
        }).toErrorDev(["MUI: The Accordion doesn't accept a Fragment"]);
      });
    });

    it('should accept empty content', () => {
      render(
        <Accordion>
          <AccordionSummary />
          {null}
        </Accordion>,
      );
    });
  });

  it('should warn when switching from controlled to uncontrolled', () => {
    const { setProps } = render(
      <Accordion expanded slots={{ transition: NoTransition }}>
        {minimalChildren}
      </Accordion>,
    );

    expect(() => setProps({ expanded: undefined })).to.toErrorDev(
      'MUI: A component is changing the controlled expanded state of Accordion to be uncontrolled.',
    );
  });

  it('should warn when switching between uncontrolled to controlled', () => {
    const { setProps } = render(
      <Accordion slots={{ transition: NoTransition }}>{minimalChildren}</Accordion>,
    );

    expect(() => setProps({ expanded: true })).toErrorDev(
      'MUI: A component is changing the uncontrolled expanded state of Accordion to be controlled.',
    );
  });

  describe('slotProps.transition', () => {
    it('should apply properties to the Transition component', () => {
      render(
        <Accordion slotProps={{ transition: { 'data-testid': 'transition-testid' } }}>
          {minimalChildren}
        </Accordion>,
      );

      expect(screen.getByTestId('transition-testid')).not.to.equal(null);
    });
  });

  describe('details unmounting behavior', () => {
    it('does not unmount by default', () => {
      render(
        <Accordion expanded={false}>
          <AccordionSummary>Summary</AccordionSummary>
          <div data-testid="details">Details</div>
        </Accordion>,
      );

      expect(screen.queryByTestId('details')).not.to.equal(null);
    });

    it('unmounts if opted in via slotProps.transition', () => {
      render(
        <Accordion expanded={false} slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <div data-testid="details">Details</div>
        </Accordion>,
      );

      expect(screen.queryByTestId('details')).to.equal(null);
    });
  });

  describe('should not forward ownerState prop to the underlying DOM element when using transition slot', () => {
    const transitions = [
      {
        component: Collapse,
        name: 'Collapse',
      },
      {
        component: Fade,
        name: 'Fade',
      },
      {
        component: Grow,
        name: 'Grow',
      },
      {
        component: Slide,
        name: 'Slide',
      },
      {
        component: Zoom,
        name: 'Zoom',
      },
    ];

    transitions.forEach((transition) => {
      it(`${transition.name}`, () => {
        render(
          <Accordion
            defaultExpanded
            slots={{
              transition: transition.component,
            }}
            slotProps={{ transition: { timeout: 400 } }}
          >
            <AccordionSummary>Summary</AccordionSummary>
            Details
          </Accordion>,
        );

        expect(screen.getByRole('region')).not.to.have.attribute('ownerstate');
      });
    });
  });

  it('should allow custom role for region slot via slotProps', () => {
    render(
      <Accordion expanded slotProps={{ region: { role: 'list', 'data-testid': 'region-slot' } }}>
        <AccordionSummary>Summary</AccordionSummary>
        Details
      </Accordion>,
    );

    expect(screen.getByTestId('region-slot')).to.have.attribute('role', 'list');
  });

  describe('WCAG 2.2 conformance', () => {
    it('2.4.3 Focus Order: a collapsed panel is hidden, removing its content from the tab order', () => {
      const { container } = render(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          Details
        </Accordion>,
      );

      // Collapse applies its `hidden` class (visibility: hidden) when fully
      // collapsed, so the panel and any focusable content it holds leave the
      // tab order until the accordion is expanded.
      expect(container.querySelector(`.${collapseClasses.hidden}`)).not.to.equal(null);
    });

    it('2.5.2 Pointer Cancellation: toggles on release, not on press', async () => {
      const handleChange = spy();
      const { user } = render(
        <React.Fragment>
          <Accordion onChange={handleChange}>
            <AccordionSummary>Summary</AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const summary = screen.getByRole('button');

      // Pressing and releasing away from the summary cancels the activation.
      await user.pointer([
        { keys: '[MouseLeft>]', target: summary },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(handleChange.callCount).to.equal(0);

      await user.click(summary);
      expect(handleChange.callCount).to.equal(1);
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('exposes the open state on the summary and names the panel region', async () => {
        const { user } = render(
          <Accordion>
            <AccordionSummary id="panel-header" aria-controls="panel-content">
              Summary
            </AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>,
        );
        const summary = screen.getByRole('button');
        expect(summary).to.have.attribute('aria-expanded', 'false');

        await user.click(summary);

        expect(summary).to.have.attribute('aria-expanded', 'true');
        // The panel is a region named by the summary that controls it.
        expect(screen.getByRole('region', { name: 'Summary' })).not.to.equal(null);
      });
    });
  });
});
