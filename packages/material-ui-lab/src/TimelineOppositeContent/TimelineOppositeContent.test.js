import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent, {
  timelineOppositeContentClasses as classes,
} from '@material-ui/lab/TimelineOppositeContent';

describe('<TimelineOppositeContent />', () => {
  const render = createClientRender();

  describeConformanceV5(<TimelineOppositeContent />, () => ({
    classes,
    inheritComponent: Typography,
    render,
    muiName: 'MuiTimelineOppositeContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));

  it('should have positionLeft class when inside of a left-positioned timeline', () => {
    const { getByText } = render(
      <Timeline position="left">
        <TimelineOppositeContent>content</TimelineOppositeContent>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.positionLeft);
  });

  it('should have positionRight class when inside of a right-positioned timeline', () => {
    const { getByText } = render(
      <Timeline position="right">
        <TimelineOppositeContent>content</TimelineOppositeContent>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.positionRight);
  });

  it('should have positionLeft class when inside of a left-positioned timeline and a left-positioned item', () => {
    const { getByText } = render(
      <Timeline position="left">
        <TimelineItem position="left">
          <TimelineOppositeContent>content</TimelineOppositeContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.positionLeft);
  });

  it('should have positionLeft class when inside of a right-positioned timeline and a left-positioned item', () => {
    const { getByText } = render(
      <Timeline position="right">
        <TimelineItem position="left">
          <TimelineOppositeContent>content</TimelineOppositeContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.positionLeft);
  });

  it('should have positionRight class when inside of a left-positioned timeline and a right-positioned item', () => {
    const { getByText } = render(
      <Timeline position="left">
        <TimelineItem position="right">
          <TimelineOppositeContent>content</TimelineOppositeContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.positionRight);
  });

  it('should have positionRight class when inside of a right-positioned timeline and a right-positioned item', () => {
    const { getByText } = render(
      <Timeline position="right">
        <TimelineItem position="right">
          <TimelineOppositeContent>content</TimelineOppositeContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.positionRight);
  });
});
