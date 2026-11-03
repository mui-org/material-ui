import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses as classes } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import describeConformance from '../../test/describeConformance';

describe('<TimelineItem />', () => {
  const { render } = createRenderer();

  describeConformance(<TimelineItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    muiName: 'MuiTimelineItem',
    refInstanceof: window.HTMLLIElement,
    skip: ['componentProp', 'themeVariants'],
  }));

  it('flags items rendered without opposite content', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem>
      </Timeline>,
    );

    const [withoutOpposite, withOpposite] = container.querySelectorAll(`.${classes.root}`);
    expect(withoutOpposite).to.have.class(classes.missingOppositeContent);
    expect(withOpposite).not.to.have.class(classes.missingOppositeContent);
  });

  // The spacer selector must stay weak enough that the documented `Timeline`
  // override wins on specificity alone.
  it.skipIf(isJsdom())('lets a Timeline sx override remove the spacer', () => {
    const { container } = render(
      <Timeline sx={{ [`& .${classes.root}:before`]: { flex: 0, padding: 0 } }}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
      </Timeline>,
    );

    const item = container.querySelector(`.${classes.root}`);
    expect(window.getComputedStyle(item, '::before').flexGrow).to.equal('0');
  });

  // The children walk behind `missingOppositeContent` only sees direct
  // children; the spacer's `:has()` also covers nested opposite content.
  it.skipIf(isJsdom())('omits the spacer when opposite content is nested', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <React.Fragment>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
          </React.Fragment>
          <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
      </Timeline>,
    );

    const item = container.querySelector(`.${classes.root}`);
    expect(window.getComputedStyle(item, '::before').content).to.equal('none');
  });
});
