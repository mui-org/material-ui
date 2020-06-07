import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import TimelineItemSeparator from './TimelineItemSeparator';

describe('<TimelineItemSeparator />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineItemSeparator />);
  });

  describeConformance(<TimelineItemSeparator />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
  }));
});
