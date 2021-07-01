---
title: Composant React Fab
components: Fab
githubLabel: 'component: Fab'
materialDesign: https://material.io/components/buttons-floating-action-button
---

# Floating action button

<p class="description">A floating action button (FAB) performs the primary, or most common, action on a screen.</p>

Un [bouton d'action flottant](https://material.io/design/components/buttons-floating-action-button.html) apparaît devant tout le contenu de l'écran, généralement sous la forme d'une forme circulaire avec une icône en son centre. Il existe deux types de FAB: régulier et étendu.

N'utilisez un FAB que s'il s'agit de la manière la plus appropriée de présenter l'action principale d'un écran. Un seul composant est recommandé par écran pour représenter l'action la plus courante.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## FAB de base

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size

By default, the size is `large`. Use the `size` prop for larger or smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

Le bouton d'action flottante s'anime sur l'écran en tant que matériau en expansion, par défaut.

## Animation

Le bouton d'action flottante s'anime sur l'écran en tant que matériau en expansion, par défaut.

Un bouton d'action flottant qui s'étend sur plusieurs écrans latéraux (tels que des écrans à onglets) devrait disparaître brièvement, puis sur si son action change.

La transition Zoom peut être utilisée pour y parvenir. Notez que, comme les animations sortantes et entrantes sont déclenchées simultanément, nous utilisons `enterDelay` pour permettre à l'animation du bouton d'action flottant sortant de se terminer avant l'entrée de la nouvelle.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
