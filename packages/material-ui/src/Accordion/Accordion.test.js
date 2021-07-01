import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformanceV5, createClientRender, fireEvent } from 'test/utils';
import Accordion, { accordionClasses as classes } from '@material-ui/core/Accordion';
import Paper from '@material-ui/core/Paper';
import AccordionSummary from '@material-ui/core/AccordionSummary';

describe('<Accordion />', () => {
  const render = createClientRender();

  const minimalChildren = [<AccordionSummary key="header">Header</AccordionSummary>];

  describeConformanceV5(<Accordion>{minimalChildren}</Accordion>, () => ({
    classes,
    inheritComponent: Paper,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordion',
    testVariantProps: { variant: 'rounded' },
    skip: ['componentProp', 'componentsProp'],
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
    const { getByRole, getByText } = render(
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
        <div id="panel-content">Hello</div>
      </Accordion>,
    );
    expect(getByText('Summary')).toBeVisible();
    expect(getByRole('button')).to.have.attribute('aria-expanded', 'false');
  });

  it('should be controlled', () => {
    const { container, setProps } = render(<Accordion expanded>{minimalChildren}</Accordion>);
    const panel = container.firstChild;
    expect(panel).to.have.class(classes.expanded);
    setProps({ expanded: false });
    expect(panel).not.to.have.class(classes.expanded);
  });

  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const { getByText } = render(<Accordion onChange={handleChange}>{minimalChildren}</Accordion>);
    fireEvent.click(getByText('Header'));
    expect(handleChange.callCount).to.equal(1);
  });

  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const { getByText } = render(
      <Accordion onChange={handleChange} expanded>
        {minimalChildren}
      </Accordion>,
    );
    fireEvent.click(getByText('Header'));
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(false);
  });

  it('when undefined onChange and controlled should not call the onChange', () => {
    const handleChange = spy();
    const { setProps, getByText } = render(
      <Accordion onChange={handleChange} expanded>
        {minimalChildren}
      </Accordion>,
    );
    setProps({ onChange: undefined });
    fireEvent.click(getByText('Header'));
    expect(handleChange.callCount).to.equal(0);
  });

  it('when disabled should have the disabled class', () => {
    const { container } = render(<Accordion disabled>{minimalChildren}</Accordion>);
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  it('should handle the TransitionComponent prop', () => {
    const NoTransitionCollapse = (props) => {
      return props.in ? <div>{props.children}</div> : null;
    };
    NoTransitionCollapse.propTypes = {
      children: PropTypes.node,
      in: PropTypes.bool,
    };

    const CustomContent = () => <div>Hello</div>;
    const { queryByText, getByText, setProps } = render(
      <Accordion expanded TransitionComponent={NoTransitionCollapse}>
        <AccordionSummary />
        <CustomContent />
      </Accordion>,
    );

    // Collapse is initially shown
    expect(getByText('Hello')).toBeVisible();

    // Hide the collapse
    setProps({ expanded: false });
    expect(queryByText('Hello')).to.equal(null);
  });

  describe('prop: children', () => {
    describe('first child', () => {
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
        }).toErrorDev(['Material-UI: Expected the first child']);
      });

      it('needs a valid element as the first child', () => {
        expect(() => {
          PropTypes.checkPropTypes(
            Accordion.propTypes,
            { classes: {}, children: <React.Fragment /> },
            'prop',
            'MockedName',
          );
        }).toErrorDev(["Material-UI: The Accordion doesn't accept a Fragment"]);
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
    const wrapper = render(<Accordion expanded>{minimalChildren}</Accordion>);

    expect(() => wrapper.setProps({ expanded: undefined })).to.toErrorDev(
      'Material-UI: A component is changing the controlled expanded state of Accordion to be uncontrolled.',
    );
  });

  it('should warn when switching between uncontrolled to controlled', () => {
    const { setProps } = render(<Accordion>{minimalChildren}</Accordion>);

    expect(() => setProps({ expanded: true })).toErrorDev(
      'Material-UI: A component is changing the uncontrolled expanded state of Accordion to be controlled.',
    );
  });
});
