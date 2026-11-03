import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineContent, { timelineContentClasses as classes } from '@mui/lab/TimelineContent';
import describeConformance from '../../test/describeConformance';

describe('<TimelineContent />', () => {
  const { render } = createRenderer();

  describeConformance(<TimelineContent />, () => ({
    classes,
    inheritComponent: Typography,
    render,
    muiName: 'MuiTimelineContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'themeVariants'],
  }));

  it('should have positionLeft class when inside of a left-positioned timeline', () => {
    render(
      <Timeline position="left">
        <TimelineContent>content</TimelineContent>
      </Timeline>,
    );

    expect(screen.getByText('content')).to.have.class(classes.positionLeft);
  });

  it('should have positionRight class when inside of a right-positioned timeline', () => {
    render(
      <Timeline position="right">
        <TimelineContent>content</TimelineContent>
      </Timeline>,
    );

    expect(screen.getByText('content')).to.have.class(classes.positionRight);
  });

  it('should have positionLeft class when inside of a left-positioned timeline and a left-positioned item', () => {
    render(
      <Timeline position="left">
        <TimelineItem position="left">
          <TimelineContent>content</TimelineContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(screen.getByText('content')).to.have.class(classes.positionLeft);
  });

  it('should have positionLeft class when inside of a right-positioned timeline and a left-positioned item', () => {
    render(
      <Timeline position="right">
        <TimelineItem position="left">
          <TimelineContent>content</TimelineContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(screen.getByText('content')).to.have.class(classes.positionLeft);
  });

  it('should have positionRight class when inside of a left-positioned timeline and a right-positioned item', () => {
    render(
      <Timeline position="left">
        <TimelineItem position="right">
          <TimelineContent>content</TimelineContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(screen.getByText('content')).to.have.class(classes.positionRight);
  });

  it('should have positionRight class when inside of a right-positioned timeline and a right-positioned item', () => {
    render(
      <Timeline position="right">
        <TimelineItem position="right">
          <TimelineContent>content</TimelineContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(screen.getByText('content')).to.have.class(classes.positionRight);
  });
});
