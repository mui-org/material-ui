import * as React from 'react';
import clsx from 'clsx';
import { useTheme, styled, Theme } from '@material-ui/core/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import PickersToolbarText from '../internal/pickers/PickersToolbarText';
import PickersToolbarButton from '../internal/pickers/PickersToolbarButton';
import PickersToolbar from '../internal/pickers/PickersToolbar';
import { arrayIncludes } from '../internal/pickers/utils';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { useMeridiemMode } from '../internal/pickers/hooks/date-helpers-hooks';
import { ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';

export interface TimePickerToolbarClasses {
  separator: string;
  hourMinuteLabel: string;
  hourMinuteLabelLandscape: string;
  hourMinuteLabelReverse: string;
  ampmSelection: string;
  ampmLandscape: string;
  ampmLabel: string;
  penIconLandscape: string;
}

export interface TimePickerToolbarProps extends ToolbarComponentProps {
  classes?: Partial<TimePickerToolbarClasses>;
}

export type TimePickerToolbarClassKey = keyof TimePickerToolbarClasses;

export function getTimePickerToolbarUtilityClass(slot: string) {
  return generateUtilityClass('PrivateTimePickerToolbar', slot);
}

export const timePickerToolbarClasses: TimePickerToolbarClasses = generateUtilityClasses(
  'PrivateTimePickerToolbar',
  [
    'separator',
    'hourMinuteLabel',
    'hourMinuteLabelLandscape',
    'hourMinuteLabelReverse',
    'ampmSelection',
    'ampmLandscape',
    'ampmLabel',
    'penIconLandscape',
  ],
);

const useUtilityClasses = (styleProps: TimePickerToolbarProps & { theme: Theme }) => {
  const { theme, isLandscape, classes } = styleProps;

  const slots = {
    penIconLandscape: ['penIconLandscape'],
    separator: ['separator'],
    hourMinuteLabel: [
      'hourMinuteLabel',
      isLandscape && 'hourMinuteLabelLandscape',
      theme.direction === 'rtl' && 'hourMinuteLabelReverse',
    ],
    ampmSelection: ['ampmSelection', isLandscape && 'ampmLandscape'],
    ampmLabel: ['ampmLabel'],
  };

  return composeClasses(slots, getTimePickerToolbarUtilityClass, classes);
};

const TimePickerToolbarRoot = styled(PickersToolbar, { skipSx: true })<{
  styleProps: TimePickerToolbarProps;
}>({
  [`& .${timePickerToolbarClasses.penIconLandscape}`]: {
    marginTop: 'auto',
  },
});

const TimePickerToolbarSeparator = styled(PickersToolbarText, { skipSx: true })({
  outline: 0,
  margin: '0 4px 0 2px',
  cursor: 'default',
});

const TimePickerToolbarHourMinuteLabel = styled('div', { skipSx: true })<{
  styleProps: TimePickerToolbarProps;
}>(({ theme, styleProps }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  ...(styleProps.isLandscape && {
    marginTop: 'auto',
  }),
  ...(theme.direction === 'rtl' && {
    flexDirection: 'row-reverse',
  }),
}));

const TimePickerToolbarAmPmSelection = styled('div', { skipSx: true })<{
  styleProps: TimePickerToolbarProps;
}>(({ styleProps }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginRight: 'auto',
  marginLeft: 12,
  ...(styleProps.isLandscape && {
    margin: '4px 0 auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexBasis: '100%',
  }),
  [`& .${timePickerToolbarClasses.ampmLabel}`]: {
    fontSize: 17,
  },
}));

/**
 * @ignore - internal component.
 */
const TimePickerToolbar: React.FC<ToolbarComponentProps> = (props) => {
  const {
    ampm,
    ampmInClock,
    date,
    isLandscape,
    isMobileKeyboardViewOpen,
    onChange,
    openView,
    setOpenView,
    toggleMobileKeyboardView,
    toolbarTitle = 'SELECT TIME',
    views,
    ...other
  } = props;
  const utils = useUtils();
  const theme = useTheme();
  const showAmPmControl = Boolean(ampm && !ampmInClock);
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onChange);

  const formatHours = (time: unknown) =>
    ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');

  const styleProps = props;
  const classes = useUtilityClasses({ ...styleProps, theme });

  const separator = (
    <TimePickerToolbarSeparator
      tabIndex={-1}
      value=":"
      variant="h3"
      selected={false}
      className={classes.separator}
    />
  );

  return (
    <TimePickerToolbarRoot
      viewType="clock"
      landscapeDirection="row"
      toolbarTitle={toolbarTitle}
      isLandscape={isLandscape}
      isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
      toggleMobileKeyboardView={toggleMobileKeyboardView}
      styleProps={styleProps}
      penIconClassName={clsx({ [classes.penIconLandscape]: isLandscape })}
      {...other}
    >
      <TimePickerToolbarHourMinuteLabel className={classes.hourMinuteLabel} styleProps={styleProps}>
        {arrayIncludes(views, 'hours') && (
          <PickersToolbarButton
            data-mui-test="hours"
            tabIndex={-1}
            variant="h3"
            onClick={() => setOpenView('hours')}
            selected={openView === 'hours'}
            value={date ? formatHours(date) : '--'}
          />
        )}
        {arrayIncludes(views, ['hours', 'minutes']) && separator}
        {arrayIncludes(views, 'minutes') && (
          <PickersToolbarButton
            data-mui-test="minutes"
            tabIndex={-1}
            variant="h3"
            onClick={() => setOpenView('minutes')}
            selected={openView === 'minutes'}
            value={date ? utils.format(date, 'minutes') : '--'}
          />
        )}
        {arrayIncludes(views, ['minutes', 'seconds']) && separator}
        {arrayIncludes(views, 'seconds') && (
          <PickersToolbarButton
            data-mui-test="seconds"
            variant="h3"
            onClick={() => setOpenView('seconds')}
            selected={openView === 'seconds'}
            value={date ? utils.format(date, 'seconds') : '--'}
          />
        )}
      </TimePickerToolbarHourMinuteLabel>
      {showAmPmControl && (
        <TimePickerToolbarAmPmSelection className={classes.ampmSelection} styleProps={styleProps}>
          <PickersToolbarButton
            disableRipple
            variant="subtitle2"
            data-mui-test="toolbar-am-btn"
            selected={meridiemMode === 'am'}
            typographyClassName={classes.ampmLabel}
            value={utils.getMeridiemText('am')}
            onClick={() => handleMeridiemChange('am')}
          />
          <PickersToolbarButton
            disableRipple
            variant="subtitle2"
            data-mui-test="toolbar-pm-btn"
            selected={meridiemMode === 'pm'}
            typographyClassName={classes.ampmLabel}
            value={utils.getMeridiemText('pm')}
            onClick={() => handleMeridiemChange('pm')}
          />
        </TimePickerToolbarAmPmSelection>
      )}
    </TimePickerToolbarRoot>
  );
};

export default TimePickerToolbar;
