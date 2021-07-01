---
title: React ButtonGroup Komponente
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Button group

<p class="description">Die ButtonGroup-Komponente kann verwendet werden, um zueinandergehörende Schaltflächen zu gruppieren.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic button group

The buttons can be grouped by wrapping them with the `ButtonGroup` component. They need to be immediate children.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Button variants

All the standard button variants are supported.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## Größen und Farben

The `size` and `color` props can be used to control the appearance of the button group.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Vertikale Gruppe

The button group can be displayed vertically using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Split button

`ButtonGroup` can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Disabled elevation

Die Erhöhung kann mit der `disableElevation`-Prop deaktiviert werden.

{{"demo": "pages/components/button-group/DisableElevation.js"}}
