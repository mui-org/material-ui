---
title: Componente React para Grupo de botões
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Grupo de botões

<p class="description">O componente ButtonGroup pode ser usado para agrupar botões relacionados.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Grupo de botões básico

The buttons can be grouped by wrapping them with the `ButtonGroup` component. They need to be immediate children.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Button variants

All the standard button variants are supported.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## Tamanhos e cores

The `size` and `color` props can be used to control the appearance of the button group.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Grupo vertical

The button group can be displayed vertically using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Botão dividido

`ButtonGroup` também pode ser usado para criar um botão dividido. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Elevação desabilitada

Você pode remover a elevação com a propriedade `disableElevation`.

{{"demo": "pages/components/button-group/DisableElevation.js"}}
