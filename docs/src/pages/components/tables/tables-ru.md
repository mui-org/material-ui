---
title: Компонент React Table
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
githubLabel: 'component: Table'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#table'
materialDesign: https://material.io/components/data-tables
---

# Table (tаблица)

<p class="description">Таблицы отображают наборы данных. Они могут быть полностью модифицированы.</p>

Tables display information in a way that's easy to scan, so that users can look for patterns and insights. Они могут быть встроены в основной контент, например в карточки. They can include:

- Соответствующую визуализацию
- Навигацию
- Инструменты для запросов и манипулирования данными

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Структура

Простой пример без излишеств.

Таблица данных содержит 1 строку заголовка, в которой перечислены имена столбцов, за которыми следуют строки для данных.

## Сортировка и выбор строк

The `Table` component has a close mapping to the native `<table>` elements. This constraint makes building rich data tables challenging.

The [`DataGrid` component](/components/data-grid/) is designed for use-cases that are focused on handling large amounts of tabular data. While it comes with a more rigid structure, in exchange, you gain more powerful features.

{{"demo": "pages/components/tables/DataTable.js", "bg": "inline"}}

## Простая таблица

Флажки должны сопровождать каждую строку, если пользователю необходимо выбрать или манипулировать данными.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Плотная компоновка таблицы

В этом примере демонстрируется использование `чекбокса` и кликабельных строк для выбора данных в настраиваемой `панели инструментов`. Здесь используется компонент `TableSortLabel` чтобы помочь стилизовать заголовки столбцов.

Таблица имеет фиксированную ширину для демонстрации горизонтальной прокрутки. Чтобы предотвратить прокрутку элементов управления нумерацией страниц, компонент TablePagination находится за пределами таблицы. (В [примерe «собственные действия элементов нумерации»](#custom-pagination-actions) ниже показывается управление нумерацией таблиц с помощью TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Настраиваемые таблицы

Ниже находится пример кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### Пользовательские параметры разбивки на страницы

Возможна настройка параметров, отображаемых в "Строках на странице", используя `rowsPerPageOptions` prop. You should either provide an array of:

- **numbers**, each number will be used for the option's label and value.

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50]} />
  ```

- **objects**, the `value` and `label` keys will be used respectively for the value and label of the option (useful for language strings such as 'All').

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
  ```

### Пользовательские действия разбивки на страницы

Свойство `Action` компонента `TablePagination` позволяет реализовать собственную обработку пользовательский событий.

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

## Объединение таблиц

Простой пример с объединением строк и столбцов.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Виртуализированная таблица

В следующем примере мы покажем, как использовать [react-virtualized](https://github.com/bvaughn/react-virtualized) с компонентом `Table`. Он отображает 200 строк и c легкостью может еще больше. Virtualization helps with performance issues.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Доступность

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it's about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}
