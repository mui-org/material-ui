---
productId: material-ui
title: React Table component
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
githubLabel: 'scope: table'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/table/
materialDesign: https://m2.material.io/components/data-tables
githubSource: packages/mui-material/src/Table
---

# Table

<p class="description">Tables display sets of data. They can be fully customized.</p>

Tables display information in a way that's easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards. They can include:

- A corresponding visualization
- Navigation
- Tools to query and manipulate data

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Introduction

Tables are implemented using a collection of related components:

- `<TableContainer />`: A wrapper that provides horizontally scrolling behavior for the `<Table />` component.
- `<Table />`: The main component for the table element. Renders as a `<table>` by default.
- `<TableHead />`: The container for the header row(s) of `<Table />`. Renders as a `<thead>` by default.
- `<TableBody />`: The container for the body rows of `<Table />`. Renders as a `<tbody>` by default.
- `<TableRow />`: A row in a table. Can be used in `<TableHead />`, `<TableBody />`, or `<TableFooter />`. Renders as a `<tr>` by default.
- `<TableCell />`: A cell in a table. Can be used in `<TableRow />` . Renders as a `<th>` in `<TableHead />` and `<td>` in `<TableBody />` by default.
- `<TableFooter />`: An optional container for the footer row(s) of the table. Renders as a `<tfoot>` by default.
- `<TablePagination />`: A component that provides controls for paginating table data. See the ['Sorting & selecting' example](#sorting-selecting) and ['Custom Table Pagination Action' example](#custom-pagination-actions).
- `<TableSortLabel />`: A component used to display sorting controls for column headers, allowing users to sort data in ascending or descending order. See the ['Sorting & selecting' example](#sorting-selecting).

## Basic table

A simple example with no frills.

{{"component": "file://./demos/basic/index.ts", "bg": true}}

## Data table

The `Table` component has a close mapping to the native `<table>` elements.
This constraint makes building rich data tables challenging.

The [`DataGrid` component](/x/react-data-grid/) is designed for use-cases that are focused on handling large amounts of tabular data.
While it comes with a more rigid structure, in exchange, you gain more powerful features.

{{"component": "file://./demos/data/index.ts", "bg": true}}

## Dense table

A simple example of a dense table with no frills.

{{"component": "file://./demos/dense/index.ts", "bg": true}}

## Sorting & selecting

This example demonstrates the use of `Checkbox` and clickable rows for selection, with a custom `Toolbar`. It uses the `TableSortLabel` component to help style column headings.

The Table has been given a fixed width to demonstrate horizontal scrolling. In order to prevent the pagination controls from scrolling, the TablePagination component is used outside of the Table. (The ['Custom Table Pagination Action' example](#custom-pagination-actions) below shows the pagination within the TableFooter.)

{{"component": "file://./demos/enhanced/index.ts", "bg": true}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts", "bg": true}}

### Custom pagination options

It's possible to customize the options shown in the "Rows per page" select using the `rowsPerPageOptions` prop.
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

The `ActionsComponent` prop of the `TablePagination` component allows the implementation of custom actions.
A replacement action component is responsible for its own tooltips and focus management, unless it composes the built-in `TablePaginationActions` component.

{{"component": "file://./demos/custom-pagination-actions/index.ts", "bg": true}}

#### Customizing individual action buttons

To customize individual buttons while keeping the built-in `TablePaginationActions`, use `slots.actions` and `slotProps.actions` on `TablePagination`.
The default buttons include tooltips.
When replacing `firstButton`, `previousButton`, `nextButton`, or `lastButton` through `slots.actions`, the custom component receives a `title` prop and is responsible for rendering its own tooltip.

When an update to pagination props or action slot props disables the focused action, `TablePaginationActions` moves focus to the next enabled action in DOM order, or searches backward if none follows.
Actions with `tabIndex={-1}` are skipped.
Focus stays where it is if no action is available or your application has already moved focus elsewhere.

Custom button slots participate in focus restoration by forwarding the supplied `data-mui-pagination-action` prop to their focusable element.
Forward the `disabled` prop to native buttons, or use `aria-disabled` for other elements.
You don't need to forward a ref.
Custom slots that omit the data attribute continue to work, but don't participate in focus restoration.
If a custom slot disables itself through its own state without re-rendering `TablePaginationActions`, it must handle focus restoration itself.

## Sticky header

Here is an example of a table with scrollable rows and fixed column headers.
It leverages the `stickyHeader` prop.

{{"component": "file://./demos/sticky-head/index.ts", "bg": true}}

## Column grouping

You can group column headers by rendering multiple table rows inside a table head:

```jsx
<TableHead>
  <TableRow />
  <TableRow />
</TableHead>
```

{{"component": "file://./demos/column-grouping/index.ts", "bg": true}}

## Collapsible table

An example of a table with expandable rows, revealing more information.
It utilizes the [`Collapse`](/material-ui/api/collapse/) component.

{{"component": "file://./demos/collapsible/index.ts", "bg": true}}

## Spanning table

A simple example with spanning rows & columns.

{{"component": "file://./demos/spanning/index.ts", "bg": true}}

## Virtualized table

In the following example, we demonstrate how to use [react-virtuoso](https://github.com/petyosi/react-virtuoso) with the `Table` component.
It renders 200 rows and can easily handle more.
Virtualization helps with performance issues.

{{"component": "file://./demos/react-virtualized/index.ts", "bg": true}}

## Accessibility

(WAI tutorial: <https://www.w3.org/WAI/tutorials/tables/>)

### Row and column headers

Header cells identify the data in each row or column.
Screen readers use these associations to provide context as users navigate the table.

`TableCell` renders as a `<th>` automatically when it is placed inside a `TableHead`, but it renders as a `<td>` inside a `TableBody`.
When a body cell contains the label that identifies its row, render it as a row header with `component="th"` and `scope="row"`:

```jsx
<TableRow>
  <TableCell component="th" scope="row">
    {row.name}
  </TableCell>
  <TableCell>{row.calories}</TableCell>
</TableRow>
```

Choose a meaningful value for the row header, such as a person's name or a product name, rather than an arbitrary index. Multiple cells could be marked as row headers, for example when the table contains both first name and last name columns.

The Data Grid uses ARIA roles instead of native table elements.
See the [Data Grid row headers guide](/x/react-data-grid/accessibility/#row-headers) to learn how to identify its row header columns.

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it's about and decide if they want to read it.

{{"component": "file://./demos/accessible/index.ts", "bg": true}}
