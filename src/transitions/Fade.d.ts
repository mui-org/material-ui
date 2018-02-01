import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps, TransitionTimeout } from './transition';

export interface FadeProps extends TransitionProps {
  theme?: Theme;
  timeout?: TransitionTimeout;
}

declare const Fade: React.ComponentType<FadeProps>;

export default Fade;
