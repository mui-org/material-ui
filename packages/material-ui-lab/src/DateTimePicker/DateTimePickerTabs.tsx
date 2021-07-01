import * as React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs, { tabsClasses } from '@material-ui/core/Tabs';
import { styled } from '@material-ui/core/styles';
import TimeIcon from '../internal/svg-icons/Time';
import DateRangeIcon from '../internal/svg-icons/DateRange';
import {
  WrapperVariantContext,
  WrapperVariant,
} from '../internal/pickers/wrappers/WrapperVariantContext';
import { DateTimePickerView } from './shared';

type TabValue = 'date' | 'time';

const viewToTab = (openView: DateTimePickerView): TabValue => {
  // TODO: what happens if `openView` is `month`?
  if (openView === 'day' || openView === 'year') {
    return 'date';
  }

  return 'time';
};

const tabToView = (tab: TabValue): DateTimePickerView => {
  if (tab === 'date') {
    return 'day';
  }

  return 'hours';
};

export interface DateTimePickerTabsProps {
  dateRangeIcon?: React.ReactNode;
  onChange: (view: DateTimePickerView) => void;
  timeIcon?: React.ReactNode;
  view: DateTimePickerView;
}

type StyleProps = DateTimePickerTabsProps & { wrapperVariant: WrapperVariant };

const DateTimePickerTabsRoot = styled(Tabs, { skipSx: true })<{ styleProps: StyleProps }>(
  ({ styleProps, theme }) => ({
    boxShadow: `0 -1px 0 0 inset ${theme.palette.divider}`,
    ...(styleProps.wrapperVariant === 'desktop' && {
      order: 1,
      boxShadow: `0 1px 0 0 inset ${theme.palette.divider}`,
      [`& .${tabsClasses.indicator}`]: {
        bottom: 'auto',
        top: 0,
      },
    }),
  }),
);

/**
 * @ignore - internal component.
 */
const DateTimePickerTabs = (props: DateTimePickerTabsProps) => {
  const { dateRangeIcon = <DateRangeIcon />, onChange, timeIcon = <TimeIcon />, view } = props;

  const wrapperVariant = React.useContext(WrapperVariantContext);
  const styleProps = { ...props, wrapperVariant };

  const handleChange = (event: React.SyntheticEvent, value: TabValue) => {
    onChange(tabToView(value));
  };

  return (
    <DateTimePickerTabsRoot
      styleProps={styleProps}
      variant="fullWidth"
      value={viewToTab(view)}
      onChange={handleChange}
    >
      <Tab
        value="date"
        aria-label="pick date"
        icon={<React.Fragment>{dateRangeIcon}</React.Fragment>}
      />
      <Tab value="time" aria-label="pick time" icon={<React.Fragment>{timeIcon}</React.Fragment>} />
    </DateTimePickerTabsRoot>
  );
};

export default DateTimePickerTabs;
