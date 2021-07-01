import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { expect } from 'chai';
import { spy, useFakeTimers, SinonSpy, SinonFakeTimers } from 'sinon';
import { fireEvent, fireTouchChangedEvent, screen } from 'test/utils';
import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';
import { adapterToUse, getByMuiTest, createPickerRender } from '../internal/pickers/test-utils';

describe('<MobileDateTimePicker />', () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = useFakeTimers(adapterToUse.date('2018-01-01T00:00:00.000').getTime());
  });

  afterEach(() => {
    clock.restore();
  });

  // StrictModeViolation: Uses CalendarPicker
  const render = createPickerRender({ strict: false });

  it('opens dialog on textField click for Mobile mode', () => {
    render(
      <MobileDateTimePicker
        value={null}
        onChange={() => {}}
        renderInput={(params) => <TextField autoFocus {...params} />}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('allows to select full date end-to-end', function test() {
    if (typeof window.Touch === 'undefined' || typeof window.TouchEvent === 'undefined') {
      this.skip();
    }

    const onChangeMock: SinonSpy<any> = spy();
    const clockTouchEvent = {
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    };

    function DateTimePickerWithState() {
      const [date, setDate] = React.useState<Date | null>(null);

      return (
        <MobileDateTimePicker
          value={date}
          toolbarPlaceholder="Enter Date"
          onChange={(newDate) => {
            setDate(newDate);
            onChangeMock(newDate);
          }}
          renderInput={(params) => <TextField autoFocus {...params} />}
        />
      );
    }

    render(<DateTimePickerWithState />);
    fireEvent.click(screen.getByLabelText(/choose date/i));

    expect(getByMuiTest('datetimepicker-toolbar-day')).to.have.text('Enter Date');
    expect(getByMuiTest('hours')).to.have.text('--');
    expect(getByMuiTest('minutes')).to.have.text('--');

    // 1. Year view
    fireEvent.click(screen.getByLabelText(/switch to year view/));
    fireEvent.click(screen.getByText('2010', { selector: 'button' }));

    expect(getByMuiTest('datetimepicker-toolbar-year')).to.have.text('2010');

    // 2. Date
    fireEvent.click(screen.getByLabelText('Jan 15, 2010'));

    expect(getByMuiTest('datetimepicker-toolbar-day')).to.have.text('Jan 15');

    // 3. Hours
    fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent);
    fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockTouchEvent);

    expect(getByMuiTest('hours')).to.have.text('11');

    // 4. Minutes
    fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent);
    fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockTouchEvent);

    expect(getByMuiTest('minutes')).to.have.text('53');
    expect(onChangeMock.callCount).to.equal(4);

    fireEvent.click(screen.getByText(/ok/i));

    expect(onChangeMock.callCount).to.equal(5);
    expect(onChangeMock.args[4][0]).toEqualDateTime(adapterToUse.date('2010-01-15T11:53:00.000'));
  });

  it('prop: open – overrides open state', () => {
    render(
      <MobileDateTimePicker
        renderInput={(params) => <TextField {...params} />}
        open
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('prop: onCloseMock – dispatches on close request', () => {
    const onCloseMock = spy();
    render(
      <MobileDateTimePicker
        renderInput={(params) => <TextField {...params} />}
        open
        onClose={onCloseMock}
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock.callCount).to.equal(1);
  });
});
