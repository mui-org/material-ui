---
title: React Divider component
components: Divider
githubLabel: 'component: Divider'
materialDesign: https://material.io/components/dividers
---

# Divider

<p class="description">Un divisor es una línea delgada que agrupa el contenido en listas y diseños.</p>

[Los Divisores](https://material.io/design/components/dividers.html) separan contenido en grupos claros.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Divisores de lista

You can save rendering this DOM element by using the `divider` property on the `ListItem` component. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Especificación HTML5

En una lista, debe asegurarse de que el `Divider` se representa como una `<li>` para que coincida con la especificación de HTML5. El ejemplo debajo muestra dos maneras de lograr esto.

## Separadores insertados

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Divisores de subencabezado

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Divisores de Mitad

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Divisores Verticales

You can also render a divider with content.

{{"demo": "pages/components/dividers/DividerText.js"}}

## Divider (divisor)

Puede también renderizar un divisor vertical usando la propiedad `orientation`.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}

> Tenga en cuenta el uso del accesorio `flexItem` para acomodar al contenedor flex.

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "pages/components/dividers/VerticalDividerMiddle.js", "bg": true}}

### Vertical with text

You can also render a vertical divider with content.

{{"demo": "pages/components/dividers/VerticalDividerText.js"}}
