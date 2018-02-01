import * as React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { StandardProps } from '..';
import { Orientation } from './Stepper';

export interface StepContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepContentClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  completed?: boolean;
  last?: boolean;
  optional?: boolean;
  orientation?: Orientation;
  transition?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
}

export type StepContentClasskey = 'root' | 'last' | 'transition';

declare const StepContent: React.ComponentType<StepContentProps>;

export default StepContent;
