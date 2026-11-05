'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, useThemeProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { InternalStandardProps as StandardProps } from '@mui/material/internal';
import type { SxProps } from '@mui/system';
import { getTimelineSeparatorUtilityClass } from './timelineSeparatorClasses';
import type { TimelineSeparatorClasses } from './timelineSeparatorClasses';

export interface TimelineSeparatorProps extends StandardProps<React.ComponentPropsWithRef<'div'>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineSeparatorClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = TimelineSeparatorProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTimelineSeparatorUtilityClass, classes);
};

const TimelineSeparatorRoot = styled('div', {
  name: 'MuiTimelineSeparator',
  slot: 'Root',
})<{ ownerState: OwnerState }>({
  display: 'flex',
  flexDirection: 'column',
  flex: 0,
  alignItems: 'center',
});

/**
 *
 * Demos:
 *
 * - [Timeline](https://next.mui.com/material-ui/react-timeline/)
 *
 * API:
 *
 * - [TimelineSeparator API](https://next.mui.com/material-ui/api/timeline-separator/)
 */
const TimelineSeparator = React.forwardRef(function TimelineSeparator(
  inProps: TimelineSeparatorProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTimelineSeparator',
  });

  const { className, ...other } = props;

  const ownerState = props;

  const classes = useUtilityClasses(ownerState);

  return (
    <TimelineSeparatorRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<TimelineSeparatorProps>;

TimelineSeparator.propTypes /* remove-proptypes */ = {
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default TimelineSeparator;
