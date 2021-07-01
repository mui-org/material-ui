---
title: React Popover Komponenten
components: Grow, Popover
githubLabel: 'component: Popover'
---

# Popover

<p class="description">Ein Popover kann verwendet werden, um einige Inhalte übereinander anzuzeigen.</p>

Wissenswertes zur Verwendung der Komponente `Popover`:

- Die Komponente ist auf der [`Modal`](/components/modal/) Komponente aufgebaut.
- Das Scrollen und das Wegklicken sind im Gegensatz zur Komponente [`Popper`](/components/popper/) blockiert.

Die Style-Funktion der [Palette](/system/palette/).

## Basic Popover

{{"demo": "pages/components/popover/BasicPopover.js" }}

## Anker Spielplatz

Verwenden Sie die Optionsfelder, um die Positionen des `AnkerOrigin` und des `TransformationOrigin` anzupassen. Sie können auch die `anchorReference` auf `anchorPosition` oder `anchorEl` setzen. Wenn `anchorPosition` ausgewählt ist, wird die Komponente, anstatt an `anchorEl`, am `anchorPosition` prop gerendert.

{{"demo": "pages/components/popover/AnchorPlayground.js", "hideToolbar": true}}

## Maus Interaktionen

This demo demonstrates how to use the `Popover` component and the mouseover event to achieve popover behavior.

{{"demo": "pages/components/popover/MouseOverPopover.js"}}

## Ergänzende Projekte

For more advanced use cases, you might be able to take advantage of:

### PopupState-Helfer

Es gibt ein Drittanbieter-Paket [`Material-Ui-Popup-Status`](https://github.com/jcoreio/material-ui-popup-state), das sich in den meisten Fällen um Popover Status kümmern kann.

{{"demo": "pages/components/popover/PopoverPopupState.js"}}
