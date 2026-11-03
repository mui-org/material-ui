import * as React from 'react';
import { InternalStandardProps as StandardProps } from '../internal';
import { TouchRippleClasses, TouchRippleClassKey } from './touchRippleClasses';

export { TouchRippleClassKey };

export interface StartActionOptions {
  pulsate?: boolean | undefined;
  center?: boolean | undefined;
}

export interface TouchRippleActions {
  start: (
    event?: React.SyntheticEvent,
    options?: StartActionOptions,
    callback?: () => void,
  ) => void;
  pulsate: (event?: React.SyntheticEvent) => void;
  stop: (event?: React.SyntheticEvent, callback?: () => void) => void;
}

export type TouchRippleProps = StandardProps<React.HTMLAttributes<HTMLElement>> & {
  center?: boolean | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TouchRippleClasses> | undefined;
};

declare const TouchRipple: React.ForwardRefRenderFunction<TouchRippleActions, TouchRippleProps>;

export default TouchRipple;
