---
title: React Speed Dial component
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: SpeedDial'
materialDesign: 'https://material.io/components/buttons-floating-action-button#types-of-transitions'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Schnellwahl

<p class="description">Wenn gedrückt, kann eine schwebende Aktionstaste drei bis sechs verwandte Aktionen in Form einer Kurzwahl anzeigen.</p>

Wenn mehr als sechs Aktionen erforderlich sind, sollten andere als FAB verwendet werden, um sie zu präsentieren.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Einfache Schnellwahl

Die schwebende Aktionstaste kann verwandte Aktionen anzeigen.

{{"demo": "pages/components/speed-dial/BasicSpeedDial.js"}}

## Spielwiese

{{"demo": "pages/components/speed-dial/PlaygroundSpeedDial.js"}}

## Kundenspezifisches Schließsymbol

Sie können ein alternatives Symbol für den geschlossenen und den geöffneten Zustand mit den `icon` und `openIcon` Eigenschaften der Komponente `SpeedDialIcon` bereitstellen.

Die SpeedDialActions-Tooltips können dauerhaft angezeigt werden, sodass Benutzer nicht lange drücken müssen, um den Tooltip auf Touch-Geräten anzuzeigen.

## Kundenspezifisches Schließsymbol

Sie können ein alternatives Symbol für den geschlossenen und den geöffneten Zustand mit den `icon` und `openIcon` Eigenschaften der Komponente `SpeedDialIcon` bereitstellen.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Anhaltenden Aktion Tooltips

The SpeedDialActions tooltips can be displayed persistently so that users don't have to long-press to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the prop.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}

## Barrierefreiheit

### ARIA

#### Required

- You should provide an `ariaLabel` for the speed dial component.
- You should provide a `tooltipTitle` for each speed dial action.

#### Provided

- The Fab has `aria-haspopup`, `aria-expanded` and `aria-controls` attributes.
- The speed dial actions container has `role="menu"` and `aria-orientation` set according to the direction.
- The speed dial actions have `role="menuitem"`, and an `aria-describedby` attribute that references the associated tooltip.

### Keyboard

- The speed dial opens on focus.
- The Space and Enter keys trigger the selected speed dial action, and toggle the speed dial open state.
- The cursor keys move focus to the next or previous speed dial action. (Note that any cursor direction can be used initially to open the speed dial. This enables the expected behavior for the actual or perceived orientation of the speed dial, for example for a screen reader user who perceives the speed dial as a drop-down menu.)
- The Escape key closes the speed dial and, if a speed dial action was focused, returns focus to the Fab.
