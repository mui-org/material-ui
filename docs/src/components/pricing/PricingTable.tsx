import * as React from 'react';
import { alpha, styled, ThemeProvider } from '@mui/material/styles';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useRouter } from 'next/router';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import LaunchRounded from '@mui/icons-material/LaunchRounded';
import UnfoldMoreRounded from '@mui/icons-material/UnfoldMoreRounded';
import { Link } from '@mui/internal-core-docs/Link';
import IconImage from '@mui/internal-core-docs/IconImage';
import { useLicenseModel } from 'docs/src/components/pricing/LicenseModelContext';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { MultiAppSwitchTable } from 'docs/src/components/pricing/MultiAppSwitch';
import InfoPrioritySupport from 'docs/src/components/pricing/InfoPrioritySupport';
import type { PlanName } from './PricingCards';
import { planInfo } from './PricingCards';

// TODO: Collapse should expose an API to customize the duration based on the height.
function transitionTheme(theme: any) {
  return {
    ...theme,
    transitions: {
      ...theme.transitions,
      getAutoHeightDuration: (height: number) => {
        if (!height) {
          return 0;
        }

        const constant = height / 80;
        return Math.round((4 + 15 * constant ** 0.1 + constant / 6) * 10);
      },
    },
  };
}

export function PlanNameTable({
  plan,
  disableDescription = true,
}: {
  plan: PlanName;
  disableDescription?: boolean;
}) {
  const { title, iconName, description } = planInfo[plan];
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pr: 0.5,
        }}
      >
        <IconImage name={iconName} mode="" loading="eager" sx={{ mr: 1 }} /> {title}
      </Typography>
      {!disableDescription && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'baseline',
            mt: 1,
            minHeight: { md: 63 },
          }}
        >
          {description}
        </Typography>
      )}
    </React.Fragment>
  );
}

function Info(props: { value: React.ReactNode; metadata?: React.ReactNode }) {
  const { value, metadata } = props;

  return (
    <React.Fragment>
      {typeof value === 'string' ? (
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {value}
        </Typography>
      ) : (
        value
      )}
      {metadata && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 'normal',
            display: 'block',
            mt: 0.8,
            textAlign: 'center',
          }}
        >
          {metadata}
        </Typography>
      )}
    </React.Fragment>
  );
}

