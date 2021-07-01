import * as React from 'react';
import { describeConformanceV5 } from 'test/utils';
import DateRangePickerDay, {
  dateRangePickerDayClasses as classes,
} from '@material-ui/lab/DateRangePickerDay';
import { adapterToUse, wrapPickerMount, createPickerRender } from '../internal/pickers/test-utils';

describe('<DateRangePickerDay />', () => {
  const render = createPickerRender();

  describeConformanceV5(
    <DateRangePickerDay
      day={adapterToUse.date()}
      outsideCurrentMonth={false}
      selected
      onDaySelect={() => {}}
      isHighlighting
      isPreviewing
      isStartOfPreviewing
      isEndOfPreviewing
      isStartOfHighlighting
      isEndOfHighlighting
    />,
    () => ({
      classes,
      inheritComponent: 'button',
      muiName: 'MuiDateRangePickerDay',
      render,
      wrapMount: wrapPickerMount,
      refInstanceof: window.HTMLButtonElement,
      // cannot test reactTestRenderer because of required context
      skip: [
        'componentProp',
        'componentsProp',
        'reactTestRenderer',
        'propsSpread',
        'refForwarding',
        // TODO: Fix DateRangePickerDays is not spreading props on root
        'themeDefaultProps',
        'themeVariants',
      ],
    }),
  );
});
