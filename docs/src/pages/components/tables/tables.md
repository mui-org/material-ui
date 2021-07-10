---
title: React Table component
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table

<p class="description">Tables display sets of data. They can be fully customized.</p>

[Tables](https://material.io/design/components/data-tables.html) display information in a way that’s easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards.

Tables can include:

- A corresponding visualization
- Navigation
- Tools to query and manipulate data

When including tools, they should be placed directly above or below the table.

## Basic table

A simple example with no frills.

{{"demo": "pages/components/tables/BasicTable.js", "bg": true}}

## Data table

The `Table` component has a close mapping to the native `<table>` elements.
This constraint makes building rich data tables challenging.

The [`DataGrid` component](/components/data-grid/) is designed for use-cases that are focused around handling a large amounts of tabular data.
While it comes with a more rigid structure, in exchange, you gain more powerful features.

{{"demo": "pages/components/tables/DataTable.js", "bg": "inline"}}

## Dense table

A simple example of a dense table with no frills.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Sorting & selecting

This example demonstrates the use of `Checkbox` and clickable rows for selection, with a custom `Toolbar`. It uses the `TableSortLabel` component to help style column headings.

The Table has been given a fixed width to demonstrate horizontal scrolling. In order to prevent the pagination controls from scrolling, the TablePagination component is used outside of the Table. (The ['Custom Table Pagination Action' example](#custom-pagination-actions) below shows the pagination within the TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Customized tables

Here is an example of customizing the component. You can learn more about this in the
[overrides documentation page](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### Custom pagination options

It's possible to customise the options shown in the "Rows per page" select using the `rowsPerPageOptions` prop.
You should either provide an array of:

- **numbers**, each number will be used for the option's label and value.

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50]} />
  ```

- **objects**, the `value` and `label` keys will be used respectively for the value and label of the option (useful for language strings such as 'All').

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
  ```

### Custom pagination actions

The `ActionsComponent` prop of the `TablePagination` component allows the implementation of
custom actions.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## Fixed header

An example of a table with scrollable rows and fixed column headers.
It leverages the `stickyHeader` prop (⚠️ no IE 11 support).

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## Collapsible table

An example of a table with expandable rows, revealing more information.
It utilizes the [`Collapse`](/api/collapse/) component.

{{"demo": "pages/components/tables/CollapsibleTable.js", "bg": true}}

## Spanning table

A simple example with spanning rows & columns.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Virtualized table

In the following example, we demonstrate how to use [react-virtualized](https://github.com/bvaughn/react-virtualized) with the `Table` component.
It renders 200 rows and can easily handle more.
Virtualization helps with performance issues.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Accessibility

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it’s about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}
