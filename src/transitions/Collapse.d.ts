import * as React from 'react';
import { StandardProps } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionDuration, TransitionProps } from '../internal/Transition';

export interface CollapseProps extends StandardProps<
  TransitionProps,
  CollapseClassKey,
  'children'
> {
  children?: React.ReactNode;
  theme?: Theme;
  transitionDuration?: TransitionDuration | 'auto';
}

export type CollapseClassKey =
  | 'container'
  | 'entered'
  ;

declare const Collapse: React.ComponentType<CollapseProps>;

export default Collapse;
