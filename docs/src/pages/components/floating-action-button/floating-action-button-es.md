---
title: React Fab component
components: Fab
githubLabel: 'component: Fab'
materialDesign: https://material.io/components/buttons-floating-action-button
---

# Botón de acción flotante

<p class="description">Un botón de acción flotante (FAB) realiza la acción principal, o la más común, en una pantalla.</p>

Un [botón de acción flotante](https://material.io/design/components/buttons-floating-action-button.html)aparece delante de todo el contenido de la pantalla, típicamente como una forma circular con un icono en su centro. Los FABs vienen en dos tipos: regulares y extendidos.

Sólo usa un FAB si es la forma más adecuada de presentar la acción principal de una pantalla. Only use a FAB if it is the most suitable way to present a screen's primary action.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Botón de acción flotante

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Tamaño

By default, the size is `large`. Use the `size` prop for smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

{{"demo": "pages/components/floating-action-button/FloatingActionButtonExtendedSize.js"}}

## Animación

El botón de acción flotante se anima en la pantalla como una pieza de material en expansión, por defecto.

Un botón de acción flotante que abarca múltiples pantallas laterales (como las pantallas con pestañas) debería desaparecer brevemente, para luego reaparecer si su acción cambia.

La transición Zoom se puede utilizar para lograr esto. Tenga en cuenta que como las animaciones de salida y de entrada se disparan al mismo tiempo, usamos `enterDelay` para permitir que la animación del Botón de Acción Flotante saliente termine antes de que el nuevo entre.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
