import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers, SinonFakeTimers } from 'sinon';
import TextField from '@material-ui/core/TextField';
import { act, fireEvent, screen } from 'test/utils';
import PickersDay from '@material-ui/lab/PickersDay';
import CalendarPickerSkeleton from '@material-ui/lab/CalendarPickerSkeleton';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import {
  createPickerRender,
  FakeTransitionComponent,
  adapterToUse,
  getByMuiTest,
  queryAllByMuiTest,
  openMobilePicker,
} from '../internal/pickers/test-utils';

describe('<MobileDatePicker />', () => {
  let clock: SinonFakeTimers;
  beforeEach(() => {
    clock = useFakeTimers(new Date());
  });
  afterEach(() => {
    clock.restore();
  });
  // StrictModeViolation: Uses CalendarPicker
  const render = createPickerRender({ strict: false });

  it('Accepts date on `OK` button click', () => {
    const onChangeMock = spy();
    render(
      <MobileDatePicker
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        DialogProps={{ TransitionComponent: FakeTransitionComponent }}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    openMobilePicker();

    fireEvent.click(screen.getByLabelText('Jan 2, 2019'));
    expect(onChangeMock.callCount).to.equal(1);
    expect(screen.queryByRole('dialog')).not.to.equal(null);

    fireEvent.click(screen.getByText(/ok/i));
    // TODO revisit calling onChange twice. Now it is expected for mobile mode.
    expect(onChangeMock.callCount).to.equal(2);
    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('selects the closest enabled date if selected date is disabled', () => {
    const onChangeMock = spy();

    render(
      <MobileDatePicker
        open
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
        maxDate={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(getByMuiTest('calendar-year-text')).to.have.text('2018');
    expect(getByMuiTest('calendar-month-text')).to.have.text('January');

    // onChange must be dispatched with newly selected date
    expect(onChangeMock.callCount).to.equal(1);
    expect(onChangeMock.args[0][0]).toEqualDateTime(adapterToUse.date('2018-01-01T00:00:00.000'));
  });

  it('allows to change only year', () => {
    const onChangeMock = spy();
    render(
      <MobileDatePicker
        open
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText(/switch to year view/i));
    fireEvent.click(screen.getByText('2010', { selector: 'button' }));

    expect(getByMuiTest('calendar-year-text')).to.have.text('2010');
    expect(onChangeMock.callCount).to.equal(1);
  });

  it('allows to select edge years from list', () => {
    render(
      <MobileDatePicker
        open
        reduceAnimations
        value={null}
        onChange={() => {}}
        openTo="year"
        minDate={adapterToUse.date('2000-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2010-01-01T00:00:00.000')}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByText('2010', { selector: 'button' }));
    expect(getByMuiTest('datepicker-toolbar-date')).to.have.text('Fri, Jan 1');
  });

  it("doesn't close picker on selection in Mobile mode", () => {
    render(
      <MobileDatePicker
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeVisible();
  });

  it('prop `clearable` - renders clear button in Mobile mode', () => {
    const onChangeMock = spy();
    render(
      <MobileDatePicker
        clearable
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        DialogProps={{ TransitionComponent: FakeTransitionComponent }}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    openMobilePicker();
    fireEvent.click(screen.getByText('Clear'));

    expect(onChangeMock.callCount).to.equal(1);
    expect(onChangeMock.args[0][0]).to.equal(null);
    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('prop `toolbarTitle` – should render title from the prop', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        toolbarTitle="test"
        label="something"
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(getByMuiTest('picker-toolbar-title').textContent).to.equal('test');
  });

  it('prop `toolbarTitle` – should use label if no toolbar title', () => {
    render(
      <MobileDatePicker
        open
        label="Default label"
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(getByMuiTest('picker-toolbar-title').textContent).to.equal('Default label');
  });

  it('prop `toolbarFormat` – should format toolbar according to passed format', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        onChange={() => {}}
        toolbarFormat="MMMM"
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(getByMuiTest('datepicker-toolbar-date').textContent).to.equal('January');
  });

  it('prop `onMonthChange` – dispatches callback when months switching', () => {
    const onMonthChangeMock = spy();
    render(
      <MobileDatePicker
        open
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        onMonthChange={onMonthChangeMock}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    fireEvent.click(screen.getByLabelText('Next month'));
    expect(onMonthChangeMock.callCount).to.equal(1);
  });

  it('prop `loading` – displays default loading indicator', () => {
    render(
      <MobileDatePicker
        open
        loading
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(queryAllByMuiTest(document.body, 'day')).to.have.length(0);
    expect(getByMuiTest('loading-progress')).toBeVisible();
  });

  it('prop `renderLoading` – displays custom loading indicator', () => {
    render(
      <MobileDatePicker
        loading
        renderLoading={() => <CalendarPickerSkeleton data-testid="custom-loading" />}
        open
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    expect(screen.queryByTestId('loading-progress')).to.equal(null);
    expect(screen.getByTestId('custom-loading')).toBeVisible();
  });

  it('prop `ToolbarComponent` – render custom toolbar component', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        value={adapterToUse.date()}
        onChange={() => {}}
        ToolbarComponent={() => <div data-testid="custom-toolbar" />}
      />,
    );

    expect(screen.getByTestId('custom-toolbar')).toBeVisible();
  });

  it('prop `renderDay` – renders custom day', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderDay={(day, _selected, pickersDayProps) => (
          <PickersDay {...pickersDayProps} data-testid="test-day" />
        )}
      />,
    );

    expect(screen.getAllByTestId('test-day')).to.have.length(31);
  });

  it('prop `defaultCalendarMonth` – opens on provided month if date is `null`', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        open
        value={null}
        onChange={() => {}}
        defaultCalendarMonth={adapterToUse.date('2018-07-01T00:00:00.000')}
      />,
    );

    expect(screen.getByText('July')).toBeVisible();
  });

  it('prop `showTodayButton` – accept current date when "today" button is clicked', () => {
    const onCloseMock = spy();
    const handleChange = spy();
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        showTodayButton
        cancelText="stream"
        onClose={onCloseMock}
        onChange={handleChange}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        DialogProps={{ TransitionComponent: FakeTransitionComponent }}
      />,
    );
    const start = adapterToUse.date();
    fireEvent.click(screen.getByRole('textbox'));
    act(() => {
      clock.tick(10);
    });
    fireEvent.click(screen.getByText(/today/i));

    expect(onCloseMock.callCount).to.equal(1);
    expect(handleChange.callCount).to.equal(1);
    expect(adapterToUse.getDiff(handleChange.args[0][0], start)).to.equal(10);
  });
});
