import type { LoadingButtonProps } from '../LoadingButton';
import type { TabListProps } from '../TabList';
import type { TabPanelProps } from '../TabPanel';
import type { TimelineConnectorProps } from '../TimelineConnector';
import type { TimelineContentProps } from '../TimelineContent';
import type { TimelineDotProps } from '../TimelineDot';
import type { TimelineItemProps } from '../TimelineItem';
import type { TimelineOppositeContentProps } from '../TimelineOppositeContent';
import type { TimelineProps } from '../Timeline';
import type { TimelineSeparatorProps } from '../TimelineSeparator';
import type { MasonryProps } from '../Masonry';

export interface LabComponentsPropsList {
  MuiLoadingButton: LoadingButtonProps;
  MuiMasonry: MasonryProps;
  MuiTabList: TabListProps;
  MuiTabPanel: TabPanelProps;
  MuiTimeline: TimelineProps;
  MuiTimelineConnector: TimelineConnectorProps;
  MuiTimelineContent: TimelineContentProps;
  MuiTimelineDot: TimelineDotProps;
  MuiTimelineItem: TimelineItemProps;
  MuiTimelineOppositeContent: TimelineOppositeContentProps;
  MuiTimelineSeparator: TimelineSeparatorProps;
}

declare module '@mui/material/styles' {
  interface ComponentsPropsList extends LabComponentsPropsList {}
}

// disable automatic export
export {};
