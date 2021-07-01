---
title: Componente ButtonGroup de React
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Grupo de botones

<p class="description">El componente ButtonGroup puede ser usado para agrupar botones relacionados.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Grupos de botones básicos

The buttons can be grouped by wrapping them with the `ButtonGroup` component. They need to be immediate children.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Tamaños y colores

The `size` and `color` props can be used to control the appearance of the ButtonGroup.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## Tamaños y colores

The ButtonGroup can be displayed veritcally using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Grupo Vertical

The button group can be displayed vertically using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Botón dividido

`ButtonGroup` también puede ser empleado para crear un botón dividido.  El menú desplegable puede cambiar la acción del botón (como en este ejemplo), o ser utilizado para ejecutar inmediatamente una acción relacionada.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Elevación deshabilitada

Se puede eliminar la elevación con la prop `disableElevation`.

{{"demo": "pages/components/button-group/DisableElevation.js"}}
