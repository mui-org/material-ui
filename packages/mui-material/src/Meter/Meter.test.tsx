import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { spy } from 'sinon';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Meter, { meterClasses as classes } from '@mui/material/Meter';
import describeConformance from '../../test/describeConformance';

describe('<Meter />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(<Meter value={40} label="Storage" showValue locale="en-US" />, () => ({
    classes,
    render,
    muiName: 'MuiMeter',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { color: 'secondary' },
    skip: ['componentProp'],
    slots: {
      label: { expectedClassName: classes.label },
      value: { expectedClassName: classes.value },
      track: { expectedClassName: classes.track },
      indicator: { expectedClassName: classes.indicator },
    },
  }));

  describe('accessibility', () => {
    it('renders a meter with the value range', () => {
      render(<Meter value={30} min={10} max={60} locale="en-US" />);
      const meter = screen.getByRole('meter');

      expect(meter).to.have.attribute('aria-valuenow', '30');
      expect(meter).to.have.attribute('aria-valuemin', '10');
      expect(meter).to.have.attribute('aria-valuemax', '60');
    });

    it('keeps the aria-valuetext that Base UI computes when the prop is omitted', () => {
      render(<Meter value={25} locale="en-US" />);

      expect(screen.getByRole('meter')).to.have.attribute('aria-valuetext', '25%');
    });

    it('lets aria-valuetext override the computed text', () => {
      render(<Meter value={25} aria-valuetext="A quarter" locale="en-US" />);

      expect(screen.getByRole('meter')).to.have.attribute('aria-valuetext', 'A quarter');
    });

    it('uses getAriaValueText for the accessible text', () => {
      render(
        <Meter
          value={3}
          max={4}
          locale="en-US"
          getAriaValueText={(formattedValue, value) => `${value} of 4 (${formattedValue})`}
        />,
      );

      expect(screen.getByRole('meter')).to.have.attribute('aria-valuetext', '3 of 4 (75%)');
    });

    it('names the meter with the label', () => {
      render(<Meter value={50} label="Battery" />);

      expect(screen.getByRole('meter', { name: 'Battery' })).not.to.equal(null);
      expect(screen.getByText('Battery')).to.have.class(classes.label);
    });
  });

  describe('prop: label', () => {
    it('renders no label element when not set', () => {
      const { container } = render(<Meter value={50} />);

      expect(container.querySelector(`.${classes.label}`)).to.equal(null);
    });
  });

  describe('value', () => {
    it('renders no value element by default', () => {
      const { container } = render(<Meter value={50} />);

      expect(container.querySelector(`.${classes.value}`)).to.equal(null);
    });

    it('shows the formatted value with showValue', () => {
      const { container } = render(<Meter value={50} showValue locale="en-US" />);
      const value = container.querySelector(`.${classes.value}`);

      expect(value).to.have.text('50%');
      expect(value).to.have.attribute('aria-hidden', 'true');
    });

    it('formats the value with format and locale', () => {
      const { container } = render(
        <Meter
          value={1234.5}
          max={2000}
          showValue
          locale="de-DE"
          format={{ style: 'unit', unit: 'megabyte', maximumFractionDigits: 1 }}
        />,
      );

      expect(container.querySelector(`.${classes.value}`)).to.have.text('1.234,5 MB');
    });

    it('shows the value when renderValue is set alone', () => {
      const renderValue = spy((formattedValue: string, value: number) => `${value} / 100`);
      const { container } = render(<Meter value={42} renderValue={renderValue} locale="en-US" />);

      expect(container.querySelector(`.${classes.value}`)).to.have.text('42 / 100');
      expect(renderValue.lastCall.args).to.deep.equal(['42%', 42]);
    });

    it('renders the same formatted value on the server', () => {
      const { container } = renderToString(<Meter value={75} showValue locale="en-US" />);

      expect(container.querySelector(`.${classes.value}`)).to.have.text('75%');
    });
  });

  it('sizes the indicator with the percentage of the range', () => {
    const { container } = render(<Meter value={30} min={20} max={40} />);
    const indicator = container.querySelector<HTMLElement>(`.${classes.indicator}`)!;

    expect(indicator.style.width).to.equal('50%');
  });

  it('merges slotProps style with the Base UI indicator style', () => {
    const { container } = render(
      <Meter value={30} slotProps={{ indicator: { style: { opacity: 0.5 } } }} />,
    );
    const indicator = container.querySelector<HTMLElement>(`.${classes.indicator}`)!;

    expect(indicator.style.width).to.equal('30%');
    expect(indicator.style.opacity).to.equal('0.5');
  });

  describe('prop: render', () => {
    it('replaces the root element and keeps the Material classes and Base UI attributes', () => {
      render(<Meter value={50} color="secondary" render={<section />} />);
      const meter = screen.getByRole('meter');

      expect(meter.tagName).to.equal('SECTION');
      expect(meter).to.have.class(classes.root);
      expect(meter).to.have.attribute('aria-valuenow', '50');
      expect(meter.querySelector(`.${classes.indicator}`)).not.to.equal(null);
      expect(meter).not.to.have.attribute('render');
      expect(meter).not.to.have.attribute('color');
    });

    it('calls a render function with the props and the Base UI state', () => {
      const renderSpy = spy((props: React.HTMLAttributes<HTMLElement>) => <section {...props} />);
      render(<Meter value={50} render={renderSpy} />);

      expect(screen.getByRole('meter').tagName).to.equal('SECTION');
      const [props, state] = renderSpy.lastCall.args as unknown as [
        Record<string, unknown>,
        object,
      ];
      expect(props.role).to.equal('meter');
      expect(props.className).to.include(classes.root);
      expect(state).to.be.an('object');
    });

    it('lets the render element children replace the parts', () => {
      render(
        <Meter
          value={50}
          label="Hidden"
          render={(props) => (
            <section {...props}>
              <span>Custom content</span>
            </section>
          )}
        />,
      );

      expect(screen.getByText('Custom content')).not.to.equal(null);
      expect(screen.queryByText('Hidden')).to.equal(null);
    });

    it('passes no render wiring to a custom slots.root', () => {
      const receivedProps: Record<string, unknown>[] = [];
      const CustomRoot = React.forwardRef<HTMLDivElement, Record<string, unknown>>(
        function CustomRoot(props, ref) {
          receivedProps.push(props);
          const { ownerState, ...other } = props;
          return <div ref={ref} data-testid="custom-root" {...other} />;
        },
      );
      render(<Meter value={50} render={<section />} slots={{ root: CustomRoot }} />);

      expect(screen.getByTestId('custom-root').tagName).to.equal('DIV');
      const lastProps = receivedProps[receivedProps.length - 1];
      expect(lastProps).not.to.have.property('render');
      expect(lastProps).not.to.have.property('renderState');
      expect(lastProps).not.to.have.property('component');
      expect(lastProps).not.to.have.property('as');
    });
  });

  it('ignores a component prop passed without types', () => {
    // @ts-expect-error component is not a supported prop
    render(<Meter value={50} component="section" />);

    expect(screen.getByRole('meter').tagName).to.equal('DIV');
  });

  it('puts no internal prop on the DOM', () => {
    render(
      <Meter
        value={50}
        color="success"
        label="Disk"
        showValue
        renderValue={(formattedValue) => formattedValue}
        classes={{ root: 'custom-root' }}
        locale="en-US"
        format={{ style: 'percent' }}
      />,
    );
    const meter = screen.getByRole('meter');

    expect(meter).to.have.class('custom-root');
    [
      'render',
      'classes',
      'ownerState',
      'color',
      'label',
      'showValue',
      'showvalue',
      'renderValue',
      'rendervalue',
      'locale',
      'format',
      'value',
      'min',
      'max',
    ].forEach((attribute) => {
      expect(meter).not.to.have.attribute(attribute);
    });
  });
});
