import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { CLOCK_WIDTH, CLOCK_HOUR_WIDTH } from './shared';

export interface ClockNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  'aria-label': string;
  disabled: boolean;
  /**
   * Make sure callers pass an id which. It should be defined if selected.
   */
  id: string | undefined;
  index: number;
  inner: boolean;
  label: string;
  selected: boolean;
}

export const classes = generateUtilityClasses('PrivateClockNumber', ['selected', 'disabled']);

const ClockNumberRoot = styled('span', { skipSx: true })<{ styleProps: ClockNumberProps }>(
  ({ theme, styleProps }) => ({
    height: CLOCK_HOUR_WIDTH,
    width: CLOCK_HOUR_WIDTH,
    position: 'absolute',
    left: `calc((100% - ${CLOCK_HOUR_WIDTH}px) / 2)`,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    color: theme.palette.text.primary,
    '&:focused': {
      backgroundColor: theme.palette.background.paper,
    },
    [`&.${classes.selected}`]: {
      color: theme.palette.primary.contrastText,
    },
    [`&.${classes.disabled}`]: {
      pointerEvents: 'none',
      color: theme.palette.text.disabled,
    },
    ...(styleProps.inner && {
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
    }),
  }),
);

/**
 * @ignore - internal component.
 */
function ClockNumber(props: ClockNumberProps) {
  const { className, disabled, index, inner, label, selected, ...other } = props;
  const styleProps = props;

  const angle = ((index % 12) / 12) * Math.PI * 2 - Math.PI / 2;
  const length = ((CLOCK_WIDTH - CLOCK_HOUR_WIDTH - 2) / 2) * (inner ? 0.65 : 1);
  const x = Math.round(Math.cos(angle) * length);
  const y = Math.round(Math.sin(angle) * length);

  return (
    <ClockNumberRoot
      className={clsx(
        {
          [classes.selected]: selected,
          [classes.disabled]: disabled,
        },
        className,
      )}
      aria-disabled={disabled ? true : undefined}
      aria-selected={selected ? true : undefined}
      role="option"
      style={{
        transform: `translate(${x}px, ${y + (CLOCK_WIDTH - CLOCK_HOUR_WIDTH) / 2}px`,
      }}
      styleProps={styleProps}
      {...other}
    >
      {label}
    </ClockNumberRoot>
  );
}

export default ClockNumber;
