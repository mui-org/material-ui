---
title: React Table component
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
githubLabel: 'component: Table'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#table'
materialDesign: https://material.io/components/data-tables
---

# テーブル

<p class="description">Tables display sets of data. それらは完全にカスタマイズできます。</p>

Tables display information in a way that's easy to scan, so that users can look for patterns and insights. Cardなどの他のプライマリーコンテンツを埋め込むことができます。 They can include:

- 対応の可視化
- ナビゲーション
- データを照会および操作するためのツール

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Structure

飾り気のないシンプルな例です。

Data tableの上部には、列名をリストするヘッダー行があり、その後にデータ用の行が続きます。

## Sorting & Selecting

The `Table` component has a close mapping to the native `<table>` elements. This constraint makes building rich data tables challenging.

The [`DataGrid` component](/components/data-grid/) is designed for use-cases that are focused on handling large amounts of tabular data. While it comes with a more rigid structure, in exchange, you gain more powerful features.

{{"demo": "pages/components/tables/DataTable.js", "bg": "inline"}}

## Simple Table

ユーザーがデータを選択または操作する必要がある場合は、チェックボックスを各行に付ける必要があります。

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Dense Table

An example of a table with expandable rows, revealing more information. It utilizes the [`Collapse`](/api/collapse/) component.

テーブルは水平スクロールを示すために固定幅が与えられています。 テーブルは水平スクロールを示すために固定幅が与えられています。 ページ付けコントロールがスクロールするのを防ぐために、TablePaginationコンポーネントはTableの外側で使用されます。 （下記の ['カスタムテーブルページネーションアクション'の例](#custom-pagination-actions) は、TableFooter内のページネーションを示しています。） テーブルは水平スクロールを示すために固定幅が与えられています。 テーブルは水平スクロールを示すために固定幅が与えられています。 ページ付けコントロールがスクロールするのを防ぐために、TablePaginationコンポーネントはTableの外側で使用されます。 （下記の ['カスタムテーブルページネーションアクション'の例](#custom-pagination-actions) は、TableFooter内のページネーションを示しています。） テーブルは水平スクロールを示すために固定幅が与えられています。 ページ付けコントロールがスクロールするのを防ぐために、TablePaginationコンポーネントはTableの外側で使用されます。 （下記の ['カスタムテーブルページネーションアクション'の例](#custom-pagination-actions) は、TableFooter内のページネーションを示しています。）

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Customized tables

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### Custom pagination options

It's possible to customise the options shown in the "Rows per page" select using the `rowsPerPageOptions` prop. You should either provide an array of:

- **numbers**, each number will be used for the option's label and value.

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50]} />
  ```

- **objects**, the `value` and `label` keys will be used respectively for the value and label of the option (useful for language strings such as 'All').

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
  ```

### Custom pagination actions

`TablePagination` コンポーネントの `Action` プロパティにより、 カスタムアクションを実装することができます。

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## Sticky header

Here is an example of a table with scrollable rows and fixed column headers. It leverages the `stickyHeader` prop. (⚠️ no IE 11 support)

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## Column grouping

You can group column headers by rendering multiple table rows inside a table head:

```jsx
<TableHead>
  <TableRow />
  <TableRow />
</TableHead>
```

{{"demo": "pages/components/tables/ColumnGroupingTable.js", "bg": true}}

## Collapsible table

An example of a table with expandable rows, revealing more information. It utilizes the [`Collapse`](/api/collapse/) component.

{{"demo": "pages/components/tables/CollapsibleTable.js", "bg": true}}

## Spanning Table

行 & 列にまたがる単純な例です。

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Virtualized Table

次の例では、 `Table` コンポーネントで [react-virtualized](https://github.com/bvaughn/react-virtualized) を使用する方法を示します。 これは200行をレンダリングし、より多くを簡単に処理できます。 仮想化はパフォーマンスの問題に役立ちます。

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## アクセシビリティ

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it's about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}
