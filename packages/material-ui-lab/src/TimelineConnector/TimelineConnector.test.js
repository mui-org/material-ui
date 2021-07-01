import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import TimelineConnector, {
  timelineConnectorClasses as classes,
} from '@material-ui/lab/TimelineConnector';

describe('<TimelineConnector />', () => {
  const render = createClientRender();

  describeConformanceV5(<TimelineConnector />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiTimelineConnector',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
