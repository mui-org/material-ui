---
title: Composant React Chip (puces)
components: Chip
githubLabel: 'component: Chip'
materialDesign: https://material.io/components/chips
---

# Chip

<p class="description">Les Chip sont des éléments compacts qui représentent une entrée, un attribut ou une action.</p>

Les puces permettent aux utilisateurs de saisir des informations, d'effectuer des sélections, de filtrer le contenu ou de déclencher des actions.

Bien qu’il soit inclus ici en tant que composant autonome, l’utilisation la plus courante sera sous une forme quelconque d’entrée, de sorte que le comportement présenté ici est un comportement non présenté dans son contexte.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic chip

Exemples de Chip , utilisant une image Avatar, icône SVG Avatar, "Lettre" et (chaîne) Avatar.

{{"demo": "pages/components/chips/Chips.js"}}

## Tableau de Chip

Les Outlined Chips offrent un style alternatif.

- Les puces avec la propriété `onClick` définie changent l’apparence sur le focus, survolent, puis cliquent sur.
- Les puces avec la propriété `onDelete` définie afficheront une icône de suppression qui change d’apparence en survol.

### Outlined Chips

{{"demo": "pages/components/chips/OutlinedChips.js"}}

### Variante par défaut

{{"demo": "pages/components/chips/DeleteableChips.js"}}

### Variante linéaire

{{"demo": "pages/components/chips/ClickeableAndDeleteableChips.js"}}

### Clickeable link

Vous pouvez utiliser la propriété `size` pour définir une petite Chip.

### Custom delete icon

{{"demo": "pages/components/chips/SmallChips.js"}}

## Petite Chip

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

Use the `avatar` prop to added a avatar or use the `icon` prop to added a icon.

### Avatar chip

{{"demo": "pages/components/chips/AvatarChips.js"}}

### Icon chip

{{"demo": "pages/components/chips/IconChips.js"}}

## Playground Chip

You can use the `color` prop to define a primary or secondary color.

{{"demo": "pages/components/chips/ColorChips.js"}}

## Accessibilité

Vous pouvez utiliser la propriété `size` pour définir une petite Chip.

{{"demo": "pages/components/chips/SizesChips.js"}}

## Tableau de Chip

Un exemple de rendu de plusieurs Chip à partir d'un tableau de valeurs. Supprimer une Chip la supprime du tableau. Notez que puisqu'aucun `onClick` propriété est définie, la puce peut être concentré, mais ne pas profondeur de gain tandis que vous cliquez dessus ou touché.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Chip playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Accessibilité

Si la Chip est supprimable ou cliquable, c'est un bouton dans l'ordre des onglets. Lorsque la Chip est concentrée (p. ex. lorsque la tabulation est activée) (`keyup` event) `Backspace` ou `Delete` appellera le gestionnaire `onDelete` lors de la libération de `Escape` flottera la Chip.
