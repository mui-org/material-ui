import * as React from 'react';
import { Breakpoint } from '@material-ui/system';

export interface HiddenJsProps {
  initialWidth?: Breakpoint;
  lgDown?: boolean;
  lgUp?: boolean;
  mdDown?: boolean;
  mdUp?: boolean;
  only?: Breakpoint | Breakpoint[];
  smDown?: boolean;
  smUp?: boolean;
  xlDown?: boolean;
  xlUp?: boolean;
  xsDown?: boolean;
  xsUp?: boolean;
}

declare const HiddenJs: React.JSXElementConstructor<HiddenJsProps>;

export default HiddenJs;
