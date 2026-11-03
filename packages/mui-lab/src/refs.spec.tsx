import * as React from 'react';
import { expectType } from '@mui/types';
import type { TabPanelProps } from '@mui/lab/TabPanel';
import TabPanel from '@mui/lab/TabPanel';
import type { TimelineConnectorProps } from '@mui/lab/TimelineConnector';
import TimelineConnector from '@mui/lab/TimelineConnector';
import type { TimelineContentProps } from '@mui/lab/TimelineContent';
import TimelineContent from '@mui/lab/TimelineContent';
import type { TimelineDotProps } from '@mui/lab/TimelineDot';
import TimelineDot from '@mui/lab/TimelineDot';
import type { TimelineItemProps } from '@mui/lab/TimelineItem';
import TimelineItem from '@mui/lab/TimelineItem';
import type { TimelineOppositeContentProps } from '@mui/lab/TimelineOppositeContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import type { TimelineSeparatorProps } from '@mui/lab/TimelineSeparator';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

function TabPanelWrapper(props: TabPanelProps) {
  return <TabPanel {...props} />;
}

function TimelineConnectorWrapper(props: TimelineConnectorProps) {
  return <TimelineConnector {...props} />;
}

function TimelineContentWrapper(props: TimelineContentProps) {
  return <TimelineContent {...props} />;
}

function TimelineDotWrapper(props: TimelineDotProps) {
  return <TimelineDot {...props} />;
}

function TimelineItemWrapper(props: TimelineItemProps) {
  return <TimelineItem {...props} />;
}

function TimelineOppositeContentWrapper(props: TimelineOppositeContentProps) {
  return <TimelineOppositeContent {...props} />;
}

function TimelineSeparatorWrapper(props: TimelineSeparatorProps) {
  return <TimelineSeparator {...props} />;
}

function CallbackRefs() {
  return (
    <React.Fragment>
      <TabPanel value="1" ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
      <TimelineConnector ref={(node) => expectType<HTMLSpanElement | null, typeof node>(node)} />
      <TimelineContent ref={(node) => expectType<HTMLSpanElement | null, typeof node>(node)} />
      <TimelineDot ref={(node) => expectType<HTMLSpanElement | null, typeof node>(node)} />
      <TimelineItem ref={(node) => expectType<HTMLLIElement | null, typeof node>(node)} />
      <TimelineOppositeContent
        ref={(node) => expectType<HTMLSpanElement | null, typeof node>(node)}
      />
      <TimelineSeparator ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
    </React.Fragment>
  );
}

function ComponentRefs() {
  const spanRef = React.createRef<HTMLSpanElement>();
  const divRef = React.createRef<HTMLDivElement>();

  return (
    <React.Fragment>
      <TimelineContent component="span" ref={spanRef} />
      <TimelineOppositeContent component="span" ref={spanRef} />
      <TabPanel value="1" ref={divRef} />
      {/* @ts-expect-error TabPanel renders a div. */}
      <TabPanel value="1" ref={spanRef} />
      {/* @ts-expect-error TimelineItem renders an li. */}
      <TimelineItem ref={divRef} />
      <TimelineContent ref={divRef} />
      <TimelineOppositeContent ref={divRef} />
    </React.Fragment>
  );
}

function TimelineItemEvents() {
  return (
    <TimelineItem
      onClick={(event) => {
        expectType<EventTarget & HTMLLIElement, typeof event.currentTarget>(event.currentTarget);
      }}
    />
  );
}
