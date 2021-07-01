import * as React from 'react';
import { expect } from 'chai';
import { SinonFakeTimers, useFakeTimers } from 'sinon';
import { fireEvent, screen, describeConformanceV5 } from 'test/utils';
import CalendarPicker, { calendarPickerClasses as classes } from '@material-ui/lab/CalendarPicker';
import {
  adapterToUse,
  wrapPickerMount,
  createPickerRender,
  getAllByMuiTest,
} from '../internal/pickers/test-utils';

describe('<CalendarPicker />', () => {
  let clock: SinonFakeTimers;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });

  // StrictModeViolation: Uses StrictMode incompatible API of `react-transition-group`
  const render = createPickerRender({ strict: false });

  describeConformanceV5(<CalendarPicker date={adapterToUse.date()} onChange={() => {}} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCalendarPicker',
    wrapMount: wrapPickerMount,
    refInstanceof: window.HTMLDivElement,
    // cannot test reactTestRenderer because of required context
    skip: [
      'componentProp',
      'componentsProp',
      'propsSpread',
      'reactTestRenderer',
      // TODO: Fix CalendarPicker is not spreading props on root
      'themeDefaultProps',
      'themeVariants',
    ],
  }));

  it('renders calendar standalone', () => {
    render(
      <CalendarPicker date={adapterToUse.date('2019-01-01T00:00:00.000')} onChange={() => {}} />,
    );

    expect(screen.getByText('January')).toBeVisible();
    expect(screen.getByText('2019')).toBeVisible();
    expect(getAllByMuiTest('day')).to.have.length(31);
    // It should follow https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    expect(
      document.querySelector('[role="grid"] > [role="row"] > [role="cell"] > button'),
    ).to.have.text('1');
  });

  // Flaky, it match 201 instead of 200 in the CI
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('renders year selection standalone', () => {
    render(
      <CalendarPicker
        date={adapterToUse.date('2019-01-01T00:00:00.000')}
        openTo="year"
        onChange={() => {}}
      />,
    );

    expect(getAllByMuiTest('year')).to.have.length(200);
  });

  it('switches between views uncontrolled', () => {
    render(
      <CalendarPicker date={adapterToUse.date('2019-01-01T00:00:00.000')} onChange={() => {}} />,
    );

    fireEvent.click(screen.getByLabelText(/switch to year view/i));

    expect(screen.queryByLabelText(/switch to year view/i)).to.equal(null);
    expect(screen.getByLabelText('year view is open, switch to calendar view')).toBeVisible();
  });

  // eslint-disable-next-line mocha/no-skipped-tests -- TODO: test without implementation details
  it.skip('should skip the header', () => {
    render(
      <CalendarPicker
        views={['year']}
        date={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={() => {}}
      />,
    );
    expect(document.querySelector('.MuiPickersCalendarHeader-root')).to.equal(null);
  });
});
