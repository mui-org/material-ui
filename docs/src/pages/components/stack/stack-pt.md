---
title: React Stack component
components: Stack
githubLabel: 'component: Stack'
---

# Stack

<p class="description">The Stack component manages layout of immediate children along the vertical or horizontal axis with optional spacing and/or dividers between each child.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Uso

`Stack` is concerned with one-dimensional layouts, while [Grid](/components/grid/) that handles two-dimensional layouts. The default direction is `column` which stacks children vertically.

{{"demo": "pages/components/stack/BasicStack.js", "bg": true}}

Para controlar o espaço entre os filhos, use a prop ` spacing ` The spacing value can be any number, including decimals and any string. As props são convertidas em css usando o auxiliar  [`theme.spacing()`](/customization/spacing/)

## Direção

By default, `Stack` arranges items vertically in a `column`. However, the `direction` prop can be used to position items horizontally in a `row` as well.

{{"demo": "pages/components/stack/DirectionStack.js", "bg": true}}

## Divisores

Use the `divider` prop to insert an element between each child. This works particularly well with the [Divider](/components/divider/) component.

{{"demo": "pages/components/stack/DividerStack.js", "bg": true}}

## Valores responsivos

You can switch the `direction` or `spacing` values based on the active breakpoint.

{{"demo": "pages/components/stack/ResponsiveStack.js", "bg": true}}

## Interativo

Abaixo está uma demonstração interativa que permite explorar os resultados visuais das diferentes configurações:

{{"demo": "pages/components/stack/InteractiveStack.js", "hideToolbar": true, "bg": true}}

## System props

As a CSS utility component, the `Stack` supports all [`system`](/system/properties/) properties. You can use them as props directly on the component. For instance, a margin-top:

```jsx
<Stack mt={2}>
```
