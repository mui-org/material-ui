import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformanceV5, act, createClientRender, fireEvent } from 'test/utils';
import AccordionSummary, {
  accordionSummaryClasses as classes,
} from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import ButtonBase from '@material-ui/core/ButtonBase';

describe('<AccordionSummary />', () => {
  const render = createClientRender();

  describeConformanceV5(<AccordionSummary />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordionSummary',
    testVariantProps: { disabled: true },
    testDeepOverrides: { slotName: 'content', slotClassName: classes.content },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('renders the children inside the .content element', () => {
    const { container } = render(<AccordionSummary>The Summary</AccordionSummary>);

    expect(container.querySelector(`.${classes.content}`)).to.have.text('The Summary');
  });

  it('when disabled should have disabled class', () => {
    const { getByRole } = render(
      <Accordion disabled>
        <AccordionSummary />
      </Accordion>,
    );

    expect(getByRole('button')).to.have.class(classes.disabled);
  });

  it('renders the content given in expandIcon prop inside the div.expandIconWrapper', () => {
    const { container } = render(<AccordionSummary expandIcon="iconElementContentExample" />);

    const expandIconWrapper = container.querySelector(`.${classes.expandIconWrapper}`);
    expect(expandIconWrapper).to.have.text('iconElementContentExample');
  });

  it('when expanded adds the expanded class to the button and .expandIconWrapper', () => {
    const { container, getByRole } = render(
      <Accordion expanded>
        <AccordionSummary expandIcon="expand" />
      </Accordion>,
    );

    const button = getByRole('button');
    expect(button).to.have.class(classes.expanded);
    expect(button).to.have.attribute('aria-expanded', 'true');
    expect(container.querySelector(`.${classes.expandIconWrapper}`)).to.have.class(
      classes.expanded,
    );
  });

  it('should fire onBlur when the button blurs', () => {
    const handleBlur = spy();
    const { getByRole } = render(<AccordionSummary onBlur={handleBlur} />);

    act(() => {
      const button = getByRole('button');
      button.focus();
      button.blur();
    });

    expect(handleBlur.callCount).to.equal(1);
  });

  it('should fire onClick callbacks', () => {
    const handleClick = spy();
    const { getByRole } = render(<AccordionSummary onClick={handleClick} />);

    getByRole('button').click();

    expect(handleClick.callCount).to.equal(1);
  });

  it('fires onChange of the Accordion if clicked', () => {
    const handleChange = spy();
    const { getByRole } = render(
      <Accordion onChange={handleChange}>
        <AccordionSummary />
      </Accordion>,
    );

    act(() => {
      getByRole('button').click();
    });

    expect(handleChange.callCount).to.equal(1);
  });

  it('calls onFocusVisible if focused visibly', () => {
    const handleFocusVisible = spy();
    const { getByRole } = render(<AccordionSummary onFocusVisible={handleFocusVisible} />);
    // simulate pointer device
    fireEvent.mouseDown(document.body);

    // this doesn't actually apply focus like in the browser. we need to move focus manually
    fireEvent.keyDown(document.body, { key: 'Tab' });
    act(() => {
      getByRole('button').focus();
    });

    expect(handleFocusVisible.callCount).to.equal(1);
  });
});
