import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import { spy } from 'sinon';
import { createRenderer, isJsdom, reactMajor, screen } from '@mui/internal-test-utils';
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

function WrappedAccordionSummary(props) {
  return <AccordionSummary {...props} />;
}

describe('<Accordion />', () => {
  const { clock, render, renderToString } = createRenderer();

  describeConformance(
    <Accordion>
      <AccordionSummary>Header</AccordionSummary>
      <AccordionDetails>Details</AccordionDetails>
    </Accordion>,
    () => ({
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
    }),
  );

  it('should render and not be controlled', () => {
    const { container } = render(
      <Accordion>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.firstChild).not.to.have.class(classes.expanded);
  });

  it('should handle defaultExpanded prop', () => {
    const { container } = render(
      <Accordion defaultExpanded>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.firstChild).to.have.class(classes.expanded);
  });

  it('should render the summary and collapse elements', () => {
    render(
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
        <AccordionDetails>Hello</AccordionDetails>
      </Accordion>,
    );

    expect(screen.getByText('Summary')).toBeVisible();
    expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'false');
  });

  it('should be controlled', async () => {
    function ControlledAccordion() {
      const [expanded, setExpanded] = React.useState(true);

      return (
        <Accordion
          data-testid="accordion"
          expanded={expanded}
          onChange={(event, newExpanded) => setExpanded(newExpanded)}
          slots={{ transition: NoTransition }}
        >
          <AccordionSummary>Header</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );
    }

    const { user } = render(<ControlledAccordion />);

    expect(screen.getByTestId('accordion')).to.have.class(classes.expanded);

    await user.click(screen.getByRole('button', { name: 'Header' }));

    expect(screen.getByTestId('accordion')).not.to.have.class(classes.expanded);
    expect(screen.getByRole('button', { name: 'Header' })).to.have.attribute(
      'aria-expanded',
      'false',
    );
  });

  it('when onChange is undefined and controlled should not change expansion', async () => {
    const { user } = render(
      <Accordion data-testid="accordion" expanded>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: 'Header' }));

    expect(screen.getByTestId('accordion')).to.have.class(classes.expanded);
    expect(screen.getByRole('button', { name: 'Header' })).to.have.attribute(
      'aria-expanded',
      'true',
    );
  });

  it('when disabled should have the disabled class', () => {
    const { container } = render(
      <Accordion disabled>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  it('should handle the slots.transition prop', async () => {
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
    const { user } = render(
      <Accordion defaultExpanded slots={{ transition: NoTransitionCollapse }}>
        <AccordionSummary />
        <AccordionDetails>
          <CustomContent />
        </AccordionDetails>
      </Accordion>,
    );

    // Collapse is initially shown
    expect(screen.getByText('Hello')).toBeVisible();

    // Hide the collapse
    await user.click(screen.getByRole('button'));
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
    const { container } = render(
      <Accordion square>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.firstChild).not.toHaveComputedStyle({
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    });
  });

  it('when `square` prop is passed, it should not have the rounded class', () => {
    const { container } = render(
      <Accordion square>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );
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
          <AccordionDetails />
        </Accordion>,
      );
    });
  });

  it('should warn when switching from controlled to uncontrolled', () => {
    const { rerender } = render(
      <Accordion expanded slots={{ transition: NoTransition }}>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    expect(() =>
      rerender(
        <Accordion slots={{ transition: NoTransition }}>
          <AccordionSummary>Header</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      ),
    ).to.toErrorDev(
      'MUI: A component is changing the controlled expanded state of Accordion to be uncontrolled.',
    );
  });

  it('should warn when switching between uncontrolled to controlled', () => {
    const { rerender } = render(
      <Accordion slots={{ transition: NoTransition }}>
        <AccordionSummary>Header</AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    expect(() =>
      rerender(
        <Accordion expanded slots={{ transition: NoTransition }}>
          <AccordionSummary>Header</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      ),
    ).toErrorDev(
      'MUI: A component is changing the uncontrolled expanded state of Accordion to be controlled.',
    );
  });

  describe('slotProps.transition', () => {
    it('should apply properties to the Transition component', () => {
      render(
        <Accordion slotProps={{ transition: { 'data-testid': 'transition-testid' } }}>
          <AccordionSummary>Header</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
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
          <AccordionDetails data-testid="details">Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.queryByTestId('details')).not.to.equal(null);
    });

    it('unmounts if opted in via slotProps.transition', () => {
      render(
        <Accordion expanded={false} slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails data-testid="details">Details</AccordionDetails>
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
            <AccordionDetails>Details</AccordionDetails>
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
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>,
    );

    expect(screen.getByTestId('region-slot')).to.have.attribute('role', 'list');
  });

  describe('ARIA attributes', () => {
    it('preserves documented id and aria-controls props', () => {
      render(
        <Accordion>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(summary).to.have.attribute('id', 'panel-header');
      expect(summary).to.have.attribute('aria-controls', 'panel-content');
      expect(region).to.have.attribute('id', 'panel-content');
      expect(region).to.have.attribute('aria-labelledby', 'panel-header');
    });

    it('generates linked ids when id and aria-controls are not provided', () => {
      render(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(summary).to.have.attribute('id');
      expect(summary).to.have.attribute('aria-controls');
      expect(region).to.have.attribute('id');
      expect(region).to.have.attribute('aria-labelledby');

      expect(summary.getAttribute('id')).to.equal(region.getAttribute('aria-labelledby'));
      expect(summary.getAttribute('aria-controls')).to.equal(region.getAttribute('id'));
    });

    it('generates linked ids for a wrapped AccordionSummary', () => {
      render(
        <Accordion>
          <WrappedAccordionSummary>Summary</WrappedAccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
      expect(region).to.have.attribute('aria-labelledby', summary.getAttribute('id'));
    });

    it('keeps relationship props declared inside a wrapped AccordionSummary', () => {
      function WrappedSummaryWithRelationshipProps() {
        return (
          <AccordionSummary id="inner-summary" aria-controls="inner-region">
            Summary
          </AccordionSummary>
        );
      }

      render(
        <Accordion>
          <WrappedSummaryWithRelationshipProps />
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(region).to.have.attribute('id', 'inner-region');
      expect(summary).to.have.attribute('id', 'inner-summary');
      expect(summary).to.have.attribute('aria-controls', 'inner-region');
      expect(region).to.have.attribute('aria-labelledby', 'inner-summary');
    });

    it('pairs the region with an id declared inside a wrapper when only the id is set', () => {
      function WrappedSummaryWithId() {
        return <AccordionSummary id="inner-summary">Summary</AccordionSummary>;
      }

      render(
        <Accordion>
          <WrappedSummaryWithId />
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(region).to.have.attribute('aria-labelledby', 'inner-summary');

      expect(summary).to.have.attribute('id', 'inner-summary');
      expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
    });

    it('pairs the region with ids from a callback slotProps.root on the summary', () => {
      render(
        <Accordion>
          <AccordionSummary
            slotProps={{ root: () => ({ id: 'fn-summary', 'aria-controls': 'fn-region' }) }}
          >
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(region).to.have.attribute('id', 'fn-region');

      expect(summary).to.have.attribute('id', 'fn-summary');
      expect(summary).to.have.attribute('aria-controls', 'fn-region');
      expect(region).to.have.attribute('aria-labelledby', 'fn-summary');
    });

    it('generates unique ids for multiple accordions', () => {
      render(
        <div>
          <Accordion>
            <AccordionSummary>Summary 1</AccordionSummary>
            <AccordionDetails>Details 1</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Summary 2</AccordionSummary>
            <AccordionDetails>Details 2</AccordionDetails>
          </Accordion>
        </div>,
      );

      const [summary1, summary2] = screen.getAllByRole('button');

      expect(summary1).to.have.attribute('id');
      expect(summary1).to.have.attribute('aria-controls');
      expect(summary2).to.have.attribute('id');
      expect(summary2).to.have.attribute('aria-controls');

      expect(summary1.getAttribute('id')).not.to.equal(summary2.getAttribute('id'));
      expect(summary1.getAttribute('aria-controls')).not.to.equal(
        summary2.getAttribute('aria-controls'),
      );
    });

    describe.skipIf(!isJsdom())('server-side', () => {
      it.skipIf(reactMajor < 18)(
        'emits complete generated relationships for the documented no-id shape',
        () => {
          const { container } = renderToString(
            <Accordion>
              <AccordionSummary>Summary</AccordionSummary>
              <AccordionDetails>Details</AccordionDetails>
            </Accordion>,
          );

          const summary = container.querySelector('button');
          const region = container.querySelector('[role="region"]');

          expect(summary).to.have.attribute('id');
          expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
          expect(region).to.have.attribute('aria-labelledby', summary.getAttribute('id'));
        },
      );

      it('uses a custom region id from slotProps for a wrapped summary', () => {
        const { container } = renderToString(
          <Accordion slotProps={{ region: { id: 'custom-region' } }}>
            <WrappedAccordionSummary>Summary</WrappedAccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>,
        );

        const summary = container.querySelector('button');
        const region = container.querySelector('[role="region"]');

        expect(region).to.have.attribute('id', 'custom-region');
        expect(summary).to.have.attribute('aria-controls', 'custom-region');
      });

      it('keeps the ids supplied through slot props on both sides', () => {
        const { container } = renderToString(
          <Accordion
            slotProps={{
              region: {
                id: 'slot-region',
              },
            }}
          >
            <AccordionSummary
              slotProps={{
                root: {
                  id: 'slot-summary',
                  'aria-controls': 'slot-region',
                },
              }}
            >
              Summary
            </AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>,
        );

        const summary = container.querySelector('button');
        const region = container.querySelector('[role="region"]');

        expect(summary).to.have.attribute('id', 'slot-summary');
        expect(summary).to.have.attribute('aria-controls', 'slot-region');
        expect(region).to.have.attribute('id', 'slot-region');
        expect(region).to.have.attribute('aria-labelledby', 'slot-summary');
      });

      it('emits generated aria-controls when unmountOnExit starts expanded', () => {
        const { container } = renderToString(
          <Accordion defaultExpanded slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary>Summary</AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>,
        );

        const summary = container.querySelector('button');
        const region = container.querySelector('[role="region"]');

        expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
      });
    });

    it('uses the ids supplied through slot props', () => {
      render(
        <Accordion
          slotProps={{
            region: {
              id: 'slot-region',
            },
          }}
        >
          <AccordionSummary
            slotProps={{
              root: {
                id: 'slot-summary',
                'aria-controls': 'slot-region',
              },
            }}
          >
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(region).to.have.attribute('aria-labelledby', 'slot-summary');

      expect(summary).to.have.attribute('id', 'slot-summary');
      expect(summary).to.have.attribute('aria-controls', 'slot-region');
      expect(region).to.have.attribute('id', 'slot-region');
    });

    it('derives the relationship from an id supplied through slotProps.region alone', () => {
      render(
        <Accordion slotProps={{ region: { id: 'slot-region' } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(summary).to.have.attribute('aria-controls', 'slot-region');

      expect(region).to.have.attribute('id', 'slot-region');
      expect(region).to.have.attribute('aria-labelledby', summary.getAttribute('id'));
    });

    it('supports function slotProps without replacing the ids they supply', () => {
      render(
        <Accordion
          expanded
          slotProps={{
            region: ({ expanded: isExpanded }) => ({
              id: 'slot-region',
              className: isExpanded ? 'expanded-region' : undefined,
            }),
          }}
        >
          <AccordionSummary
            slotProps={{
              root: ({ expanded: isExpanded }) => ({
                id: 'slot-summary',
                'aria-controls': 'slot-region',
                className: isExpanded ? 'expanded-summary' : undefined,
              }),
            }}
          >
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));

      expect(summary).to.have.attribute('id', 'slot-summary');
      expect(summary).to.have.attribute('aria-controls', 'slot-region');
      expect(summary).to.have.class('expanded-summary');
      expect(region).to.have.attribute('id', 'slot-region');
      expect(region).to.have.class('expanded-region');
    });

    it('does not leak the root className onto the region for function slotProps', () => {
      render(
        <Accordion
          className="accordion-root-class"
          expanded
          slotProps={{ region: () => ({ className: 'region-class' }) }}
        >
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const region = screen.getByRole('region', { hidden: true });

      expect(region).to.have.class('region-class');
      expect(region).not.to.have.class('accordion-root-class');
    });

    it('does not emit generated aria-controls when unmountOnExit keeps the region unmounted', () => {
      render(
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByRole('button')).not.to.have.attribute('aria-controls');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('does not emit generated aria-controls when unmountOnExit comes from the theme', () => {
      const theme = createTheme({
        components: { MuiCollapse: { defaultProps: { unmountOnExit: true } } },
      });

      render(
        <ThemeProvider theme={theme}>
          <Accordion>
            <AccordionSummary>Summary</AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>
        </ThemeProvider>,
      );

      expect(screen.getByRole('button')).not.to.have.attribute('aria-controls');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('does not emit generated aria-controls when mountOnEnter comes from the theme', () => {
      const theme = createTheme({
        components: { MuiCollapse: { defaultProps: { mountOnEnter: true } } },
      });

      render(
        <ThemeProvider theme={theme}>
          <Accordion>
            <AccordionSummary>Summary</AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>
        </ThemeProvider>,
      );

      expect(screen.getByRole('button')).not.to.have.attribute('aria-controls');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('preserves provided aria-controls when unmountOnExit keeps the region unmounted', () => {
      render(
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByRole('button')).to.have.attribute('aria-controls', 'panel-content');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('emits generated aria-controls after mountOnEnter mounts the region once', async () => {
      const { user } = render(
        <Accordion slotProps={{ transition: { mountOnEnter: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');

      expect(summary).not.to.have.attribute('aria-controls');

      await user.click(summary);

      expect(summary).to.have.attribute('aria-controls');

      const ariaControls = summary.getAttribute('aria-controls');

      await user.click(summary);

      expect(summary).to.have.attribute('aria-controls', ariaControls);
    });

    it('emits generated aria-controls immediately when mountOnEnter starts expanded', () => {
      render(
        <Accordion defaultExpanded slotProps={{ transition: { mountOnEnter: true } }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByRole('region', { hidden: true });

      expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
    });

    it('does not emit generated aria-controls for a closed custom transition that returns null', () => {
      render(
        <Accordion slots={{ transition: NoTransition }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByRole('button')).not.to.have.attribute('aria-controls');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('emits generated aria-controls after a custom transition mounts the region', async () => {
      const { user } = render(
        <Accordion slots={{ transition: NoTransition }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');

      await user.click(summary);

      expect(summary).to.have.attribute('aria-controls');

      expect(summary.getAttribute('aria-controls')).to.equal(
        screen.getByRole('region').getAttribute('id'),
      );
    });

    it('removes generated aria-controls after a custom transition unmounts the region', async () => {
      const { user } = render(
        <Accordion defaultExpanded slots={{ transition: NoTransition }}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');

      expect(summary).to.have.attribute('aria-controls');

      await user.click(summary);

      expect(summary).not.to.have.attribute('aria-controls');

      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('preserves provided aria-controls with a closed custom transition that returns null', () => {
      render(
        <Accordion slots={{ transition: NoTransition }}>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Summary
          </AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByRole('button')).to.have.attribute('aria-controls', 'panel-content');
      expect(screen.queryByRole('region')).to.equal(null);
    });

    it('supports generated relationships with a ref-forwarding custom region slot', async () => {
      const CustomAccordionRegion = React.forwardRef(function CustomAccordionRegion(
        { ownerState, ...props },
        ref,
      ) {
        return <section ref={ref} {...props} />;
      });

      const regionRef = React.createRef();
      const handleRegionClick = spy();

      const { user } = render(
        <Accordion
          defaultExpanded
          slots={{ region: CustomAccordionRegion }}
          slotProps={{
            region: {
              ref: regionRef,
              className: 'custom-region',
              style: { marginTop: 1 },
              role: 'list',
              'data-testid': 'region',
              onClick: handleRegionClick,
            },
          }}
        >
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>,
      );

      const summary = screen.getByRole('button');
      const region = screen.getByTestId('region');

      expect(regionRef.current).to.equal(region);
      expect(summary).to.have.attribute('aria-controls', region.getAttribute('id'));
      expect(region).to.have.attribute('aria-labelledby', summary.getAttribute('id'));

      expect(region).to.have.tagName('SECTION');
      expect(region).to.have.class('custom-region');
      expect(region).to.have.attribute('style').that.includes('margin-top: 1px');
      expect(region).to.have.attribute('role', 'list');

      await user.click(region);

      expect(handleRegionClick.callCount).to.equal(1);
    });
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
