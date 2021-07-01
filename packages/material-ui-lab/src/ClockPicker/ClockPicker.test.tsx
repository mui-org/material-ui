import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  describeConformanceV5,
  fireEvent,
  fireTouchChangedEvent,
  screen,
  within,
} from 'test/utils';
import ClockPicker, { clockPickerClasses as classes } from '@material-ui/lab/ClockPicker';
import {
  adapterToUse,
  wrapPickerMount,
  createPickerRender,
  getByMuiTest,
} from '../internal/pickers/test-utils';

describe('<ClockPicker />', () => {
  const render = createPickerRender();

  describeConformanceV5(
    <ClockPicker date={adapterToUse.date()} showViewSwitcher onChange={() => {}} />,
    () => ({
      classes,
      inheritComponent: 'div',
      wrapMount: wrapPickerMount,
      render,
      refInstanceof: window.HTMLDivElement,
      muiName: 'MuiClockPicker',
      skip: [
        'componentProp',
        'componentsProp',
        'propsSpread',
        'reactTestRenderer',
        // TODO: fix ClockPicker to spread props to root
        'themeDefaultProps',
        // TODO: fix ClockPicker not having root element
        'themeStyleOverrides',
        'themeVariants',
      ],
    }),
  );

  it('renders a listbox with a name', () => {
    render(<ClockPicker date={null} onChange={() => {}} />);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAccessibleName('Select hours. No time selected');
  });

  it('has a name depending on the `date`', () => {
    render(<ClockPicker date={adapterToUse.date('2019-01-01T04:20:00.000')} onChange={() => {}} />);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAccessibleName('Select hours. Selected time is 4:20 AM');
  });

  it('renders the current value as an accessible option', () => {
    render(<ClockPicker date={adapterToUse.date('2019-01-01T04:20:00.000')} onChange={() => {}} />);

    const listbox = screen.getByRole('listbox');
    const selectedOption = within(listbox).getByRole('option', { selected: true });
    expect(selectedOption).toHaveAccessibleName('4 hours');
    expect(listbox).to.have.attribute('aria-activedescendant', selectedOption.id);
  });

  it('can be autofocused on mount', () => {
    render(<ClockPicker autoFocus date={null} onChange={() => {}} />);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveFocus();
  });

  it('stays focused when the view changes', () => {
    const { setProps } = render(
      <ClockPicker autoFocus date={null} onChange={() => {}} view="hours" />,
    );

    setProps({ view: 'minutes' });

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveFocus();
  });

  it('selects the current date on mount', () => {
    render(<ClockPicker date={adapterToUse.date('2019-01-01T04:20:00.000')} onChange={() => {}} />);

    const selectedOption = screen.getByRole('option', { selected: true });
    expect(selectedOption).toHaveAccessibleName('4 hours');
  });

  it('selects the first hour on Home press', () => {
    const handleChange = spy();
    render(
      <ClockPicker
        autoFocus
        date={adapterToUse.date('2019-01-01T04:20:00.000')}
        onChange={handleChange}
      />,
    );
    const listbox = screen.getByRole('listbox');

    fireEvent.keyDown(listbox, { key: 'Home' });

    expect(handleChange.callCount).to.equal(1);
    const [newDate, reason] = handleChange.firstCall.args;
    // TODO: Can't find the GH issue regarding this
    // expect(newDate).toEqualDateTime(adapterToUse.date('2019-01-01T00:20:00.000'));
    // but the year, mont, day is different
    expect(adapterToUse.getHours(newDate)).to.equal(0);
    expect(adapterToUse.getMinutes(newDate)).to.equal(20);
    expect(reason).to.equal('partial');
  });

  it('selects the last hour on End press', () => {
    const handleChange = spy();
    render(
      <ClockPicker
        autoFocus
        date={adapterToUse.date('2019-01-01T04:20:00.000')}
        onChange={handleChange}
      />,
    );
    const listbox = screen.getByRole('listbox');

    fireEvent.keyDown(listbox, { key: 'End' });

    expect(handleChange.callCount).to.equal(1);
    const [newDate, reason] = handleChange.firstCall.args;
    expect(adapterToUse.getHours(newDate)).to.equal(23);
    expect(adapterToUse.getMinutes(newDate)).to.equal(20);
    expect(reason).to.equal('partial');
  });

  it('selects the next hour on ArrowUp press', () => {
    const handleChange = spy();
    render(
      <ClockPicker
        autoFocus
        date={adapterToUse.date('2019-01-01T04:20:00.000')}
        onChange={handleChange}
      />,
    );
    const listbox = screen.getByRole('listbox');

    fireEvent.keyDown(listbox, { key: 'ArrowUp' });

    expect(handleChange.callCount).to.equal(1);
    const [newDate, reason] = handleChange.firstCall.args;
    expect(adapterToUse.getHours(newDate)).to.equal(5);
    expect(adapterToUse.getMinutes(newDate)).to.equal(20);
    expect(reason).to.equal('partial');
  });

  it('selects the previous hour on ArrowDown press', () => {
    const handleChange = spy();
    render(
      <ClockPicker
        autoFocus
        date={adapterToUse.date('2019-01-01T04:20:00.000')}
        onChange={handleChange}
      />,
    );
    const listbox = screen.getByRole('listbox');

    fireEvent.keyDown(listbox, { key: 'ArrowDown' });

    expect(handleChange.callCount).to.equal(1);
    const [newDate, reason] = handleChange.firstCall.args;
    expect(adapterToUse.getHours(newDate)).to.equal(3);
    expect(adapterToUse.getMinutes(newDate)).to.equal(20);
    expect(reason).to.equal('partial');
  });

  describe('Time validation on touch ', () => {
    before(function beforeHook() {
      if (typeof window.Touch === 'undefined' || typeof window.TouchEvent === 'undefined') {
        this.skip();
      }
    });

    const clockTouchEvent = {
      '13:--': {
        changedTouches: [
          {
            clientX: 150,
            clientY: 60,
          },
        ],
      },
      '20:--': {
        changedTouches: [
          {
            clientX: 66,
            clientY: 157,
          },
        ],
      },
      '--:10': {
        changedTouches: [
          {
            clientX: 190,
            clientY: 60,
          },
        ],
      },
      '--:20': {
        changedTouches: [
          {
            clientX: 222,
            clientY: 180,
          },
        ],
      },
    };

    it('should select enabled hour', () => {
      const handleChange = spy();
      const handleViewChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T00:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          onViewChange={handleViewChange}
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['13:--']);

      expect(handleChange.callCount).to.equal(1);
      const [date, selectionState] = handleChange.firstCall.args;
      expect(date).toEqualDateTime(adapterToUse.date('2018-01-01T13:00:00.000'));
      expect(selectionState).to.equal('shallow');
      expect(handleViewChange.callCount).to.equal(0);
    });

    it('should select enabled minute', () => {
      const handleChange = spy();
      const handleViewChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T13:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          onViewChange={handleViewChange}
          view="minutes"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);

      expect(handleChange.callCount).to.equal(1);
      const [date, selectionState] = handleChange.firstCall.args;
      expect(date).toEqualDateTime(adapterToUse.date('2018-01-01T13:20:00.000'));
      expect(selectionState).to.equal('shallow');
      expect(handleViewChange.callCount).to.equal(0);
    });

    it('should not select minute when time is disabled', () => {
      const handleChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T20:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          view="minutes"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);

      expect(handleChange.callCount).to.equal(0);
    });

    it('should not select disabled hour', () => {
      const handleChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T13:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          view="hours"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['20:--']);

      expect(handleChange.callCount).to.equal(0);
    });

    it('should select enabled second', () => {
      const handleChange = spy();
      const handleViewChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T13:20:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          onViewChange={handleViewChange}
          view="seconds"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:10']);

      expect(handleChange.callCount).to.equal(1);
      const [date, selectionState] = handleChange.firstCall.args;
      expect(date).toEqualDateTime(adapterToUse.date('2018-01-01T13:20:10.000'));
      expect(selectionState).to.equal('shallow');
      expect(handleViewChange.callCount).to.equal(0);
    });

    it('should not select second when time is disabled', () => {
      const handleChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T00:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          view="seconds"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);

      expect(handleChange.callCount).to.equal(0);
    });
  });
});
