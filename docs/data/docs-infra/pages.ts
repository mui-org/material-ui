import type { MuiPage } from '@mui/internal-core-docs/MuiPage';

const pages: readonly MuiPage[] = [
  {
    pathname: '/experiments/docs/writing',
    title: 'Writing',
    children: [
      { pathname: '/experiments/docs/headers' },
      { pathname: '/experiments/docs/markdown' },
      { pathname: '/experiments/docs/og-card', title: 'OG Image' },
    ],
  },
  {
    pathname: '/experiments/docs/components',
    children: [
      { pathname: '/experiments/docs/callouts' },
      { pathname: '/experiments/docs/codeblock' },
      { pathname: '/experiments/docs/custom-components' },
      { pathname: '/experiments/docs/demos' },
      { pathname: '/experiments/docs/pro-feature', title: 'Pro feature', plan: 'pro' },
      { pathname: '/experiments/docs/data-grid-premium', title: 'API DataGridPremium' },
    ],
  },
  {
    pathname: '/experiments/docs/layout',
    title: 'Layout',
    children: [{ pathname: '/experiments/docs/docs-layout', title: 'Docs layout' }],
  },
  {
    pathname: '/experiments/docs/main-parent',
    title: 'Test: pages.js',
    children: [
      {
        pathname: '/experiments/docs/first-level-child-1',
        title: 'First-level child 1',
      },
      {
        pathname: '/experiments/docs/first-level-child-2',
        title: 'First-level child 2',
        children: [
          { pathname: '/experiments/docs/second-level-child', title: 'Second-level child' },
          { pathname: '/experiments/docs/subheader-divider', subheader: 'Subheader divider' },
          {
            pathname: '/experiments/docs/api/data-grid-group',
            title: 'Second-level child parent',
            children: [
              { pathname: '/experiments/docs/third-level-child', title: 'Third-level child' },
              {
                pathname: '/experiments/docs/api/data-grid-components-group',
                subheader: 'Subheader divider',
                children: [
                  {
                    pathname: '/experiments/docs/api/data-grid/data-grid',
                    title: 'Fourth-level child',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        pathname: '/experiments/docs/first-level-child-3',
        title: 'Pro plan',
        plan: 'pro',
      },
      {
        pathname: '/experiments/docs/first-level-child-4',
        title: 'New feature',
        newFeature: true,
      },
      {
        pathname: '/experiments/docs/first-level-child-5',
        title: 'Planned feature',
        planned: true,
      },
      {
        pathname: '/experiments/docs/first-level-child-6',
        title: 'Unstable feature',
        unstable: true,
      },
      {
        pathname: '/experiments/docs/first-level-child-7',
        title: 'Beta feature',
        beta: true,
      },
      {
        pathname: '/experiments/docs/first-level-child-8',
        title: 'Legacy feature',
        legacy: true,
      },
      {
        pathname: '/experiments/docs/first-level-child-9',
        title: 'OverflowWithLongApiComponent',
        plan: 'pro',
      },
    ],
  },
  {
    pathname: '/x/react-data-grid-group',
    title: 'Test: Data Grid e2e',
    children: [
      { pathname: '/x/react-data-grid', title: 'Overview' },
      { pathname: '/x/react-data-grid/features' },
      { pathname: '/x/react-data-grid/getting-started' },
      { pathname: '/x/react-data-grid/layout' },
      {
        pathname: '/x/react-data-grid/columns',
        children: [
          { pathname: '/x/react-data-grid/column-definition' },
          { pathname: '/x/react-data-grid/column-dimensions' },
          { pathname: '/x/react-data-grid/column-visibility' },
          { pathname: '/x/react-data-grid/column-header' },
          { pathname: '/x/react-data-grid/column-menu' },
          { pathname: '/x/react-data-grid/column-spanning' },
          { pathname: '/x/react-data-grid/column-groups' },
          { pathname: '/x/react-data-grid/column-ordering', plan: 'pro' },
          { pathname: '/x/react-data-grid/column-pinning', plan: 'pro' },
        ],
      },
      {
        pathname: '/x/react-data-grid/rows',
        children: [
          { pathname: '/x/react-data-grid/row-definition' },
          { pathname: '/x/react-data-grid/row-updates' },
          { pathname: '/x/react-data-grid/row-height' },
          { pathname: '/x/react-data-grid/row-spanning', title: 'Row spanning 🚧' },
          { pathname: '/x/react-data-grid/master-detail', plan: 'pro' },
          { pathname: '/x/react-data-grid/row-ordering', plan: 'pro' },
          { pathname: '/x/react-data-grid/row-pinning', plan: 'pro' },
          { pathname: '/x/react-data-grid/row-recipes', title: 'Recipes' },
        ],
      },
      { pathname: '/x/react-data-grid/editing' },
      { pathname: '/x/react-data-grid/clipboard', title: 'Copy and paste', newFeature: true },
      { pathname: '/x/react-data-grid/performance' },
      {
        pathname: '/x/react-data-grid-group-pivot',
        title: 'Group & Pivot',
        children: [
          { pathname: '/x/react-data-grid/tree-data', plan: 'pro' },
          { pathname: '/x/react-data-grid/row-grouping', plan: 'premium' },
          { pathname: '/x/react-data-grid/aggregation', title: 'Aggregation', plan: 'premium' },
          { pathname: '/x/react-data-grid/pivoting', title: 'Pivoting 🚧', plan: 'premium' },
        ],
      },
      {
        title: 'Recipes',
        pathname: '/x/react-data-grid/recipes',
        children: [
          { pathname: '/x/react-data-grid/recipes-editing', title: 'Editing' },
          { pathname: '/x/react-data-grid/recipes-row-grouping', title: 'Row grouping' },
        ],
      },
      {
        pathname: '/x/api/data-grid-group',
        title: 'API Reference',
        children: [
          { pathname: '/x/api/data-grid', title: 'Index' },
          {
            pathname: '/x/api/data-grid-interfaces-group',
            subheader: 'Interfaces',
            children: [
              { pathname: '/x/api/data-grid/grid-api', title: 'GridApi' },
              { pathname: '/x/api/data-grid/grid-cell-params', title: 'GridCellParams' },
              { pathname: '/x/api/data-grid/grid-col-def', title: 'GridColDef' },
              {
                pathname: '/x/api/data-grid/grid-single-select-col-def',
                title: 'GridSingleSelectColDef',
              },

              { pathname: '/x/api/data-grid/grid-actions-col-def', title: 'GridActionsColDef' },
              {
                pathname: '/x/api/data-grid/grid-export-state-params',
                title: 'GridExportStateParams',
              },
              { pathname: '/x/api/data-grid/grid-filter-item', title: 'GridFilterItem' },
              { pathname: '/x/api/data-grid/grid-filter-model', title: 'GridFilterModel' },
              { pathname: '/x/api/data-grid/grid-filter-operator', title: 'GridFilterOperator' },
              {
                pathname: '/x/api/data-grid/grid-row-class-name-params',
                title: 'GridRowClassNameParams',
              },
              { pathname: '/x/api/data-grid/grid-row-params', title: 'GridRowParams' },
              {
                pathname: '/x/api/data-grid/grid-row-spacing-params',
                title: 'GridRowSpacingParams',
              },
              {
                pathname: '/x/api/data-grid/grid-aggregation-function',
                title: 'GridAggregationFunction',
              },
              {
                pathname: '/x/api/data-grid/grid-csv-export-options',
                title: 'GridCsvExportOptions',
              },
              {
                pathname: '/x/api/data-grid/grid-print-export-options',
                title: 'GridPrintExportOptions',
              },
              {
                pathname: '/x/api/data-grid/grid-excel-export-options',
                title: 'GridExcelExportOptions',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    pathname: '/x/migration-group',
    title: 'Test: Migration',
    children: [
      {
        pathname: '/x/migration-v6',
        subheader: 'Upgrade to v6',
        children: [
          { pathname: '/x/migration/migration-data-grid-v5', title: 'Breaking changes: Data Grid' },
          {
            pathname: '/x/migration/migration-pickers-v5',
            title: 'Breaking changes: Date and Time Pickers',
          },
        ],
      },
      {
        pathname: '/x/migration-earlier',
        subheader: 'Earlier versions',
        children: [
          {
            pathname: '/x/migration/migration-pickers-lab',
            title: 'Migration from lab to v5 (Date and Time Pickers)',
          },
          {
            pathname: '/x/migration/migration-data-grid-v4',
            title: 'Migration from v4 to v5 (Data Grid)',
          },
        ],
      },
    ],
  },
];

export default pages;
