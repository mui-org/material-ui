import type { LoadingButtonClassKey } from '../LoadingButton';
import type { MasonryClassKey } from '../Masonry';
import type { TabListClassKey } from '../TabList';
import type { TabPanelClassKey } from '../TabPanel';
import type { TimelineClassKey } from '../Timeline';
import type { TimelineConnectorClassKey } from '../TimelineConnector';
import type { TimelineContentClassKey } from '../TimelineContent';
import type { TimelineDotClassKey } from '../TimelineDot';
import type { TimelineItemClassKey } from '../TimelineItem';
import type { TimelineOppositeContentClassKey } from '../TimelineOppositeContent';
import type { TimelineSeparatorClassKey } from '../TimelineSeparator';

// prettier-ignore
export interface LabComponentNameToClassKey {
  MuiLoadingButton: LoadingButtonClassKey;
  MuiMasonry: MasonryClassKey;
  MuiTabList: TabListClassKey;
  MuiTabPanel: TabPanelClassKey;
  MuiTimeline: TimelineClassKey;
  MuiTimelineConnector: TimelineConnectorClassKey;
  MuiTimelineContent: TimelineContentClassKey;
  MuiTimelineDot: TimelineDotClassKey;
  MuiTimelineItem: TimelineItemClassKey;
  MuiTimelineOppositeContent: TimelineOppositeContentClassKey;
  MuiTimelineSeparator: TimelineSeparatorClassKey;
}

declare module '@mui/material/styles' {
  interface ComponentNameToClassKey extends LabComponentNameToClassKey {}
}

// disable automatic export
export {};
