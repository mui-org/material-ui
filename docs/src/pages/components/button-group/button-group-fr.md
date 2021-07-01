---
title: Groupe de Boutons
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Groupe de boutons

<p class="description">Le composant ButtonGroup peut être utilisé pour regrouper les boutons associés.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Groupe de boutons de base

The buttons can be grouped by wrapping them with the `ButtonGroup` component. They need to be immediate children.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Tailles et couleurs

The `size` and `color` props can be used to control the appearance of the ButtonGroup.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## Tailles et couleurs

The ButtonGroup can be displayed veritcally using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Groupe vertical

The button group can be displayed vertically using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Bouton Split

`ButtonGroup` peut également être utilisé pour créer un bouton de séparation. La liste déroulante peut modifier l'action du bouton (comme dans cet exemple), ou être utilisée pour déclencher immédiatement une action connexe.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Désactivé élévation

Vous pouvez supprimer l'élévation avec la propriété `disableElevation`.

{{"demo": "pages/components/button-group/DisableElevation.js"}}
