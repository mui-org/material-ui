import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import TimelineSeparator, {
  timelineSeparatorClasses as classes,
} from '@material-ui/lab/TimelineSeparator';

describe('<TimelineSeparator />', () => {
  const render = createClientRender();

  describeConformanceV5(<TimelineSeparator />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTimelineSeparator',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
