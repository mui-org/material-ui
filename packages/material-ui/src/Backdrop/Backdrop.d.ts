import * as React from 'react';
import { SxProps } from '@material-ui/system';
import {
  ExtendBackdropUnstyledTypeMap,
  BackdropUnstyledTypeMap,
} from '@material-ui/unstyled/BackdropUnstyled';
import { FadeProps } from '../Fade';
import { TransitionProps } from '../transitions/transition';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export type BackdropTypeMap<
  D extends React.ElementType = 'span',
  P = {},
> = ExtendBackdropUnstyledTypeMap<{
  props: P &
    Partial<Omit<FadeProps, 'children'>> & {
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: BackdropUnstyledTypeMap['props']['classes'];
      /**
       * If `true`, the component is shown.
       */
      open: boolean;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
      /**
       * The duration for the transition, in milliseconds.
       * You may specify a single timeout for all transitions, or individually with an object.
       */
      transitionDuration?: TransitionProps['timeout'];
    };
  defaultComponent: D;
}>;

type BackdropRootProps = NonNullable<BackdropTypeMap['props']['componentsProps']>['root'];

export const BackdropRoot: React.FC<BackdropRootProps>;

export type BackdropClassKey = keyof NonNullable<BackdropTypeMap['props']['classes']>;

/**
 *
 * Demos:
 *
 * - [Backdrop](https://material-ui.com/components/backdrop/)
 *
 * API:
 *
 * - [Backdrop API](https://material-ui.com/api/backdrop/)
 * - inherits [Fade API](https://material-ui.com/api/fade/)
 */

declare const Backdrop: OverridableComponent<BackdropTypeMap>;

export type BackdropClasses = Record<BackdropClassKey, string>;

export const backdropClasses: BackdropClasses;

export type BackdropProps<
  D extends React.ElementType = BackdropTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BackdropTypeMap<D, P>, D>;

export default Backdrop;
