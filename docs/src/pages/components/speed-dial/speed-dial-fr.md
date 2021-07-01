---
title: Composant React Speed Dial
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: SpeedDial'
materialDesign: 'https://material.io/components/buttons-floating-action-button#types-of-transitions'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Speed Dial

<p class="description">When pressed, a floating action button can display three to six related actions in the form of a speed dial.</p>

If more than six actions are needed, something other than a FAB should be used to present them.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Simple Speed Dial

The floating action button can display related actions.

{{"demo": "pages/components/speed-dial/BasicSpeedDial.js"}}

## Playground

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props of the `SpeedDialIcon` component.

## Numérotation rapide contrôlée

The SpeedDialActions tooltips can be be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices.

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props of the `SpeedDialIcon` component.

## Custom close icon

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props of the `SpeedDialIcon` component.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Persistent action tooltips

Les info-bulles SpeedDialActions peuvent être affichées de manière persistante afin que les utilisateurs n'aient pas à appuyer longuement pour voir l'info-bulle sur les appareils tactiles.

Il est activé ici sur tous les appareils à des fins de démonstration, mais en production, il pourrait utiliser la logique `isTouch` pour définir l'accessoire de manière conditionnelle.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}

## Accessibilité

### ARIA

#### Obligatoire

- Vous devez fournir un `ariaLabel` pour le composant de numérotation rapide.
- Vous devez fournir un `tooltipTitle` pour chaque action de numérotation rapide.

#### Fourni

- Le Fab a les attributs `aria-haspopup`, `aria-expanded` et `aria-controls`.
- Le conteneur d'actions de numérotation rapide a `role="menu"` et `aria-orientation` définis en fonction de la direction.
- Les actions de numérotation rapide ont `role="menuitem"`, et un attribut `aria-describedby` qui fait référence à l'info-bulle associée.

### Clavier

- Le cadran abrégé s'ouvre sur la mise au point.
- Les touches Espace et Entrée déclenchent l'action de numérotation rapide sélectionnée et basculent l'état ouvert de la numérotation rapide.
- Les touches du curseur déplacent le focus vers l'action de numérotation rapide suivante ou précédente. (Notez que n'importe quelle direction du curseur peut être utilisée initialement pour ouvrir la numérotation abrégée. Cela permet le comportement attendu pour l'orientation réelle ou perçue de la numérotation rapide, par exemple pour un utilisateur de lecteur d'écran qui perçoit la numérotation rapide comme un menu déroulant.)
- La touche Échap ferme la numérotation abrégée et, si une action de numérotation abrégée a été focalisée, renvoie la focalisation au Fab.
