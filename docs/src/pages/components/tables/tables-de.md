---
title: React Table component
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
githubLabel: 'component: Table'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#table'
materialDesign: https://material.io/components/data-tables
---

# Tabelle

<p class="description">Tabellen zeigen Datensätze an. Sie können vollständig angepasst werden.</p>

Tables display information in a way that's easy to scan, so that users can look for patterns and insights. Sie können wie Karten in den Primär-Inhalt eingebettet werden. They can include:

- Eine entsprechende Visualisierung
- Navigation
- Werkzeuge um Daten abzufragen und zu manipulieren

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Struktur

Ein einfaches Beispiel ohne Verzierungen.

Eine Daten-Tabelle enthält oben eine Kopfzeile, welche die Spaltennamen auflistet, gefolgt von den Zeilen für Daten.

## Sortieren & Auswahl

The `Table` component has a close mapping to the native `<table>` elements. This constraint makes building rich data tables challenging.

The [`DataGrid` component](/components/data-grid/) is designed for use-cases that are focused on handling large amounts of tabular data. While it comes with a more rigid structure, in exchange, you gain more powerful features.

{{"demo": "pages/components/tables/DataTable.js", "bg": "inline"}}

## Einfache Tabelle

Jede Zeile sollte ein Optionsfeld begleiten, falls die Nutzer die Daten auswählen oder ändern müssen.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Dichte Tabelle

Dieses Beispiel demonstriert die Nutzung von `Optionsfeld` und klickbaren Zeilen zur Auswahl mit einer benutzerdefinierten `Werkzeugleiste`. Es verwendet die `TableSortLabel` Komponente, um Spaltenüberschriften zu formatieren.

Der Tabelle wurde eine feste Breite zugewiesen, um das horizontale Scrollen zu veranschaulichen. Um zu verhindern, dass die Paginierungssteuerelemente einen Bildlauf ausführen, wird die TablePagination-Komponente außerhalb der Tabelle verwendet. (Das [‚Custom Tabelle Paginierung Aktion‘ Beispiel](#custom-pagination-actions) unten zeigt die Paginierung im TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Benutzerdefinierte Tabellen

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

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

Die Eigenschaft `Action` der Komponente `TablePagination` ermöglicht die Implementierung von benutzerdefinierten Aktionen.

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

## Überspannende Tabellen

Ein einfaches Beispiel mit überspannenden Zeilen & Spalten.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Virtualisierte Tabelle

Im folgenden Beispiel zeigen wir wie Sie [react-virtualized](https://github.com/bvaughn/react-virtualized) mit der `Table<` Komponente nutzen können. Sie zeigt 200 Zeilen an und kann auch einfach mehr verwalten. Virtualisierung hilft bei Leistungsproblemen.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Barrierefreiheit

(WAI Tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it's about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}
