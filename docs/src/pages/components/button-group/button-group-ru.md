---
title: Компонент React ButtonGroup
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Группа кнопок

<p class="description">Компонент ButtonGroup можно использовать для группирования связанных кнопок.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Базовые свойства кнопок

The buttons can be grouped by wrapping them with the `ButtonGroup` component. They need to be immediate children.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Button variants

All the standard button variants are supported.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## Sizes and colors

The `size` and `color` props can be used to control the appearance of the button group.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Vertical group

The button group can be displayed vertically using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Split button

`ButtonGroup` can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Disabled elevation

Вы можете убрать эффект "всплытия" с помощью пропа `disableElevation`.

{{"demo": "pages/components/button-group/DisableElevation.js"}}
