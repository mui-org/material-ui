---
title: React Stack component
components: Stack
githubLabel: 'component: Stack'
---

# Stack

<p class="description">The Stack component manages layout of immediate children along the vertical or horizontal axis with optional spacing and/or dividers between each child.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Utilisation

`Stack` is concerned with one-dimensional layouts, while [Grid](/components/grid/) that handles two-dimensional layouts. The default direction is `column` which stacks children vertically.

{{"demo": "pages/components/stack/BasicStack.js", "bg": true}}

To control space between children, use the `spacing` prop. The spacing value can be any number, including decimals and any string. Cette fonction de transformation de sortie peut être personnalisée [à l'aide du thème](/customization/spacing/).

## Direction

By default, `Stack` arranges items vertically in a `column`. However, the `direction` prop can be used to position items horizontally in a `row` as well.

{{"demo": "pages/components/stack/DirectionStack.js", "bg": true}}

## Dividers (Séparateurs)

Use the `divider` prop to insert an element between each child. This works particularly well with the [Divider](/components/divider/) component.

{{"demo": "pages/components/stack/DividerStack.js", "bg": true}}

## Responsive values

You can switch the `direction` or `spacing` values based on the active breakpoint.

{{"demo": "pages/components/stack/ResponsiveStack.js", "bg": true}}

## Interactif

Vous trouverez ci-dessous une démo interactive vous permettant d'explorer les résultats visuels des différents paramètres:

{{"demo": "pages/components/stack/InteractiveStack.js", "hideToolbar": true, "bg": true}}

## System props

As a CSS utility component, the `Stack` supports all [`system`](/system/properties/) properties. You can use them as props directly on the component. For instance, a margin-top:

```jsx
<Stack mt={2}>
```
