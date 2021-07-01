import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import TimelineItem, { timelineItemClasses as classes } from '@material-ui/lab/TimelineItem';

describe('<TimelineItem />', () => {
  const render = createClientRender();

  describeConformanceV5(<TimelineItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    muiName: 'MuiTimelineItem',
    refInstanceof: window.HTMLLIElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
