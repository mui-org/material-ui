import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import CalendarPickerSkeleton, {
  calendarPickerSkeletonClasses as classes,
} from '@material-ui/lab/CalendarPickerSkeleton';

describe('<CalendarPickerSkeleton />', () => {
  const render = createClientRender();

  describeConformanceV5(<CalendarPickerSkeleton />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCalendarPickerSkeleton',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'refForwarding', 'componentsProp', 'themeVariants'],
  }));
});
