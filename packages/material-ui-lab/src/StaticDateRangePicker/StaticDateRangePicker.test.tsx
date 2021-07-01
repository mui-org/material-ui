import * as React from 'react';
import { expect } from 'chai';
import { isWeekend } from 'date-fns';
import { useFakeTimers } from 'sinon';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import StaticDateRangePicker from '@material-ui/lab/StaticDateRangePicker';
import { describeConformance } from 'test/utils';
import {
  wrapPickerMount,
  createPickerRender,
  adapterToUse,
  getAllByMuiTest,
} from '../internal/pickers/test-utils';

const defaultRangeRenderInput = (startProps: TextFieldProps, endProps: TextFieldProps) => (
  <React.Fragment>
    <TextField {...startProps} />
    <TextField {...endProps} />
  </React.Fragment>
);

describe('<StaticDateRangePicker />', () => {
  let clock: ReturnType<typeof useFakeTimers>;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });

  const render = createPickerRender();

  describeConformance(
    <StaticDateRangePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={[null, null]}
    />,
    () => ({
      classes: {},
      wrapMount: wrapPickerMount,
      refInstanceof: undefined,
      skip: [
        'componentProp',
        'mergeClassName',
        'propsSpread',
        'refForwarding',
        'rootClass',
        'reactTestRenderer',
      ],
    }),
  );

  it('allows disabling dates', () => {
    render(
      <StaticDateRangePicker
        renderInput={defaultRangeRenderInput}
        minDate={adapterToUse.date('2005-01-01T00:00:00.000')}
        shouldDisableDate={isWeekend}
        onChange={() => {}}
        value={[
          adapterToUse.date('2018-01-01T00:00:00.000'),
          adapterToUse.date('2018-01-31T00:00:00.000'),
        ]}
      />,
    );

    expect(
      getAllByMuiTest('DateRangePickerDay').filter(
        (day) => day.getAttribute('disabled') !== undefined,
      ),
    ).to.have.length(31);
  });

  it('should render the correct a11y tree structure', () => {
    render(
      <StaticDateRangePicker
        renderInput={defaultRangeRenderInput}
        onChange={() => {}}
        value={[
          adapterToUse.date('2018-01-01T00:00:00.000'),
          adapterToUse.date('2018-01-31T00:00:00.000'),
        ]}
      />,
    );

    // It should follow https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    expect(
      document.querySelector('[role="grid"] > [role="row"] [role="cell"] > button'),
    ).to.have.text('1');
  });
});
