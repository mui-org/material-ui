---
title: React Grid composant
components: Grid
githubLabel: 'component: Grid'
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grid

<p class="description">Le composant responsive Grid de Material Design s'adapte à la taille et à l'orientation de l'écran, garantissant ainsi la cohérence entre les différents agencements.</p>

Le [Grid](https://material.io/design/layout/responsive-layout-grid.html) créé une cohérence visuelle entre les éléments tout en permettant une certaine flexibilité à travers une grande variété de mise en page. L’UI responsive de Material Design est basée sur un Grid de 12 colonnes.

{{"component": "modules/components/ComponentLinkHeader.js"}}

> ⚠️ Le composant `Grille` ne doit pas être confondu avec une grille de données ; il est plus proche d'une grille de mise en page. For a data grid head to [the `DataGrid` component](/components/data-grid/).

## Comment ça marche

Le système de grille est implémenté avec le composant `Grid`:

- Cela utilise [le module flexible de CSS](https://www.w3.org/TR/css-flexbox-1/) pour une grande flexibilité.
- Il y a deux types de mise en page : *conteneurs* et *éléments*.
- La largeur d'un élément est définie en pourcentage, cela veut dire qu'ils sont toujours souples et dimensionnés par rapport à leur élément parent.
- Les éléments ont un rembourrage (padding) pour créer l'espacement entre les éléments individuels.
- Il existe cinq points de rupture de grille: xs, sm, md, lg et xl.
- Les valeurs type nombre peuvent être données à chaque points de rupture indiquant combien de colonnes parmi les 12 colonnes disponibles sont occupées par le composant lorsque la largeur de la zone d’affichage a assez des [contraintes de point de rupture](/customization/breakpoints/#default-breakpoints).

Si vous êtes **nouveau ou peu familiers avec FlexBox**, nous vous encourageons à lire ce guide [CSS-Tricks FlexBox ](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Les grilles fluides

Les grilles fluides utilisent des colonnes qui mettent à l'échelle et redimensionnent le contenu. A fluid grid's layout can use breakpoints to determine if the layout needs to change dramatically.

### Grille de base

Column widths are integer values between 1 and 12; they apply at any breakpoint and indicate how many columns are occupied by the component.

A value given to a breakpoint applies to all the other breakpoints wider than it (unless overridden, as you can read later in this page). For example, `xs={12}` sizes a component to occupy the whole viewport width regardless of its size.

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### Grid avec des points de rupture

Plusieurs colonnes ont plusieurs largeurs définies, ce qui entraîne une modification de la présentation au point de rupture défini. Width values given to larger breakpoints override those given to smaller breakpoints.

For example, `xs={12} sm={6}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is [600 or more pixels](/customization/breakpoints/#default-breakpoints). For smaller viewports, the component fills all 12 available columns.

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## Ecartement

To control space between children, use the `spacing` prop. The spacing value can be any positive number, including decimals and any string. Cette fonction de transformation de sortie peut être personnalisée [à l'aide du thème](/customization/spacing/).

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Responsive values

You can switch the props' value based on the active breakpoint. For instance, we can implement the ["recommended"](https://material.io/design/layout/responsive-layout-grid.html) responsive layout grid of Material Design.

Vous trouverez ci-dessous une démo interactive vous permettant d'explorer les résultats visuels des différents paramètres:

Responsive values is supported by:

- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- all the [other props](#system-props) of the system

> ⚠️ When using a responsive `columns` prop, each grid item needs its corresponding breakpoint. For instance, this is not working. The grid item misses the value for `md`:
> 
> ```jsx
> <body>
>     <div style={{ padding: 20 }}>
>       <Grid container spacing={5}>
>         //... </Grid>
>     </div>
>   </body> </Grid>
> ```

### Marge négative

The `rowSpacing` and `columnSpacing` props allow for specifying the row and column gaps independently. It's similar to the `row-gap` and `column-gap` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap).

{{"demo": "pages/components/grid/RowAndColumnSpacing.js", "bg": true}}

## Interactif

Vous trouverez ci-dessous une démo interactive vous permettant d'explorer les résultats visuels des différents paramètres:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Mise en page automatique

The Auto-layout makes the *items* equitably share the available space. That also means you can set the width of one *item* and the others will automatically resize around it.

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## Grille complexe

The following demo doesn't follow the Material Design guidelines, but illustrates how the grid can be used to build complex layouts.

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Grille imbriquée

The `container` and `item` properties are two independent booleans. They can be combined.

> Un **container** flex est la boîte générée par un élément avec un affichage calculé de `flex` ou `inline-flex`. Les enfants entrants d'un conteneur flex sont appelés éléments** flex **et sont disposés à l'aide du modèle d'agencement Flex.

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

⚠️ Defining an explicit width to a Grid element that is flex container, flex item, and has spacing at the same time lead to unexpected behavior, avoid doing it:

```jsx
<Grid spacing={1} container item xs={12}>
```

If you need to do such, remove one of the props.

## Columns

You can change the default number of columns (12) with the `columns` prop.

{{"demo": "pages/components/grid/ColumnsGrid.js", "bg": true}}

## Limites

### Marge négative

Il existe une limitation à la marge négative utilisée pour mettre en œuvre l'espacement entre les éléments. This might lead to unexpected behaviors. For instance, to apply a background color, you need to apply `display: flex;` to the parent.

### white-space: nowrap;

La configuration initiale sur les éléments flex est `min-width: auto`. Cela provoque un conflit de positionnement lorsque les enfants utilisent `white-space : nowrap;`. Vous pouvez rencontrer le problème avec :

```jsx
<Grid item xs>
  <Typography noWrap>
```

In order for the item to stay within the container you need to set `min-width: 0`. In practice, you can set the `zeroMinWidth` prop:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

The `xs`, `sm`, `md`, `lg`, and `xl` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers. If used, these props may have undesirable effects on the height of the `Grid` item elements.

## Disposition de la grille CSS

The `Grid` component is using CSS flexbox internally. But as seen below, you can easily use [the system](/system/grid/) and CSS Grid to layout your pages.

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}

## System props

As a CSS utility component, the `Grid` supports all [`system`](/system/properties/) properties. You can use them as props directly on the component. For instance, a padding:

```jsx
<Grid item p={2}>
```
