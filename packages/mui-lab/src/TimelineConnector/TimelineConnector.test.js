import { describe } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import TimelineConnector, { timelineConnectorClasses as classes } from '@mui/lab/TimelineConnector';
import describeConformance from '../../test/describeConformance';

describe('<TimelineConnector />', () => {
  const { render } = createRenderer();

  describeConformance(<TimelineConnector />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiTimelineConnector',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'themeVariants'],
  }));
});
