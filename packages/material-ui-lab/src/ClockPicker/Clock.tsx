import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@material-ui/utils';
import ClockPointer from './ClockPointer';
import { useUtils, MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
import { Meridiem, convertToMeridiem } from '../internal/pickers/time-utils';
import { ClockView, getHours, getMinutes } from './shared';

export interface ClockProps<TDate> {
  ampm: boolean;
  ampmInClock: boolean;
  autoFocus?: boolean;
  children: readonly React.ReactNode[];
  date: TDate | null;
  getClockLabelText: (
    view: ClockView,
    time: TDate | null,
    adapter: MuiPickersAdapter<TDate>,
  ) => string;
  isTimeDisabled: (timeValue: number, type: ClockView) => boolean;
  minutesStep?: number;
  onValueChange: PickerOnChangeFn<TDate>;
  onChange: (value: number, isFinish?: PickerSelectionState) => void;
  /**
   * DOM id that the selected option should have
   * Should only be `undefined` on the server
   */
  selectedId: string | undefined;
  type: ClockView;
  value: number;
  meridiemMode: Meridiem | null;
}

const ClockRoot = styled('div', { skipSx: true })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2),
}));

const ClockClock = styled('div', { skipSx: true })({
  backgroundColor: 'rgba(0,0,0,.07)',
  borderRadius: '50%',
  height: 220,
  width: 220,
  flexShrink: 0,
  position: 'relative',
  pointerEvents: 'none',
});

const ClockSquareMask = styled('div', { skipSx: true })({
  width: '100%',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'auto',
  outline: 0,
  // Disable scroll capabilities.
  touchAction: 'none',
  userSelect: 'none',
  '@media (pointer: fine)': {
    cursor: 'pointer',
    borderRadius: '50%',
  },
  '&:active': {
    cursor: 'move',
  },
});

const ClockPin = styled('div', { skipSx: true })(({ theme }) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

const ClockAmButton = styled(IconButton, { skipSx: true })<{ styleProps: ClockProps<any> }>(
  ({ theme, styleProps }) => ({
    zIndex: 1,
    ...theme.typography.caption,
    position: 'absolute',
    bottom: 8,
    padding: 4,
    width: 42,
    height: 42,
    left: 8,
    ...(styleProps.meridiemMode === 'am' && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    }),
  }),
);

const ClockPmButton = styled(IconButton, { skipSx: true })<{ styleProps: ClockProps<any> }>(
  ({ theme, styleProps }) => ({
    zIndex: 1,
    ...theme.typography.caption,
    position: 'absolute',
    bottom: 8,
    padding: 4,
    width: 42,
    height: 42,
    right: 8,
    ...(styleProps.meridiemMode === 'pm' && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    }),
  }),
);

/**
 * @ignore - internal component.
 */
function Clock<TDate>(props: ClockProps<TDate>) {
  const {
    ampm,
    ampmInClock,
    autoFocus,
    children,
    date,
    getClockLabelText,
    isTimeDisabled,
    meridiemMode,
    minutesStep = 1,
    onChange,
    onValueChange,
    selectedId,
    type,
    value,
  } = props;

  const styleProps = props;

  const utils = useUtils<TDate>();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const isMoving = React.useRef(false);

  const isSelectedTimeDisabled = isTimeDisabled(value, type);
  const isPointerInner = !ampm && type === 'hours' && (value < 1 || value > 12);

  const handleMeridiemChange = (mode: Meridiem) => () => {
    if (mode === meridiemMode) {
      return;
    }

    const timeWithMeridiem = convertToMeridiem(date, mode, Boolean(ampm), utils);
    onValueChange(timeWithMeridiem, 'partial');
  };

  const handleValueChange = (newValue: number, isFinish: PickerSelectionState) => {
    if (isTimeDisabled(newValue, type)) {
      return;
    }

    onChange(newValue, isFinish);
  };

  const setTime = (event: MouseEvent | React.TouchEvent, isFinish: PickerSelectionState) => {
    let { offsetX, offsetY } = event as MouseEvent;

    if (offsetX === undefined) {
      const rect = ((event as React.TouchEvent).target as HTMLElement).getBoundingClientRect();

      offsetX = (event as React.TouchEvent).changedTouches[0].clientX - rect.left;
      offsetY = (event as React.TouchEvent).changedTouches[0].clientY - rect.top;
    }

    const newSelectedValue =
      type === 'seconds' || type === 'minutes'
        ? getMinutes(offsetX, offsetY, minutesStep)
        : getHours(offsetX, offsetY, Boolean(ampm));

    handleValueChange(newSelectedValue, isFinish);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    isMoving.current = true;
    setTime(event, 'shallow');
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (isMoving.current) {
      setTime(event, 'finish');
      isMoving.current = false;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // event.buttons & PRIMARY_MOUSE_BUTTON
    if (event.buttons > 0) {
      setTime(event.nativeEvent, 'shallow');
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (isMoving.current) {
      isMoving.current = false;
    }

    setTime(event.nativeEvent, 'finish');
  };

  const hasSelected = React.useMemo(() => {
    if (type === 'hours') {
      return true;
    }

    return value % 5 === 0;
  }, [type, value]);

  const keyboardControlStep = type === 'minutes' ? minutesStep : 1;

  const listboxRef = React.useRef<HTMLDivElement>(null);
  // Since this is rendered when a Popper is opened we can't use passive effects.
  // Focusing in passive effects in Popper causes scroll jump.
  useEnhancedEffect(() => {
    if (autoFocus) {
      // The ref not being resolved would be a bug in Material-UI.
      listboxRef.current!.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // TODO: Why this early exit?
    if (isMoving.current) {
      return;
    }

    switch (event.key) {
      case 'Home':
        // annulate both hours and minutes
        handleValueChange(0, 'partial');
        event.preventDefault();
        break;
      case 'End':
        handleValueChange(type === 'minutes' ? 59 : 23, 'partial');
        event.preventDefault();
        break;
      case 'ArrowUp':
        handleValueChange(value + keyboardControlStep, 'partial');
        event.preventDefault();
        break;
      case 'ArrowDown':
        handleValueChange(value - keyboardControlStep, 'partial');
        event.preventDefault();
        break;
      default:
      // do nothing
    }
  };

  return (
    <ClockRoot>
      <ClockClock>
        <ClockSquareMask
          data-mui-test="clock"
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
        {!isSelectedTimeDisabled && (
          <React.Fragment>
            <ClockPin />
            {date && (
              <ClockPointer
                type={type}
                value={value}
                isInner={isPointerInner}
                hasSelected={hasSelected}
              />
            )}
          </React.Fragment>
        )}
        <div
          aria-activedescendant={selectedId}
          aria-label={getClockLabelText(type, date, utils)}
          ref={listboxRef}
          role="listbox"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {children}
        </div>
      </ClockClock>
      {ampm && (wrapperVariant === 'desktop' || ampmInClock) && (
        <React.Fragment>
          <ClockAmButton
            data-mui-test="in-clock-am-btn"
            onClick={handleMeridiemChange('am')}
            disabled={meridiemMode === null}
            styleProps={styleProps}
          >
            AM
          </ClockAmButton>
          <ClockPmButton
            disabled={meridiemMode === null}
            data-mui-test="in-clock-pm-btn"
            onClick={handleMeridiemChange('pm')}
            styleProps={styleProps}
          >
            PM
          </ClockPmButton>
        </React.Fragment>
      )}
    </ClockRoot>
  );
}

export default Clock;
