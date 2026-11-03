'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { capitalize } from '@mui/material/utils';
import composeClasses from '@mui/utils/composeClasses';
import type { OverridableStringUnion } from '@mui/types';
import type { InternalStandardProps as StandardProps } from '@mui/material/internal';
import type { SxProps } from '@mui/system';
import { getTimelineDotUtilityClass } from './timelineDotClasses';
import type { TimelineDotClasses, TimelineDotClassKey } from './timelineDotClasses';

export interface TimelineDotPropsVariantOverrides {}

export interface TimelineDotPropsColorOverrides {}

export interface TimelineDotProps extends StandardProps<React.ComponentPropsWithRef<'span'>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineDotClasses> | undefined;
  /**
   * The dot can have a different colors.
   * @default 'grey'
   */
  color?:
    | OverridableStringUnion<
        'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        TimelineDotPropsColorOverrides
      >
    | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant?:
    OverridableStringUnion<'filled' | 'outlined', TimelineDotPropsVariantOverrides> | undefined;
}

type OwnerState = TimelineDotProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { color, variant, classes } = ownerState;

  const slots = {
    root: ['root', variant, color !== 'inherit' && `${variant}${capitalize(color as string)}`],
  };

  return composeClasses(slots, getTimelineDotUtilityClass, classes);
};

const TimelineDotRoot = styled('span', {
  name: 'MuiTimelineDot',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[
        (ownerState.color !== 'inherit' &&
          `${ownerState.variant}${capitalize(ownerState.color as string)}`) as TimelineDotClassKey
      ],
      styles[ownerState.variant as TimelineDotClassKey],
    ];
  },
})<{ ownerState: OwnerState }>(({ ownerState, theme }) => ({
  display: 'flex',
  alignSelf: 'baseline',
  borderStyle: 'solid',
  borderWidth: 2,
  padding: 4,
  borderRadius: '50%',
  boxShadow: (theme.vars || theme).shadows[1],
  margin: '11.5px 0',
  ...(ownerState.variant === 'filled' && {
    borderColor: 'transparent',
    ...(ownerState.color !== 'inherit' && {
      ...(ownerState.color === 'grey'
        ? {
            color: (theme.vars || theme).palette.grey[50],
            backgroundColor: (theme.vars || theme).palette.grey[400],
          }
        : {
            color: (theme.vars || theme).palette[ownerState.color as 'primary'].contrastText,
            backgroundColor: (theme.vars || theme).palette[ownerState.color as 'primary'].main,
          }),
    }),
  }),
  ...(ownerState.variant === 'outlined' && {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    ...(ownerState.color !== 'inherit' && {
      ...(ownerState.color === 'grey'
        ? {
            borderColor: (theme.vars || theme).palette.grey[400],
          }
        : {
            borderColor: (theme.vars || theme).palette[ownerState.color as 'primary'].main,
          }),
    }),
  }),
}));

/**
 *
 * Demos:
 *
 * - [Timeline](https://next.mui.com/material-ui/react-timeline/)
 *
 * API:
 *
 * - [TimelineDot API](https://next.mui.com/material-ui/api/timeline-dot/)
 */
const TimelineDot = React.forwardRef(function TimelineDot(
  inProps: TimelineDotProps,
  ref: React.Ref<HTMLSpanElement>,
) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineDot' });
  const { className, color = 'grey', variant = 'filled', ...other } = props;

  const ownerState = {
    ...props,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TimelineDotRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<TimelineDotProps>;

TimelineDot.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The dot can have a different colors.
   * @default 'grey'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'error',
      'grey',
      'info',
      'inherit',
      'primary',
      'secondary',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined']),
    PropTypes.string,
  ]),
} as any;

export default TimelineDot;
