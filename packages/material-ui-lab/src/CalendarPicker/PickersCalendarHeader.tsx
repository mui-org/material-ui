import * as React from 'react';
import Fade from '@material-ui/core/Fade';
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { SlideDirection } from './PickersSlideTransition';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import FadeTransitionGroup from './PickersFadeTransitionGroup';
import { DateValidationProps } from '../internal/pickers/date-utils';
// tslint:disable-next-line no-relative-import-in-test
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import PickersArrowSwitcher, {
  ExportedArrowSwitcherProps,
} from '../internal/pickers/PickersArrowSwitcher';
import {
  usePreviousMonthDisabled,
  useNextMonthDisabled,
} from '../internal/pickers/hooks/date-helpers-hooks';
import { CalendarPickerView } from './shared';

export type ExportedCalendarHeaderProps<TDate> = Pick<
  PickersCalendarHeaderProps<TDate>,
  | 'components'
  | 'componentsProps'
  | 'getViewSwitchingButtonText'
  | 'leftArrowButtonText'
  | 'rightArrowButtonText'
>;

export interface PickersCalendarHeaderProps<TDate>
  extends ExportedArrowSwitcherProps,
    Omit<DateValidationProps<TDate>, 'shouldDisableDate'> {
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: ExportedArrowSwitcherProps['components'] & {
    SwitchViewButton?: React.ElementType;
    SwitchViewIcon?: React.ElementType;
  };
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps?: ExportedArrowSwitcherProps['componentsProps'] & {
    switchViewButton?: any;
  };
  currentMonth: TDate;
  views: readonly CalendarPickerView[];
  /**
   * Get aria-label text for switching between views button.
   */
  getViewSwitchingButtonText?: (currentView: CalendarPickerView) => string;
  onMonthChange: (date: TDate, slideDirection: SlideDirection) => void;
  openView: CalendarPickerView;
  reduceAnimations: boolean;
  onViewChange?: (view: CalendarPickerView) => void;
}

const PickersCalendarHeaderRoot = styled('div', { skipSx: true })<{
  styleProps: PickersCalendarHeaderProps<any>;
}>({
  display: 'flex',
  alignItems: 'center',
  marginTop: 16,
  marginBottom: 8,
  paddingLeft: 24,
  paddingRight: 12,
  // prevent jumping in safari
  maxHeight: 30,
  minHeight: 30,
});

const PickersCalendarHeaderLabel = styled('div', { skipSx: true })<{
  styleProps: PickersCalendarHeaderProps<any>;
}>(({ theme }) => ({
  display: 'flex',
  maxHeight: 30,
  overflow: 'hidden',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: 'auto',
  ...theme.typography.body1,
  fontWeight: theme.typography.fontWeightMedium,
}));

const PickersCalendarHeaderLabelItem = styled('div', { skipSx: true })<{
  styleProps: PickersCalendarHeaderProps<any>;
}>({
  marginRight: 6,
});

const PickersCalendarHeaderSwitchViewButton = styled(IconButton, { skipSx: true })({
  marginRight: 'auto',
});

const PickersCalendarHeaderSwitchView = styled(ArrowDropDownIcon, { skipSx: true })<{
  styleProps: PickersCalendarHeaderProps<any>;
}>(({ theme, styleProps }) => ({
  willChange: 'transform',
  transition: theme.transitions.create('transform'),
  transform: 'rotate(0deg)',
  ...(styleProps.openView === 'year' && {
    transform: 'rotate(180deg)',
  }),
}));

function getSwitchingViewAriaText(view: CalendarPickerView) {
  return view === 'year'
    ? 'year view is open, switch to calendar view'
    : 'calendar view is open, switch to year view';
}

/**
 * @ignore - do not document.
 */
function PickersCalendarHeader<TDate>(props: PickersCalendarHeaderProps<TDate>) {
  const {
    components = {},
    componentsProps = {},
    currentMonth: month,
    disableFuture,
    disablePast,
    getViewSwitchingButtonText = getSwitchingViewAriaText,
    leftArrowButtonText = 'Previous month',
    maxDate,
    minDate,
    onMonthChange,
    onViewChange,
    openView: currentView,
    reduceAnimations,
    rightArrowButtonText = 'Next month',
    views,
  } = props;

  const utils = useUtils<TDate>();

  const switchViewButtonProps = componentsProps.switchViewButton || {};

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(month), 'left');
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(month), 'right');

  const isNextMonthDisabled = useNextMonthDisabled(month, { disableFuture, maxDate });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(month, { disablePast, minDate });

  const handleToggleView = () => {
    if (views.length === 1 || !onViewChange) {
      return;
    }

    if (views.length === 2) {
      onViewChange(views.find((view) => view !== currentView) || views[0]);
    } else {
      // switching only between first 2
      const nextIndexToOpen = views.indexOf(currentView) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  };

  // No need to display more information
  if (views.length === 1 && views[0] === 'year') {
    return null;
  }

  const styleProps = props;

  return (
    <PickersCalendarHeaderRoot styleProps={styleProps}>
      <PickersCalendarHeaderLabel
        role="presentation"
        onClick={handleToggleView}
        styleProps={styleProps}
      >
        <FadeTransitionGroup
          reduceAnimations={reduceAnimations}
          transKey={utils.format(month, 'month')}
        >
          <PickersCalendarHeaderLabelItem
            aria-live="polite"
            data-mui-test="calendar-month-text"
            styleProps={styleProps}
          >
            {utils.format(month, 'month')}
          </PickersCalendarHeaderLabelItem>
        </FadeTransitionGroup>
        <FadeTransitionGroup
          reduceAnimations={reduceAnimations}
          transKey={utils.format(month, 'year')}
        >
          <PickersCalendarHeaderLabelItem
            aria-live="polite"
            data-mui-test="calendar-year-text"
            styleProps={styleProps}
          >
            {utils.format(month, 'year')}
          </PickersCalendarHeaderLabelItem>
        </FadeTransitionGroup>
        {views.length > 1 && (
          <PickersCalendarHeaderSwitchViewButton
            size="small"
            as={components.SwitchViewButton}
            aria-label={getViewSwitchingButtonText(currentView)}
            {...switchViewButtonProps}
            styleProps={{ ...styleProps, ...switchViewButtonProps }}
          >
            <PickersCalendarHeaderSwitchView
              as={components.SwitchViewIcon}
              styleProps={styleProps}
            />
          </PickersCalendarHeaderSwitchViewButton>
        )}
      </PickersCalendarHeaderLabel>
      <Fade in={currentView === 'day'}>
        <PickersArrowSwitcher
          leftArrowButtonText={leftArrowButtonText}
          rightArrowButtonText={rightArrowButtonText}
          components={components}
          componentsProps={componentsProps}
          onLeftClick={selectPreviousMonth}
          onRightClick={selectNextMonth}
          isLeftDisabled={isPreviousMonthDisabled}
          isRightDisabled={isNextMonthDisabled}
        />
      </Fade>
    </PickersCalendarHeaderRoot>
  );
}

export default PickersCalendarHeader;
