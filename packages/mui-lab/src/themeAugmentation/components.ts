import type {
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants,
  Theme as MuiTheme,
} from '@mui/material/styles';

type Theme = Omit<MuiTheme, 'components'>;

// shut off automatic exporting for the `Theme` above
export {};

export interface LabComponents {
  MuiLoadingButton?:
    | {
        defaultProps?: ComponentsProps['MuiLoadingButton'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiLoadingButton'] | undefined;
        variants?: ComponentsVariants['MuiLoadingButton'] | undefined;
      }
    | undefined;
  MuiMasonry?:
    | {
        defaultProps?: ComponentsProps['MuiMasonry'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiMasonry'] | undefined;
        variants?: ComponentsVariants['MuiMasonry'] | undefined;
      }
    | undefined;
  MuiTabList?:
    | {
        defaultProps?: ComponentsProps['MuiTabList'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTabList'] | undefined;
        variants?: ComponentsVariants['MuiTabList'] | undefined;
      }
    | undefined;
  MuiTabPanel?:
    | {
        defaultProps?: ComponentsProps['MuiTabPanel'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTabPanel'] | undefined;
        variants?: ComponentsVariants['MuiTabPanel'] | undefined;
      }
    | undefined;
  MuiTimeline?:
    | {
        defaultProps?: ComponentsProps['MuiTimeline'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTimeline'] | undefined;
        variants?: ComponentsVariants['MuiTimeline'] | undefined;
      }
    | undefined;
  MuiTimelineConnector?:
    | {
        defaultProps?: ComponentsProps['MuiTimelineConnector'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineConnector'] | undefined;
        variants?: ComponentsVariants['MuiTimelineConnector'] | undefined;
      }
    | undefined;
  MuiTimelineContent?:
    | {
        defaultProps?: ComponentsProps['MuiTimelineContent'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineContent'] | undefined;
        variants?: ComponentsVariants['MuiTimelineContent'] | undefined;
      }
    | undefined;
  MuiTimelineDot?:
    | {
        defaultProps?: ComponentsProps['MuiTimelineDot'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineDot'] | undefined;
        variants?: ComponentsVariants['MuiTimelineDot'] | undefined;
      }
    | undefined;
  MuiTimelineItem?:
    | {
        defaultProps?: ComponentsProps['MuiTimelineItem'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineItem'] | undefined;
        variants?: ComponentsVariants['MuiTimelineItem'] | undefined;
      }
    | undefined;
  MuiTimelineOppositeContent?:
    | {
        defaultProps?: ComponentsProps['MuiTimelineOppositeContent'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineOppositeContent'] | undefined;
        variants?: ComponentsVariants['MuiTimelineOppositeContent'] | undefined;
      }
    | undefined;
  MuiTimelineSeparator?:
    | {
        defaultProps?: ComponentsProps['MuiTimelineSeparator'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineSeparator'] | undefined;
        variants?: ComponentsVariants['MuiTimelineSeparator'] | undefined;
      }
    | undefined;
}

declare module '@mui/material/styles' {
  interface Components extends LabComponents {}
}
