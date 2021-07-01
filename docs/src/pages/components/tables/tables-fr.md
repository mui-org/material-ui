---
title: Composant React Table
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
githubLabel: 'component: Table'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#table'
materialDesign: https://material.io/components/data-tables
---

# Table (Tableaux)

<p class="description">Tables display sets of data. They can be fully customized.</p>

Les tables affichent des informations d'une manière facile à numériser, afin que les utilisateurs puissent rechercher des modèles et des aperçus. Ils peuvent être intégrés au contenu principal, tel que les cartes. Ils peuvent inclure :

- Une visualisation correspondante
- Menu principal
- Outils pour interroger et manipuler des données

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Tableau de base

Un exemple simple et sans fioritures.

Une table de données contient en haut une ligne d’en-tête qui répertorie les noms de colonne, suivis de lignes pour les données.

## Tri & Sélection

The `Table` component has a close mapping to the native `<table>` elements. This constraint makes building rich data tables challenging.

The [`DataGrid` component](/components/data-grid/) is designed for use-cases that are focused around handling a large amounts of tabular data. While it comes with a more rigid structure, in exchange, you gain more powerful features.

{{"demo": "pages/components/tables/DataTable.js", "bg": "inline"}}

## Tableau simple

Des cases à cocher doivent accompagner chaque ligne si l'utilisateur doit sélectionner ou manipuler des données.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Tableau dense

Cet exemple illustre l'utilisation de `Checkbox` et des lignes cliquables pour la sélection, avec une `Toolbar` personnalisée. Il utilise le composant `TableSortLabel` pour aider à styliser les en-têtes de colonne.

La table a reçu une largeur fixe pour illustrer le défilement horizontal. Afin d'éviter le défilement des contrôles de pagination, le composant TablePagination est utilisé en dehors du tableau. (L'exemple ['Action de pagination de table personnalisée' ](#custom-pagination-actions) ci-dessous montre la pagination dans TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Tableaux Personnalisés

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### Custom pagination options

It's possible to customise the options shown in the "Rows per page" select using the `rowsPerPageOptions` prop. You should either provide an array of:

- **nombres**, chaque nombre sera utilisé pour l'étiquette et la valeur de l'option.

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50]} />
  ```

- **objects**, `value`, et `label` des clés seront utilisées respectivement pour la valeur et l'étiquette de l'option (utile pour les chaînes de langue telles que 'Tout').

  ```jsx
  <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
  ```

### Custom pagination actions

La propriété `Action` du composant `TablePagination` permet l'implémentation d'actions personnalisées.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## Fixed header

An example of a table with scrollable rows and fixed column headers. It leverages the `stickyHeader` prop.<br /> (⚠️ no IE11 support) (⚠️ no IE 11 support)

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## Regroupement de colonnes

Vous pouvez regrouper les en-têtes de colonne en affichant plusieurs lignes de la table dans une tête de la table :

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

Un exemple simple avec des colonnes couvrant & lignes.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Table virtualisée

Dans l'exemple suivant, nous montrons comment utiliser [react-virtualized](https://github.com/bvaughn/react-virtualized) avec le composant `Table`. Il affiche 200 lignes et peut facilement gérer plus. La virtualisation aide à résoudre les problèmes de performances.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Accessibilité

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Légende

A caption functions like a heading for a table. Most screen readers announce the content of captions. Les légendes aident les utilisateurs à trouver une table et à comprendre ce dont il est question et à décider s'ils veulent la lire.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}