function ColumnHead({
  label,
  metadata,
  tooltip,
  href,
}: {
  label: React.ReactNode | string;
  metadata?: string;
  tooltip?: React.ReactNode | string;
  href?: string;
}) {
  const text = (
    <Typography
      {...(href && {
        component: Link,
        href,
        target: '_blank',
      })}
      variant="body2"
      sx={{
        '&:hover > svg': { color: 'primary.main' },
        ...(href && {
          fontWeight: 500,
          '&:hover > svg': {
            opacity: 1,
            ml: 0.5,
          },
        }),
      }}
    >
      {label}{' '}
      {href && (
        <LaunchRounded color="primary" sx={{ fontSize: 14, opacity: 0, transition: '0.3s' }} />
      )}
      {tooltip && (
        <InfoOutlinedIcon
          sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5, color: 'text.secondary' }}
        />
      )}
    </Typography>
  );
  return (
    <Box
      sx={{
        px: 1,
        alignSelf: 'center',
        justifySelf: 'flex-start',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {tooltip ? (
        <Tooltip title={tooltip} placement="right" describeChild>
          {text}
        </Tooltip>
      ) : (
        text
      )}
      {metadata && (
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', fontWeight: 'normal', display: 'block' }}
        >
          {metadata}
        </Typography>
      )}
    </Box>
  );
}

function ColumnHeadHighlight(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        () => ({
          p: 2,
          pt: 1.5,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '10px 10px 0 0',
          borderWidth: '1px 1px 0 1px',
          borderStyle: 'solid',
          borderColor: 'grey.100',
          background: 'linear-gradient(0deg, rgba(250, 250, 250, 1)  0%, rgba(255,255,255,0) 100%)',
        }),
        (theme) =>
          theme.applyDarkStyles({
            borderColor: 'primaryDark.700',
            background: alpha(theme.palette.primaryDark[700], 0.3),
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function Cell({ highlighted = false, ...props }: BoxProps & { highlighted?: boolean }) {
  return (
    <Box
      {...props}
      sx={[
        {
          py: '16px',
          minHeight: 54,
          px: [1, 2],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        (theme) => ({
          ...(highlighted && {
            borderWidth: '0 1px 0 1px',
            borderStyle: 'solid',
            borderColor: 'grey.100',
            bgcolor: alpha(theme.palette.grey[50], 0.5),
          }),
        }),
        (theme) =>
          theme.applyDarkStyles({
            ...(highlighted && {
              borderColor: 'primaryDark.700',
              bgcolor: alpha(theme.palette.primaryDark[700], 0.3),
            }),
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function RowHead({
  children,
  startIcon,
  ...props
}: BoxProps & { startIcon?: React.ReactElement<unknown> }) {
  return (
    <Box
      {...props}
      sx={[
        {
          justifyContent: 'flex-start',
          borderRadius: '12px 0 0 12px',
          p: 1,
          transition: 'none',
          typography: 'body2',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'grey.50',
          border: '1px solid',
          borderColor: 'divider',
        },
        (theme) =>
          theme.applyDarkStyles({
            bgcolor: 'primaryDark.800',
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {startIcon && <Box sx={{ lineHeight: 0, mr: 1 }}>{startIcon}</Box>}
      {children}
    </Box>
  );
}

const rowHeaders: Record<string, React.ReactNode> = {
  // Core
  'Base UI': (
    <ColumnHead
      label="Base UI"
      tooltip="A library of headless ('unstyled') React UI components and low-level hooks, available in @base-ui/react."
    />
  ),
  'MUI System': (
    <ColumnHead
      label="MUI System"
      tooltip="CSS utilities for rapidly laying out custom designs, available in @mui/system."
    />
  ),
  'Material UI': (
    <ColumnHead
      label="Material UI"
      tooltip="A library of React UI components that implements Google's Material Design, available in @mui/material."
    />
  ),
  'Joy UI': (
    <ColumnHead
      label="Joy UI"
      tooltip="A library of beautifully designed React UI components, available in @mui/joy."
    />
  ),
  // Advanced
  'data-grid/column-groups': (
    <ColumnHead label="Column groups" href="/x/react-data-grid/column-groups/" />
  ),
  'data-grid/column-spanning': (
    <ColumnHead label="Column spanning" href="/x/react-data-grid/column-spanning/" />
  ),
  'data-grid/column-resizing': (
    <ColumnHead label="Column resizing" href="/x/react-data-grid/column-dimensions/#resizing" />
  ),
  'data-grid/column-autosizing': (
    <ColumnHead label="Column autosizing" href="/x/react-data-grid/column-dimensions/#autosizing" />
  ),
  'data-grid/column-reorder': (
    <ColumnHead label="Column ordering" href="/x/react-data-grid/column-ordering/" />
  ),
  'data-grid/column-pinning': (
    <ColumnHead label="Column pinning" href="/x/react-data-grid/column-pinning/" />
  ),
  'data-grid/column-sorting': (
    <ColumnHead label="Column sorting" href="/x/react-data-grid/sorting/" />
  ),
  'data-grid/multi-column-sorting': (
    <ColumnHead label="Multi-column sorting" href="/x/react-data-grid/sorting/#multi-sorting" />
  ),
  'data-grid/row-height': <ColumnHead label="Row height" href="/x/react-data-grid/row-height/" />,
  'data-grid/row-spanning': (
    <ColumnHead label="Row spanning" href="/x/react-data-grid/row-spanning/" />
  ),
  'data-grid/row-reordering': (
    <ColumnHead label="Row reordering" href="/x/react-data-grid/row-ordering/" />
  ),
  'data-grid/row-pinning': (
    <ColumnHead label="Row pinning" href="/x/react-data-grid/row-pinning/" />
  ),
  'data-grid/row-selection': (
    <ColumnHead label="Row selection" href="/x/react-data-grid/row-selection/" />
  ),
  'data-grid/row-multiselection': (
    <ColumnHead
      label="Multi-row selection"
      href="/x/react-data-grid/row-selection/#multiple-row-selection"
    />
  ),
  'data-grid/row-cell-selection': (
    <ColumnHead label="Cell selection (and Range)" href="/x/react-data-grid/cell-selection/" />
  ),
  'data-grid/filter-column': (
    <ColumnHead label="Column filters" href="/x/react-data-grid/filtering/" />
  ),
  'data-grid/filter-quick': (
    <ColumnHead label="Quick filter (Search)" href="/x/react-data-grid/filtering/quick-filter/" />
  ),
  'data-grid/header-filters': (
    <ColumnHead label="Header filters" href="/x/react-data-grid/filtering/header-filters/" />
  ),
  'data-grid/filter-multicolumn': (
    <ColumnHead label="Multi-column filtering" href="/x/react-data-grid/filtering/multi-filters/" />
  ),
  'data-grid/pagination': <ColumnHead label="Pagination" href="/x/react-data-grid/pagination/" />,
  'data-grid/pagination-large': (
    <ColumnHead
      label="Pagination > 100 rows per page"
      href="/x/react-data-grid/pagination/#size-of-the-page"
    />
  ),
  'data-grid/edit-row': (
    <ColumnHead label="Row editing" href="/x/react-data-grid/editing/#row-editing" />
  ),
  'data-grid/edit-cell': (
    <ColumnHead label="Cell editing" href="/x/react-data-grid/editing/#cell-editing" />
  ),
  'data-grid/file-csv': (
    <ColumnHead label="CSV export" href="/x/react-data-grid/export/#csv-export" />
  ),
  'data-grid/file-print': (
    <ColumnHead label="Print" href="/x/react-data-grid/export/#print-export" />
  ),
  'data-grid/file-clipboard-copy': (
    <ColumnHead label="Clipboard copy" href="/x/react-data-grid/clipboard/#clipboard-copy" />
  ),
  'data-grid/file-clipboard-paste': (
    <ColumnHead label="Clipboard paste" href="/x/react-data-grid/clipboard/#clipboard-paste" />
  ),
  'data-grid/file-excel': (
    <ColumnHead label="Excel export" href="/x/react-data-grid/export/#excel-export" />
  ),
  'data-grid/customizable-components': (
    <ColumnHead label="Customizable components" href="/x/react-data-grid/components/" />
  ),
  'data-grid/virtualize-column': (
    <ColumnHead
      label="Column virtualization"
      href="/x/react-data-grid/virtualization/#column-virtualization"
    />
  ),
  'data-grid/virtualize-row': (
    <ColumnHead
      label="Row virtualization > 100 rows"
      href="/x/react-data-grid/virtualization/#row-virtualization"
    />
  ),
  'data-grid/tree-data': <ColumnHead label="Tree data" href="/x/react-data-grid/tree-data/" />,
  'data-grid/master-detail': (
    <ColumnHead label="Master detail" href="/x/react-data-grid/master-detail/" />
  ),
  'data-grid/grouping': (
    <ColumnHead label="Row grouping" href="https://mui.com/x/react-data-grid/row-grouping/" />
  ),
  'data-grid/aggregation': (
    <ColumnHead label="Aggregation" href="/x/react-data-grid/aggregation/" />
  ),
  'data-grid/pivoting': <ColumnHead label="Pivoting" href="/x/react-data-grid/pivoting/" />,
  'data-grid/accessibility': (
    <ColumnHead label="Accessibility" href="/x/react-data-grid/accessibility/" />
  ),
  'data-grid/keyboard-nav': (
    <ColumnHead
      label="Keyboard navigation"
      href="/x/react-data-grid/accessibility/#keyboard-navigation"
    />
  ),
  'data-grid/localization': (
    <ColumnHead label="Localization" href="/x/react-data-grid/localization/" />
  ),
  'date-picker/simple': (
    <ColumnHead label="Date and Time Pickers" href="/x/react-date-pickers/date-picker/" />
  ),
  'date-picker/range': (
    <ColumnHead
      label="Date and Time Range Pickers"
      href="/x/react-date-pickers/date-range-picker/"
    />
  ),
  // charts - components
  'charts/line': <ColumnHead label="Line chart" href="/x/react-charts/lines/" />,
  'charts/bar': <ColumnHead label="Bar chart" href="/x/react-charts/bars/" />,
  'charts/scatter': <ColumnHead label="Scatter chart" href="/x/react-charts/scatter/" />,
  'charts/pie': <ColumnHead label="Pie chart" href="/x/react-charts/pie/" />,
  'charts/sparkline': <ColumnHead label="Sparkline" href="/x/react-charts/sparkline/" />,
  'charts/gauge': <ColumnHead label="Gauge" href="/x/react-charts/gauge/" />,
  'charts/heatmap': <ColumnHead label="Heatmap" href="/x/react-charts/heatmap/" />,
  'charts/treemap': <ColumnHead label="Treemap" href="/x/react-charts/treemap/" />,
  'charts/radar': <ColumnHead label="Radar" href="/x/react-charts/radar/" />,
  'charts/funnel': <ColumnHead label="Funnel" href="/x/react-charts/funnel/" />,
  'charts/sankey': <ColumnHead label="Sankey" href="/x/react-charts/sankey/" />,
  'charts/gantt': <ColumnHead label="Gantt" href="/x/react-charts/gantt/" />,
  'charts/gantt-advanced': <ColumnHead label="Advanced Gantt" />,
  'charts/candlestick': <ColumnHead label="Candlestick" />,
  'charts/large-dataset': <ColumnHead label="Large dataset with canvas" />,
  // charts - features
  'charts/legend': <ColumnHead label="Legend" href="/x/react-charts/legend/" />,
  'charts/tooltip': <ColumnHead label="Tooltip" href="/x/react-charts/tooltip/" />,
  'charts/zoom-and-pan': <ColumnHead label="Zoom & Pan" href="/x/react-charts/zoom-and-pan/" />,
  'charts/export': <ColumnHead label="Export" href="/x/react-charts/export/" />,
  // charts - datagrid
  'charts/cell-with-charts': (
    <ColumnHead label="Cell with chart" href="/x/react-data-grid/custom-columns/#sparkline" />
  ),
  'charts/filter-interaction': <ColumnHead label="Row filtering" />,
  'charts/selection-interaction': <ColumnHead label="Range selection" />,
  // Treeview - components
  'tree-view/simple-tree-view': (
    <ColumnHead label="Simple Tree View" href="/x/react-tree-view/simple-tree-view/items/" />
  ),
  'tree-view/rich-tree-view': (
    <ColumnHead label="Rich Tree View" href="/x/react-tree-view/rich-tree-view/items/" />
  ),

  // Treeview - advanced features
  'tree-view/selection': (
    <ColumnHead
      label="Item Selection"
      href="/x/react-tree-view/simple-tree-view/selection/#single-selection"
    />
  ),
  'tree-view/multi-selection': (
    <ColumnHead
      label="Multi Selection"
      href="/x/react-tree-view/simple-tree-view/selection/#multi-selection"
    />
  ),
  'tree-view/inline-editing': (
    <ColumnHead label="Inline label editing" href="/x/react-tree-view/rich-tree-view/editing/" />
  ),
  'tree-view/drag-to-reorder': (
    <ColumnHead label="Drag to reorder" href="/x/react-tree-view/rich-tree-view/ordering/" />
  ),
  'tree-view/virtualization': <ColumnHead label="Virtualization" />,

  // Scheduler
  'scheduler/event-calendar': <ColumnHead label="Event Calendar" href="/x/react-scheduler/" />,
  'scheduler/event-timeline': <ColumnHead label="Event Timeline" href="/x/react-scheduler/" />,
  // Scheduler - Event Calendar
  'scheduler/calendar-views': (
    <ColumnHead
      label="Calendar views (day, week, month, agenda)"
      href="/x/react-scheduler/event-calendar/views/"
    />
  ),
  'scheduler/calendar-year-view': (
    <ColumnHead label="Year view" href="/x/react-scheduler/event-calendar/views/#year-view" />
  ),
  'scheduler/calendar-drag-and-drop': (
    <ColumnHead label="Drag & drop" href="/x/react-scheduler/event-calendar/drag-interactions/" />
  ),
  'scheduler/calendar-resources': (
    <ColumnHead label="Resource management" href="/x/react-scheduler/event-calendar/resources/" />
  ),
  'scheduler/calendar-timezone': (
    <ColumnHead label="Timezone support" href="/x/react-scheduler/timezone/" />
  ),
  'scheduler/calendar-editing': (
    <ColumnHead
      label="Event editing, creation & deletion"
      href="/x/react-scheduler/event-calendar/editing/"
    />
  ),
  'scheduler/calendar-recurring-events': (
    <ColumnHead label="Recurring events" href="/x/react-scheduler/recurring-events/" />
  ),
  'scheduler/calendar-lazy-loading': (
    <ColumnHead label="Lazy loading" href="/x/react-scheduler/event-calendar/lazy-loading/" />
  ),
  'scheduler/calendar-resource-view': (
    <ColumnHead
      label="Resource views"
      href="/x/react-scheduler/event-calendar/views/#resource-views"
    />
  ),
  'scheduler/calendar-constraints': (
    <ColumnHead
      label="Event constraints"
      href="/x/react-scheduler/event-calendar/events/#event-constraints"
    />
  ),
  'scheduler/calendar-copy-paste-events': (
    <ColumnHead
      label="Copy & paste events"
      href="/x/react-scheduler/event-calendar/editing/#copy-paste-events"
    />
  ),
  'scheduler/calendar-undo-redo': (
    <ColumnHead label="Undo / Redo" href="/x/react-scheduler/event-calendar/editing/#undo-redo" />
  ),
  'scheduler/calendar-search-filtering': (
    <ColumnHead label="Search & filtering" href="/x/react-scheduler/event-calendar/filtering/" />
  ),
  'scheduler/calendar-import-export': (
    <ColumnHead label="Import & export" href="/x/react-scheduler/event-calendar/import-export/" />
  ),
  'scheduler/calendar-accessibility': <ColumnHead label="Accessibility & keyboard navigation" />,
  'scheduler/calendar-localization': (
    <ColumnHead label="Localization" href="/x/react-scheduler/event-calendar/localization/" />
  ),
  // Scheduler - Event Timeline
  'scheduler/timeline-views': (
    <ColumnHead label="Timeline views" href="/x/react-scheduler/event-timeline/presets/" />
  ),
  'scheduler/timeline-drag-and-drop': (
    <ColumnHead label="Drag & drop" href="/x/react-scheduler/event-timeline/drag-interactions/" />
  ),
  'scheduler/timeline-resources': (
    <ColumnHead label="Resource management" href="/x/react-scheduler/event-timeline/resources/" />
  ),
  'scheduler/timeline-timezone': (
    <ColumnHead label="Timezone support" href="/x/react-scheduler/timezone/" />
  ),
  'scheduler/timeline-editing': (
    <ColumnHead
      label="Event editing, creation & deletion"
      href="/x/react-scheduler/event-timeline/editing/"
    />
  ),
  'scheduler/timeline-recurring-events': (
    <ColumnHead label="Recurring events" href="/x/react-scheduler/recurring-events/" />
  ),
  'scheduler/timeline-lazy-loading': (
    <ColumnHead label="Lazy loading" href="/x/react-scheduler/event-timeline/lazy-loading/" />
  ),
  'scheduler/timeline-zooming': (
    <ColumnHead
      label="Zoom in/out"
      href="/x/react-scheduler/event-timeline/presets/#zoom-in-and-out"
    />
  ),
  'scheduler/timeline-virtualization': (
    <ColumnHead label="Virtualization" href="/x/react-scheduler/event-timeline/virtualization/" />
  ),
  'scheduler/timeline-constraints': (
    <ColumnHead
      label="Event constraints"
      href="/x/react-scheduler/event-timeline/events/#event-constraints"
    />
  ),
  'scheduler/timeline-copy-paste-events': (
    <ColumnHead
      label="Copy & paste events"
      href="/x/react-scheduler/event-timeline/editing/#copy-paste-events"
    />
  ),
  'scheduler/timeline-undo-redo': (
    <ColumnHead label="Undo / Redo" href="/x/react-scheduler/event-timeline/editing/#undo-redo" />
  ),
  'scheduler/timeline-search-filtering': (
    <ColumnHead label="Search & filtering" href="/x/react-scheduler/event-timeline/filtering/" />
  ),
  'scheduler/timeline-import-export': (
    <ColumnHead label="Import & export" href="/x/react-scheduler/event-timeline/import-export/" />
  ),
  'scheduler/timeline-accessibility': <ColumnHead label="Accessibility & keyboard navigation" />,
  'scheduler/timeline-localization': (
    <ColumnHead label="Localization" href="/x/react-scheduler/event-timeline/localization/" />
  ),

  'mui-x-production': <ColumnHead label="Perpetual use in production" />,
  'mui-x-development': <ColumnHead label="Development license" tooltip="For active development" />,
  'mui-x-development-perpetual': (
    <ColumnHead label="Development license" tooltip="For active development" />
  ),
  'mui-x-updates': <ColumnHead label="Access to new releases" />,
  // Support
  'core-support': (
    <ColumnHead
      {...{
        label: (
          <React.Fragment>
            Technical support for <Box component="span" sx={{ display: ['none', 'block'] }} />
            MUI Core
          </React.Fragment>
        ),
        tooltip:
          'Support for MUI Core (for example Material UI) is provided by the community. MUI Core maintainers focus on solving root issues to support the community at large.',
      }}
    />
  ),
  'x-support': (
    <ColumnHead
      {...{
        label: (
          <React.Fragment>
            Technical support for <Box component="span" sx={{ display: ['none', 'block'] }} />
            MUI X
          </React.Fragment>
        ),
        tooltip:
          'You can ask for technical support, report bugs and submit unlimited feature requests to the advanced components. We take your subscription plan as one of the prioritization criteria.',
      }}
    />
  ),
  'priority-support': (
    <ColumnHead
      {...{
        label: 'Priority Support',
        tooltip: (
          <React.Fragment>
            The highest level of support with 1 business day response time, pre-screening and issue
            escalation. More details in the{' '}
            <Link
              href="https://mui.com/legal/technical-support-sla/#priority-support"
              target="_blank"
              color="inherit"
              underline="always"
            >
              Technical Support SLA
            </Link>
            .
          </React.Fragment>
        ),
      }}
    />
  ),
  'tech-advisory': (
    <ColumnHead
      {...{
        label: 'Technical advisory',
        metadata: 'Subject to fair use policy',
        tooltip: 'Get the advice you need, from the people who build the product.',
      }}
    />
  ),
  'support-duration': (
    <ColumnHead
      {...{ label: 'Support duration', tooltip: 'Covers the duration of your subscription.' }}
    />
  ),
  'response-time': (
    <ColumnHead
      {...{
        label: 'Guaranteed response time',
        tooltip: 'Maximum lead time for each response, only working days are counted.',
      }}
    />
  ),
  'pre-screening': (
    <ColumnHead
      {...{
        label: 'Pre-screening',
        tooltip:
          'Ensure we have enough details in the ticket you submitted so our support team can work on it.',
      }}
    />
  ),
  'issue-escalation': (
    <ColumnHead
      {...{
        label: 'Issue escalation',
        tooltip: 'Escalate your tickets to highest priority in our support queue.',
      }}
    />
  ),
  'security-questionnaire': (
    <ColumnHead
      {...{
        label: (
          <React.Fragment>
            Security questionnaire & <Box component="span" sx={{ display: ['none', 'block'] }} />
            custom agreements
          </React.Fragment>
        ),
      }}
    />
  ),
  'customer-success': (
    <ColumnHead
      {...{
        label: 'Customer Success Manager',
        tooltip: 'A dedicated person to help you get the most out of MUI products.',
      }}
    />
  ),
};

const yes = <IconImage name="pricing/yes" title="Included" />;
const pending = <IconImage name="pricing/time" title="Work in progress" />;
const no = <IconImage name="pricing/no" title="Not included" />;
const toBeDefined = (
  <Typography
    component={Link}
    href="https://forms.gle/19vN87eBvmXPjBVp6"
    target="_blank"
    variant="body2"
    sx={{ '&:hover > svg': { color: 'primary.main', opacity: 1 }, fontWeight: 500, pl: '16px' }}
    title="To be determined"
  >
    TBD
    <LaunchRounded color="primary" sx={{ fontSize: 14, ml: 0.5, opacity: 0, transition: '0.3s' }} />
  </Typography>
);

const communityData: Record<string, React.ReactNode> = {
  // Core open-source libraries
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  // data grid - columns
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': yes,
  'data-grid/column-autosizing': yes,
  'data-grid/column-reorder': no,
  'data-grid/column-pinning': no,
  // data grid - rows
  'data-grid/row-height': yes,
  'data-grid/row-spanning': yes,
  'data-grid/row-reordering': no,
  'data-grid/row-pinning': no,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': no,
  'data-grid/row-cell-selection': no,
  // data grid - filter
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/header-filters': no,
  'data-grid/filter-multicolumn': no,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': no,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': no,
  // data grid - edit
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  // data grid - export
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard-copy': yes,
  'data-grid/file-clipboard-paste': no,
  'data-grid/file-excel': no,
  'data-grid/customizable-components': yes,
  'data-grid/virtualize-column': yes,
  'data-grid/virtualize-row': no,
  'data-grid/tree-data': no,
  'data-grid/master-detail': no,
  'data-grid/grouping': no,
  'data-grid/aggregation': no,
  'data-grid/pivoting': no,
  'data-grid/accessibility': yes,
  'data-grid/keyboard-nav': yes,
  'data-grid/localization': yes,
  // picker
  'date-picker/simple': yes,
  'date-picker/range': no,
  // charts - components
  'charts/line': yes,
  'charts/bar': yes,
  'charts/scatter': yes,
  'charts/pie': yes,
  'charts/sparkline': yes,
  'charts/gauge': yes,
  'charts/heatmap': no,
  'charts/treemap': no,
  'charts/radar': yes,
  'charts/funnel': no,
  'charts/sankey': no,
  'charts/gantt': no,
  'charts/gantt-advanced': no,
  'charts/candlestick': no,
  'charts/large-dataset': no,
  // charts - features
  'charts/legend': yes,
  'charts/tooltip': yes,
  'charts/zoom-and-pan': no,
  'charts/export': no,
  // charts - datagrid
  'charts/cell-with-charts': yes,
  'charts/filter-interaction': no,
  'charts/selection-interaction': no,
  // Tree View
  'tree-view/simple-tree-view': yes,
  'tree-view/rich-tree-view': yes,
  'tree-view/selection': yes,
  'tree-view/multi-selection': yes,
  'tree-view/inline-editing': yes,
  'tree-view/drag-to-reorder': no,
  'tree-view/virtualization': no,
  // Scheduler
  'scheduler/event-calendar': yes,
  'scheduler/event-timeline': no,
  // Scheduler - Event Calendar
  'scheduler/calendar-views': yes,
  'scheduler/calendar-year-view': pending,
  'scheduler/calendar-drag-and-drop': yes,
  'scheduler/calendar-resources': yes,
  'scheduler/calendar-timezone': yes,
  'scheduler/calendar-editing': yes,
  'scheduler/calendar-recurring-events': no,
  'scheduler/calendar-lazy-loading': no,
  'scheduler/calendar-resource-view': no,
  'scheduler/calendar-constraints': pending,
  'scheduler/calendar-copy-paste-events': pending,
  'scheduler/calendar-undo-redo': pending,
  'scheduler/calendar-search-filtering': no,
  'scheduler/calendar-import-export': no,
  'scheduler/calendar-accessibility': yes,
  'scheduler/calendar-localization': yes,
  // Scheduler - Event Timeline
  'scheduler/timeline-views': no,
  'scheduler/timeline-drag-and-drop': no,
  'scheduler/timeline-resources': no,
  'scheduler/timeline-timezone': no,
  'scheduler/timeline-editing': no,
  'scheduler/timeline-recurring-events': no,
  'scheduler/timeline-lazy-loading': no,
  'scheduler/timeline-zooming': no,
  'scheduler/timeline-virtualization': no,
  'scheduler/timeline-constraints': no,
  'scheduler/timeline-copy-paste-events': no,
  'scheduler/timeline-undo-redo': no,
  'scheduler/timeline-search-filtering': no,
  'scheduler/timeline-import-export': no,
  'scheduler/timeline-accessibility': no,
  'scheduler/timeline-localization': no,
  // general
  'mui-x-production': yes,
  'mui-x-updates': yes,
  'mui-x-development': yes,
  'mui-x-development-perpetual': yes,
  // Support
  'core-support': <Info value="Community" />,
  'x-support': <Info value="Community" />,
  'priority-support': no,
  'customer-success': no,
  'tech-advisory': no,
  'support-duration': no,
  'response-time': no,
  'pre-screening': no,
  'issue-escalation': no,
  'security-questionnaire': no,
};

const proData: Record<string, React.ReactNode> = {
  // Core
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  // data grid - columns
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': yes,
  'data-grid/column-autosizing': yes,
  'data-grid/column-reorder': yes,
  'data-grid/column-pinning': yes,
  // data grid - rows
  'data-grid/row-height': yes,
  'data-grid/row-spanning': yes,
  'data-grid/row-reordering': yes,
  'data-grid/row-pinning': yes,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': yes,
  'data-grid/row-cell-selection': no,
  // data grid - filter
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/header-filters': yes,
  'data-grid/filter-multicolumn': yes,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': yes,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': yes,
  // data grid - edit
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  // data grid - export
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard-copy': yes,
  'data-grid/file-clipboard-paste': no,
  'data-grid/file-excel': no,
  'data-grid/customizable-components': yes,
  'data-grid/virtualize-column': yes,
  'data-grid/virtualize-row': yes,
  'data-grid/tree-data': yes,
  'data-grid/master-detail': yes,
  'data-grid/grouping': no,
  'data-grid/aggregation': no,
  'data-grid/pivoting': no,
  'data-grid/accessibility': yes,
  'data-grid/keyboard-nav': yes,
  'data-grid/localization': yes,
  'date-picker/simple': yes,
  'date-picker/range': yes,

  // charts - components
  'charts/line': yes,
  'charts/bar': yes,
  'charts/scatter': yes,
  'charts/pie': yes,
  'charts/sparkline': yes,
  'charts/gauge': yes,
  'charts/heatmap': yes,
  'charts/treemap': pending,

  'charts/radar': yes,
  'charts/funnel': yes,
  'charts/sankey': yes,
  'charts/gantt': no,
  'charts/gantt-advanced': no,
  'charts/candlestick': no,
  'charts/large-dataset': no,
  // charts - features
  'charts/legend': yes,
  'charts/tooltip': yes,
  'charts/zoom-and-pan': yes,
  'charts/export': yes,
  // charts - datagrid
  'charts/cell-with-charts': yes,
  'charts/filter-interaction': pending,
  'charts/selection-interaction': no,
  // Tree View
  'tree-view/simple-tree-view': yes,
  'tree-view/rich-tree-view': yes,
  'tree-view/selection': yes,
  'tree-view/multi-selection': yes,
  'tree-view/inline-editing': yes,
  'tree-view/drag-to-reorder': yes,
  'tree-view/virtualization': pending,
  // Scheduler
  'scheduler/event-calendar': no,
  'scheduler/event-timeline': no,
  // Scheduler - Event Calendar
  'scheduler/calendar-views': no,
  'scheduler/calendar-year-view': no,
  'scheduler/calendar-drag-and-drop': no,
  'scheduler/calendar-resources': no,
  'scheduler/calendar-timezone': no,
  'scheduler/calendar-editing': no,
  'scheduler/calendar-recurring-events': no,
  'scheduler/calendar-lazy-loading': no,
  'scheduler/calendar-resource-view': no,
  'scheduler/calendar-constraints': no,
  'scheduler/calendar-copy-paste-events': no,
  'scheduler/calendar-undo-redo': no,
  'scheduler/calendar-search-filtering': no,
  'scheduler/calendar-import-export': no,
  'scheduler/calendar-accessibility': no,
  'scheduler/calendar-localization': no,
  // Scheduler - Event Timeline
  'scheduler/timeline-views': no,
  'scheduler/timeline-drag-and-drop': no,
  'scheduler/timeline-resources': no,
  'scheduler/timeline-timezone': no,
  'scheduler/timeline-editing': no,
  'scheduler/timeline-recurring-events': no,
  'scheduler/timeline-lazy-loading': no,
  'scheduler/timeline-zooming': no,
  'scheduler/timeline-virtualization': no,
  'scheduler/timeline-constraints': no,
  'scheduler/timeline-copy-paste-events': no,
  'scheduler/timeline-undo-redo': no,
  'scheduler/timeline-search-filtering': no,
  'scheduler/timeline-import-export': no,
  'scheduler/timeline-accessibility': no,
  'scheduler/timeline-localization': no,
  // general
  'mui-x-production': yes,
  'mui-x-development': <Info value="1 year" />,
  'mui-x-development-perpetual': <Info value="Perpetual" />,
  'mui-x-updates': <Info value="1 year" />,
  // Support
  'core-support': <Info value="Community" />,
  'x-support': <Info value={yes} metadata="Priority over Community" />,
  'priority-support': no,
  'customer-success': no,
  'tech-advisory': no,
  'support-duration': <Info value="1 year" />,
  'response-time': no,
  'pre-screening': no,
  'issue-escalation': no,
  'security-questionnaire': <Info value="Available for orders of $12,000 and above" />,
};

const premiumData: Record<string, React.ReactNode> = {
  // Core
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  // data grid - columns
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': yes,
  'data-grid/column-autosizing': yes,
  'data-grid/column-reorder': yes,
  'data-grid/column-pinning': yes,
  // data grid - rows
  'data-grid/row-height': yes,
  'data-grid/row-spanning': yes,
  'data-grid/row-reordering': yes,
  'data-grid/row-pinning': yes,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': yes,
  'data-grid/row-cell-selection': yes,
  // data grid - filter
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/header-filters': yes,
  'data-grid/filter-multicolumn': yes,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': yes,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': yes,
  // data grid - edit
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  // data grid - export
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard-copy': yes,
  'data-grid/file-clipboard-paste': yes,
  'data-grid/file-excel': yes,
  'data-grid/customizable-components': yes,
  'data-grid/virtualize-column': yes,
  'data-grid/virtualize-row': yes,
  'data-grid/tree-data': yes,
  'data-grid/master-detail': yes,
  'data-grid/grouping': yes,
  'data-grid/aggregation': yes,
  'data-grid/pivoting': yes,
  'data-grid/accessibility': yes,
  'data-grid/keyboard-nav': yes,
  'data-grid/localization': yes,
  'date-picker/simple': yes,
  'date-picker/range': yes,

  // charts - components
  'charts/line': yes,
  'charts/bar': yes,
  'charts/scatter': yes,
  'charts/pie': yes,
  'charts/sparkline': yes,
  'charts/gauge': yes,
  'charts/heatmap': yes,
  'charts/treemap': pending,
  'charts/radar': yes,
  'charts/funnel': yes,
  'charts/sankey': yes,
  'charts/gantt': pending,
  'charts/gantt-advanced': toBeDefined,
  'charts/candlestick': toBeDefined,
  'charts/large-dataset': toBeDefined,
  // charts - features
  'charts/legend': yes,
  'charts/tooltip': yes,
  'charts/zoom-and-pan': yes,
  'charts/export': yes,
  // charts - datagrid
  'charts/cell-with-charts': yes,
  'charts/filter-interaction': pending,
  'charts/selection-interaction': pending,
  // Tree View
  'tree-view/simple-tree-view': yes,
  'tree-view/rich-tree-view': yes,
  'tree-view/selection': yes,
  'tree-view/multi-selection': yes,
  'tree-view/inline-editing': yes,
  'tree-view/drag-to-reorder': yes,
  'tree-view/virtualization': pending,
  // Scheduler
  'scheduler/event-calendar': yes,
  'scheduler/event-timeline': yes,
  // Scheduler - Event Calendar
  'scheduler/calendar-views': yes,
  'scheduler/calendar-year-view': pending,
  'scheduler/calendar-drag-and-drop': yes,
  'scheduler/calendar-resources': yes,
  'scheduler/calendar-timezone': yes,
  'scheduler/calendar-editing': yes,
  'scheduler/calendar-recurring-events': yes,
  'scheduler/calendar-lazy-loading': yes,
  'scheduler/calendar-resource-view': pending,
  'scheduler/calendar-constraints': pending,
  'scheduler/calendar-copy-paste-events': pending,
  'scheduler/calendar-undo-redo': pending,
  'scheduler/calendar-search-filtering': pending,
  'scheduler/calendar-import-export': pending,
  'scheduler/calendar-accessibility': yes,
  'scheduler/calendar-localization': yes,
  // Scheduler - Event Timeline
  'scheduler/timeline-views': yes,
  'scheduler/timeline-drag-and-drop': yes,
  'scheduler/timeline-resources': yes,
  'scheduler/timeline-timezone': yes,
  'scheduler/timeline-editing': yes,
  'scheduler/timeline-recurring-events': yes,
  'scheduler/timeline-lazy-loading': pending,
  'scheduler/timeline-zooming': pending,
  'scheduler/timeline-virtualization': pending,
  'scheduler/timeline-constraints': pending,
  'scheduler/timeline-copy-paste-events': pending,
  'scheduler/timeline-undo-redo': pending,
  'scheduler/timeline-search-filtering': pending,
  'scheduler/timeline-import-export': pending,
  'scheduler/timeline-accessibility': yes,
  'scheduler/timeline-localization': yes,
  // general
  'mui-x-production': yes,
  'mui-x-development': <Info value="1 year" />,
  'mui-x-development-perpetual': <Info value="Perpetual" />,
  'mui-x-updates': <Info value="1 year" />,
  // Support
  'core-support': <InfoPrioritySupport value={yes} value2="Community" />,
  'x-support': <Info value={yes} metadata="Priority over Pro" />,
  'multi-app': <MultiAppSwitchTable />,
  'tech-advisory': pending,
  'support-duration': <Info value="1 year" />,
  'response-time': <InfoPrioritySupport value={yes} metadata="1 business day" value2={no} />,
  'pre-screening': <InfoPrioritySupport value={yes} metadata="4 hours" value2={no} />,
  'issue-escalation': <InfoPrioritySupport value={yes} value2={no} />,
  'security-questionnaire': <Info value="Available for orders of $12,000 and above" />,
  'customer-success': no,
};

const enterpriseData: Record<string, React.ReactNode> = {
  // Core
  'Base UI': yes,
  'MUI System': yes,
  'Material UI': yes,
  'Joy UI': yes,
  // MUI X
  // data grid - columns
  'data-grid/column-groups': yes,
  'data-grid/column-spanning': yes,
  'data-grid/column-resizing': yes,
  'data-grid/column-autosizing': yes,
  'data-grid/column-reorder': yes,
  'data-grid/column-pinning': yes,
  // data grid - rows
  'data-grid/row-height': yes,
  'data-grid/row-spanning': yes,
  'data-grid/row-reordering': yes,
  'data-grid/row-pinning': yes,
  'data-grid/row-selection': yes,
  'data-grid/row-multiselection': yes,
  'data-grid/row-cell-selection': yes,
  // data grid - filter
  'data-grid/filter-quick': yes,
  'data-grid/filter-column': yes,
  'data-grid/header-filters': yes,
  'data-grid/filter-multicolumn': yes,
  'data-grid/column-sorting': yes,
  'data-grid/multi-column-sorting': yes,
  'data-grid/pagination': yes,
  'data-grid/pagination-large': yes,
  // data grid - edit
  'data-grid/edit-row': yes,
  'data-grid/edit-cell': yes,
  // data grid - export
  'data-grid/file-csv': yes,
  'data-grid/file-print': yes,
  'data-grid/file-clipboard-copy': yes,
  'data-grid/file-clipboard-paste': yes,
  'data-grid/file-excel': yes,
  'data-grid/customizable-components': yes,
  'data-grid/virtualize-column': yes,
  'data-grid/virtualize-row': yes,
  'data-grid/tree-data': yes,
  'data-grid/master-detail': yes,
  'data-grid/grouping': yes,
  'data-grid/aggregation': yes,
  'data-grid/pivoting': yes,
  'data-grid/accessibility': yes,
  'data-grid/keyboard-nav': yes,
  'data-grid/localization': yes,
  'date-picker/simple': yes,
  'date-picker/range': yes,

  // charts - components
  'charts/line': yes,
  'charts/bar': yes,
  'charts/scatter': yes,
  'charts/pie': yes,
  'charts/sparkline': yes,
  'charts/gauge': yes,
  'charts/heatmap': yes,
  'charts/treemap': pending,
  'charts/radar': yes,
  'charts/funnel': yes,
  'charts/sankey': yes,
  'charts/gantt': pending,
  'charts/gantt-advanced': toBeDefined,
  'charts/candlestick': toBeDefined,
  'charts/large-dataset': toBeDefined,
  // charts - features
  'charts/legend': yes,
  'charts/tooltip': yes,
  'charts/zoom-and-pan': yes,
  'charts/export': yes,
  // charts - datagrid
  'charts/cell-with-charts': yes,
  'charts/filter-interaction': pending,
  'charts/selection-interaction': pending,
  // Tree View
  'tree-view/simple-tree-view': yes,
  'tree-view/rich-tree-view': yes,
  'tree-view/selection': yes,
  'tree-view/multi-selection': yes,
  'tree-view/inline-editing': yes,
  'tree-view/drag-to-reorder': yes,
  'tree-view/virtualization': pending,
  // Scheduler
  'scheduler/event-calendar': yes,
  'scheduler/event-timeline': yes,
  // Scheduler - Event Calendar
  'scheduler/calendar-views': yes,
  'scheduler/calendar-year-view': pending,
  'scheduler/calendar-drag-and-drop': yes,
  'scheduler/calendar-resources': yes,
  'scheduler/calendar-timezone': yes,
  'scheduler/calendar-editing': yes,
  'scheduler/calendar-recurring-events': yes,
  'scheduler/calendar-lazy-loading': yes,
  'scheduler/calendar-resource-view': pending,
  'scheduler/calendar-constraints': pending,
  'scheduler/calendar-copy-paste-events': pending,
  'scheduler/calendar-undo-redo': pending,
  'scheduler/calendar-search-filtering': pending,
  'scheduler/calendar-import-export': pending,
  'scheduler/calendar-accessibility': yes,
  'scheduler/calendar-localization': yes,
  // Scheduler - Event Timeline
  'scheduler/timeline-views': yes,
  'scheduler/timeline-drag-and-drop': yes,
  'scheduler/timeline-resources': yes,
  'scheduler/timeline-timezone': yes,
  'scheduler/timeline-editing': yes,
  'scheduler/timeline-recurring-events': yes,
  'scheduler/timeline-lazy-loading': pending,
  'scheduler/timeline-zooming': pending,
  'scheduler/timeline-virtualization': pending,
  'scheduler/timeline-constraints': pending,
  'scheduler/timeline-copy-paste-events': pending,
  'scheduler/timeline-undo-redo': pending,
  'scheduler/timeline-search-filtering': pending,
  'scheduler/timeline-import-export': pending,
  'scheduler/timeline-accessibility': yes,
  'scheduler/timeline-localization': yes,
  // general
  'mui-x-production': yes,
  'mui-x-development': <Info value="1 year" />,
  'mui-x-development-perpetual': <Info value="Perpetual" />,
  'mui-x-updates': <Info value="1 year" />,
  // Support
  'core-support': yes,
  'x-support': <Info value={yes} metadata="Priority over Premium" />,
  'priority-support': <Info value="Included" />,
  'customer-success': yes,
  'tech-advisory': pending,
  'support-duration': <Info value="1 year" />,
  'response-time': <Info value={yes} metadata="1 business day" />,
  'pre-screening': <Info value={yes} metadata="4 hours" />,
  'issue-escalation': <Info value={yes} />,
  'security-questionnaire': yes,
};

function RowCategory(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        (theme) => ({
          py: 1.5,
          pl: 1.5,
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '.1rem',
          fontWeight: theme.typography.fontWeightBold,
          fontSize: theme.typography.pxToRem(11),
          color: (theme.vars || theme).palette.text.tertiary,
          borderBottom: '1px solid',
          bgcolor: (theme.vars || theme).palette.grey[50],
          borderColor: (theme.vars || theme).palette.grey[200],
          ...theme.applyDarkStyles({
            bgcolor: (theme.vars || theme).palette.primaryDark[900],
            borderColor: (theme.vars || theme).palette.primaryDark[600],
          }),
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function StickyHead({
  container,
  disableCalculation = false,
}: {
  container: React.RefObject<HTMLElement | null>;
  disableCalculation?: boolean;
}) {
  const [hidden, setHidden] = React.useState(true);
  React.useEffect(() => {
    function handleScroll() {
      if (container.current) {
        const rect = container.current.getBoundingClientRect();
        const appHeaderHeight = 64;
        const headHeight = 41;
        const tablePaddingTop = 40;
        if (
          rect.top + appHeaderHeight < 0 &&
          rect.height + rect.top - appHeaderHeight - headHeight - tablePaddingTop > 0
        ) {
          setHidden(false);
        } else {
          setHidden(true);
        }
      }
    }
    if (!disableCalculation) {
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, [container, disableCalculation]);
  return (
    <Box
      sx={[
        (theme) => ({
          position: 'fixed',
          zIndex: 10,
          top: 56,
          left: 0,
          right: 0,
          transition: '0.3s',
          ...(hidden && {
            opacity: 0,
            top: 0,
          }),
          py: 1,
          display: { xs: 'none', md: 'block' },
          backdropFilter: 'blur(20px)',
          boxShadow: `inset 0px -1px 1px ${(theme.vars || theme).palette.grey[100]}`,
          backgroundColor: 'rgba(255,255,255,0.72)',
        }),
        (theme) =>
          theme.applyDarkStyles({
            boxShadow: `inset 0px -1px 1px ${(theme.vars || theme).palette.primaryDark[700]}`,
            backgroundColor: alpha(theme.palette.primaryDark[900], 0.7),
          }),
      ]}
    >
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: `minmax(160px, 1fr) repeat(4, minmax(240px, 1fr))`,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold', px: 2, py: 1 }}>
          Plans
        </Typography>
        {(['community', 'pro', 'premium', 'enterprise'] as const).map((plan) => (
          <Box key={plan} sx={{ px: 2, py: 1 }}>
            <PlanNameTable plan={plan} disableDescription />
          </Box>
        ))}
      </Container>
    </Box>
  );
}

const divider = <Divider />;

function renderMasterRow(key: string, gridSx: object, plans: Array<any>) {
  return (
    <Box
      sx={[
        gridSx,
        (theme) => ({
          '&:hover > div': {
            bgcolor: alpha(theme.palette.grey[50], 0.4),
          },
          ...theme.applyDarkStyles({
            '&:hover > div': {
              bgcolor: theme.palette.primaryDark[800],
            },
          }),
        }),
      ]}
    >
      {rowHeaders[key]}
      {plans.map((id, index) => (
        <Cell key={id} highlighted={index % 2 === 1}>
          {id === 'community' && communityData[key]}
          {id === 'pro' && proData[key]}
          {id === 'premium' && premiumData[key]}
          {id === 'enterprise' && enterpriseData[key]}
        </Cell>
      ))}
    </Box>
  );
}

function PricingTableDevelopment(props: any) {
  const { renderRow } = props;
  const { licenseModel } = useLicenseModel();

  return licenseModel === 'annual'
    ? renderRow('mui-x-development')
    : renderRow('mui-x-development-perpetual');
}

const StyledCollapse = styled(Collapse, {
  name: 'MuiSlider',
  slot: 'Track',
})(({ theme }) => {
  return {
    position: 'relative',
    marginLeft: theme.spacing(1.5),
    borderLeftWidth: '2px',
    borderLeftStyle: 'solid',
    borderColor: theme.palette.grey[100],
    ...theme.applyDarkStyles({
      borderColor: theme.palette.primaryDark[700],
    }),
  };
});

export default function PricingTable({
  columnHeaderHidden,
  plans = ['community', 'pro', 'premium', 'enterprise'],
  ...props
}: BoxProps & {
  columnHeaderHidden?: boolean;
  plans?: Array<'community' | 'pro' | 'premium' | 'enterprise'>;
}) {
  const router = useRouter();
  const [dataGridCollapsed, setDataGridCollapsed] = React.useState(false);
  const [chartsCollapsed, setChartsCollapsed] = React.useState(false);
  const [treeViewCollapsed, setTreeViewCollapsed] = React.useState(false);
  const [schedulerCollapsed, setSchedulerCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (router.query['expand-path'] === 'all') {
      setDataGridCollapsed(true);
      setChartsCollapsed(true);
      setTreeViewCollapsed(true);
      setSchedulerCollapsed(true);
    }
  }, [router.query]);

  const tableRef = React.useRef<HTMLDivElement>(null);
  const gridSx = {
    display: 'grid',
    gridTemplateColumns: {
      xs: `minmax(120px, 0.8fr) repeat(${plans.length}, minmax(160px, 1fr))`,
      sm: `minmax(140px, 0.8fr) repeat(${plans.length}, minmax(180px, 1fr))`,
      md: `minmax(140px, 0.7fr) repeat(${plans.length}, minmax(${
        columnHeaderHidden ? '0px' : '160px'
      }, 1fr))`,
      lg: `minmax(160px, 1fr) repeat(${plans.length}, minmax(${
        columnHeaderHidden ? '0px' : '200px'
      }, 1fr))`,
    },
  };
  const nestedGridSx = {
    ...gridSx,
    // Hack to keep nested grid aligned with others
    ml: '-14px',
    '&>div:first-of-type': {
      ml: '14px',
      width: 'calc(100% - 14px)', // avoid overflow on hover transparent background
    },
  };

  const dataGridUnfoldMore = (
    <UnfoldMoreRounded
      fontSize="small"
      sx={{ color: 'grey.600', opacity: dataGridCollapsed ? 0 : 1 }}
    />
  );

  const chartsUnfoldMore = (
    <UnfoldMoreRounded
      fontSize="small"
      sx={{ color: 'grey.600', opacity: chartsCollapsed ? 0 : 1 }}
    />
  );
  const treeViewUnfoldMore = (
    <UnfoldMoreRounded
      fontSize="small"
      sx={{ color: 'grey.600', opacity: treeViewCollapsed ? 0 : 1 }}
    />
  );
  const schedulerUnfoldMore = (
    <UnfoldMoreRounded
      fontSize="small"
      sx={{ color: 'grey.600', opacity: schedulerCollapsed ? 0 : 1 }}
    />
  );

  const renderRow = (key: string) => renderMasterRow(key, gridSx, plans);
  const renderNestedRow = (key: string) => renderMasterRow(key, nestedGridSx, plans);

  return (
    <ThemeProvider theme={transitionTheme}>
      <Box ref={tableRef} {...props} sx={{ pt: 8, width: '100%', contain: 'paint', ...props.sx }}>
        <StickyHead container={tableRef} disableCalculation={columnHeaderHidden} />
        {!columnHeaderHidden && (
          <Box sx={gridSx}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', p: 2 }}>
              Plans
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, pt: 1.5 }}>
              <PlanNameTable plan="community" />
            </Box>
            <ColumnHeadHighlight>
              <PlanNameTable plan="pro" />
            </ColumnHeadHighlight>
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, pt: 1.5 }}>
              <PlanNameTable plan="premium" />
            </Box>
            <ColumnHeadHighlight>
              <PlanNameTable plan="enterprise" />
            </ColumnHeadHighlight>
          </Box>
        )}
        <RowHead startIcon={<IconImage name="product-core" width={28} height={28} />}>
          MUI Core (open-source)
        </RowHead>
        {renderRow('Base UI')}
        {divider}
        {renderRow('Material UI')}
        {divider}
        {renderRow('Joy UI')}
        {divider}
        {renderRow('MUI System')}
        <RowHead startIcon={<IconImage name="product-advanced" width={28} height={28} />}>
          MUI X (open-core)
        </RowHead>
        <Box
          sx={{
            position: 'relative',
            minHeight: 58,
            '& svg': { transition: '0.3s' },
            '&:hover svg': { color: 'primary.main' },
            ...gridSx,
          }}
        >
          <Cell />
          <Cell sx={{ minHeight: 60 }}>{dataGridUnfoldMore}</Cell>
          <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {dataGridUnfoldMore}
          </Cell>
          <Cell sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {dataGridUnfoldMore}
          </Cell>
          <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {dataGridUnfoldMore}
          </Cell>
          <Button
            fullWidth
            onClick={() => setDataGridCollapsed((bool) => !bool)}
            endIcon={
              <KeyboardArrowRightRounded
                color="primary"
                sx={{ transform: dataGridCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)' }}
              />
            }
            sx={[
              (theme) => ({
                px: 1,
                justifyContent: 'flex-start',
                fontSize: '0.875rem',
                fontWeight: 'medium',
                borderRadius: '0px',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.06),
                  '@media (hover: none)': {
                    bgcolor: 'initial',
                  },
                },
              }),
              (theme) =>
                theme.applyDarkStyles({
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                  },
                }),
            ]}
          >
            Data Grid
          </Button>
        </Box>
        <StyledCollapse in={dataGridCollapsed}>
          <RowCategory>Column features</RowCategory>
          {renderNestedRow('data-grid/column-groups')}
          {divider}
          {renderNestedRow('data-grid/column-spanning')}
          {divider}
          {renderNestedRow('data-grid/column-resizing')}
          {divider}
          {renderNestedRow('data-grid/column-autosizing')}
          {divider}
          {renderNestedRow('data-grid/column-reorder')}
          {divider}
          {renderNestedRow('data-grid/column-pinning')}
          {divider}
          <RowCategory>Row features</RowCategory>
          {renderNestedRow('data-grid/row-height')}
          {divider}
          {renderNestedRow('data-grid/row-spanning')}
          {divider}
          {renderNestedRow('data-grid/row-reordering')}
          {divider}
          {renderNestedRow('data-grid/row-pinning')}
          {divider}
          <RowCategory>Selection features</RowCategory>
          {renderNestedRow('data-grid/row-selection')}
          {divider}
          {renderNestedRow('data-grid/row-multiselection')}
          {divider}
          {renderNestedRow('data-grid/row-cell-selection')}
          {divider}
          <RowCategory>Filtering features</RowCategory>
          {renderNestedRow('data-grid/filter-column')}
          {divider}
          {renderNestedRow('data-grid/filter-quick')}
          {divider}
          {renderNestedRow('data-grid/header-filters')}
          {divider}
          {renderNestedRow('data-grid/filter-multicolumn')}
          {divider}
          <RowCategory>Sorting</RowCategory>
          {renderNestedRow('data-grid/column-sorting')}
          {divider}
          {renderNestedRow('data-grid/multi-column-sorting')}
          {divider}
          <RowCategory>Pagination features</RowCategory>
          {renderNestedRow('data-grid/pagination')}
          {divider}
          {renderNestedRow('data-grid/pagination-large')}
          {divider}
          <RowCategory>Editing features</RowCategory>
          {renderNestedRow('data-grid/edit-row')}
          {divider}
          {renderNestedRow('data-grid/edit-cell')}
          {divider}
          <RowCategory>Import & export</RowCategory>
          {renderNestedRow('data-grid/file-csv')}
          {divider}
          {renderNestedRow('data-grid/file-print')}
          {divider}
          {renderNestedRow('data-grid/file-clipboard-copy')}
          {divider}
          {renderNestedRow('data-grid/file-clipboard-paste')}
          {divider}
          {renderNestedRow('data-grid/file-excel')}
          {divider}
          <RowCategory>Rendering features</RowCategory>
          {renderNestedRow('data-grid/customizable-components')}
          {divider}
          {renderNestedRow('data-grid/virtualize-column')}
          {divider}
          {renderNestedRow('data-grid/virtualize-row')}
          {divider}
          <RowCategory>Group & pivot</RowCategory>
          {renderNestedRow('data-grid/tree-data')}
          {divider}
          {renderNestedRow('data-grid/master-detail')}
          {divider}
          {renderNestedRow('data-grid/grouping')}
          {divider}
          {renderNestedRow('data-grid/aggregation')}
          {divider}
          {renderNestedRow('data-grid/pivoting')}
          {divider}
          <RowCategory>Miscellaneous</RowCategory>
          {renderNestedRow('data-grid/accessibility')}
          {divider}
          {renderNestedRow('data-grid/keyboard-nav')}
          {divider}
          {renderNestedRow('data-grid/localization')}
        </StyledCollapse>
        {divider}
        {renderRow('date-picker/simple')}
        {divider}
        {renderRow('date-picker/range')}
        {divider}
        <Box
          sx={{
            position: 'relative',
            minHeight: 58,
            '& svg': { transition: '0.3s' },
            '&:hover svg': { color: 'primary.main' },
            ...gridSx,
          }}
        >
          <Cell />
          <Cell sx={{ minHeight: 60 }}>{chartsUnfoldMore}</Cell>
          <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {chartsUnfoldMore}
          </Cell>
          <Cell sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {chartsUnfoldMore}
          </Cell>
          <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {chartsUnfoldMore}
          </Cell>
          <Button
            fullWidth
            onClick={() => setChartsCollapsed((bool) => !bool)}
            endIcon={
              <KeyboardArrowRightRounded
                color="primary"
                sx={{ transform: chartsCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)' }}
              />
            }
            sx={[
              (theme) => ({
                px: 1,
                justifyContent: 'flex-start',
                fontSize: '0.875rem',
                fontWeight: 'medium',
                borderRadius: '0px',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.06),
                  '@media (hover: none)': {
                    bgcolor: 'initial',
                  },
                },
              }),
              (theme) =>
                theme.applyDarkStyles({
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                  },
                }),
            ]}
          >
            Charts
          </Button>
        </Box>
        <StyledCollapse in={chartsCollapsed}>
          <RowCategory>Components</RowCategory>
          {renderNestedRow('charts/line')}
          {divider}
          {renderNestedRow('charts/bar')}
          {divider}
          {renderNestedRow('charts/scatter')}
          {divider}
          {renderNestedRow('charts/pie')}
          {divider}
          {renderNestedRow('charts/sparkline')}
          {divider}
          {renderNestedRow('charts/gauge')}
          {divider}
          {renderNestedRow('charts/radar')}
          {divider}
          {renderNestedRow('charts/heatmap')}
          {divider}
          {renderNestedRow('charts/funnel')}
          {divider}
          {renderNestedRow('charts/sankey')}
          {divider}
          {renderNestedRow('charts/treemap')}
          {divider}
          {renderNestedRow('charts/gantt')}
          {divider}
          {renderNestedRow('charts/gantt-advanced')}
          {divider}
          {renderNestedRow('charts/candlestick')}
          {divider}
          {renderNestedRow('charts/large-dataset')}
          {divider}
          <RowCategory>Interactions</RowCategory>
          {renderNestedRow('charts/legend')}
          {divider}
          {renderNestedRow('charts/tooltip')}
          {divider}
          {renderNestedRow('charts/zoom-and-pan')}
          {divider}
          {renderNestedRow('charts/export')}
          {divider}
          <RowCategory>Data Grid Integration</RowCategory>
          {renderNestedRow('charts/cell-with-charts')}
          {divider}
          {renderNestedRow('charts/filter-interaction')}
          {divider}
          {renderNestedRow('charts/selection-interaction')}
        </StyledCollapse>
        {divider}
        <Box
          sx={{
            position: 'relative',
            minHeight: 58,
            '& svg': { transition: '0.3s' },
            '&:hover svg': { color: 'primary.main' },
            ...gridSx,
          }}
        >
          <Cell />
          <Cell sx={{ minHeight: 60 }}>{schedulerUnfoldMore}</Cell>
          <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {schedulerUnfoldMore}
          </Cell>
          <Cell sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {schedulerUnfoldMore}
          </Cell>
          <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {schedulerUnfoldMore}
          </Cell>
          <Button
            fullWidth
            onClick={() => setSchedulerCollapsed((bool) => !bool)}
            endIcon={
              <KeyboardArrowRightRounded
                color="primary"
                sx={{
                  transform: schedulerCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)',
                }}
              />
            }
            sx={[
              (theme) => ({
                px: 1,
                justifyContent: 'flex-start',
                fontSize: '0.875rem',
                fontWeight: 'medium',
                borderRadius: '0px',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.06),
                  '@media (hover: none)': {
                    bgcolor: 'initial',
                  },
                },
              }),
              (theme) =>
                theme.applyDarkStyles({
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                  },
                }),
            ]}
          >
            Scheduler
          </Button>
        </Box>
        <StyledCollapse in={schedulerCollapsed}>
          <RowCategory>Components</RowCategory>
          {renderNestedRow('scheduler/event-calendar')}
          {divider}
          {renderNestedRow('scheduler/event-timeline')}
          {divider}
          <RowCategory>Event Calendar features</RowCategory>
          {renderNestedRow('scheduler/calendar-views')}
          {divider}
          {renderNestedRow('scheduler/calendar-year-view')}
          {divider}
          {renderNestedRow('scheduler/calendar-drag-and-drop')}
          {divider}
          {renderNestedRow('scheduler/calendar-resources')}
          {divider}
          {renderNestedRow('scheduler/calendar-timezone')}
          {divider}
          {renderNestedRow('scheduler/calendar-editing')}
          {divider}
          {renderNestedRow('scheduler/calendar-accessibility')}
          {divider}
          {renderNestedRow('scheduler/calendar-localization')}
          {divider}
          {renderNestedRow('scheduler/calendar-constraints')}
          {divider}
          {renderNestedRow('scheduler/calendar-copy-paste-events')}
          {divider}
          {renderNestedRow('scheduler/calendar-undo-redo')}
          {divider}
          {renderNestedRow('scheduler/calendar-recurring-events')}
          {divider}
          {renderNestedRow('scheduler/calendar-lazy-loading')}
          {divider}
          {renderNestedRow('scheduler/calendar-resource-view')}
          {divider}
          {renderNestedRow('scheduler/calendar-search-filtering')}
          {divider}
          {renderNestedRow('scheduler/calendar-import-export')}
          {divider}
          <RowCategory>Event Timeline features</RowCategory>
          {renderNestedRow('scheduler/timeline-views')}
          {divider}
          {renderNestedRow('scheduler/timeline-drag-and-drop')}
          {divider}
          {renderNestedRow('scheduler/timeline-resources')}
          {divider}
          {renderNestedRow('scheduler/timeline-recurring-events')}
          {divider}
          {renderNestedRow('scheduler/timeline-timezone')}
          {divider}
          {renderNestedRow('scheduler/timeline-editing')}
          {divider}
          {renderNestedRow('scheduler/timeline-accessibility')}
          {divider}
          {renderNestedRow('scheduler/timeline-localization')}
          {divider}
          {renderNestedRow('scheduler/timeline-lazy-loading')}
          {divider}
          {renderNestedRow('scheduler/timeline-zooming')}
          {divider}
          {renderNestedRow('scheduler/timeline-virtualization')}
          {divider}
          {renderNestedRow('scheduler/timeline-constraints')}
          {divider}
          {renderNestedRow('scheduler/timeline-copy-paste-events')}
          {divider}
          {renderNestedRow('scheduler/timeline-undo-redo')}
          {divider}
          {renderNestedRow('scheduler/timeline-search-filtering')}
          {divider}
          {renderNestedRow('scheduler/timeline-import-export')}
        </StyledCollapse>
        {divider}
        <Box
          sx={{
            position: 'relative',
            minHeight: 58,
            '& svg': { transition: '0.3s' },
            '&:hover svg': { color: 'primary.main' },
            ...gridSx,
          }}
        >
          <Cell />
          <Cell sx={{ minHeight: 60 }}>{treeViewUnfoldMore}</Cell>
          <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {treeViewUnfoldMore}
          </Cell>
          <Cell sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {treeViewUnfoldMore}
          </Cell>
          <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
            {treeViewUnfoldMore}
          </Cell>
          <Button
            fullWidth
            onClick={() => setTreeViewCollapsed((bool) => !bool)}
            endIcon={
              <KeyboardArrowRightRounded
                color="primary"
                sx={{ transform: treeViewCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)' }}
              />
            }
            sx={[
              (theme) => ({
                px: 1,
                justifyContent: 'flex-start',
                fontSize: '0.875rem',
                fontWeight: 'medium',
                borderRadius: '0px',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.06),
                  '@media (hover: none)': {
                    bgcolor: 'initial',
                  },
                },
              }),
              (theme) =>
                theme.applyDarkStyles({
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                  },
                }),
            ]}
          >
            Tree View
          </Button>
        </Box>
        <StyledCollapse in={treeViewCollapsed}>
          <RowCategory>Components</RowCategory>
          {renderNestedRow('tree-view/simple-tree-view')}
          {divider}
          {renderNestedRow('tree-view/rich-tree-view')}
          {divider}
          <RowCategory>Advanced features</RowCategory>
          {renderNestedRow('tree-view/selection')}
          {divider}
          {renderNestedRow('tree-view/multi-selection')}
          {divider}
          {renderNestedRow('tree-view/inline-editing')}
          {divider}
          {renderNestedRow('tree-view/drag-to-reorder')}
          {divider}
          {renderNestedRow('tree-view/virtualization')}
          {divider}
        </StyledCollapse>
        {divider}
        {renderRow('mui-x-production')}
        {divider}
        <PricingTableDevelopment renderRow={renderRow} />
        {divider}
        {renderRow('mui-x-updates')}
        <RowHead startIcon={<SupportAgentIcon color="primary" width={28} height={28} />}>
          Support
        </RowHead>
        {renderRow('priority-support')}
        {divider}
        {renderRow('customer-success')}
        {divider}
        {renderRow('core-support')}
        {divider}
        {renderRow('x-support')}
        {divider}
        {renderRow('support-duration')}
        {divider}
        {renderRow('response-time')}
        {divider}
        {renderRow('pre-screening')}
        {divider}
        {renderRow('issue-escalation')}
        {divider}
        {renderRow('security-questionnaire')}
        {divider}
      </Box>
    </ThemeProvider>
  );
}
