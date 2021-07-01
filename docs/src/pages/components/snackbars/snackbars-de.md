---
title: React Snackbar component
components: Snackbar, SnackbarContent
githubLabel: 'component: Snackbar'
materialDesign: https://material.io/components/snackbars
waiAria: 'https://www.w3.org/TR/wai-aria-1.1/#alert'
---

# Snackbar

<p class="description">Snackbars provide brief messages about app processes. The component is also known as a toast.</p>

[Snackbars](https://material.io/design/components/snackbars.html) informieren Benutzer über einen Prozess, den eine App ausgeführt hat oder ausführen wird. Sie erscheinen vorübergehend am unteren Rand des Bildschirms. They shouldn't interrupt the user experience, and they don't require user input to disappear.

Snackbars contain a single line of text directly related to the operation performed. They may contain a text action, but no icons. Sie können diese verwenden, um Benachrichtigungen anzuzeigen.

{{"component": "modules/components/ComponentLinkHeader.js"}}

#### Häufigkeit

Es kann immer nur eine Snackbar angezeigt werden.

## Einfache Snackbars

Eine einfache Snackbar, die das Verhalten der Snackbar von Google Keep reproduzieren soll.

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## Benutzerdefinierte Snackbars

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## Positionierte Snackbars

In wide layouts, snackbars can be left-aligned or center-aligned if they are consistently placed on the same spot at the bottom of the screen, however there may be circumstances where the placement of the snackbar needs to be more flexible. You can control the position of the snackbar by specifying the `anchorOrigin` prop.

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## Nachrichtenlänge

Einige Snackbars mit unterschiedlicher Nachrichtenlänge.

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## Übergänge

### Aufeinanderfolgende Snackbars

Wenn mehrere Snackbar-Aktualisierungen erforderlich sind, sollten diese einzeln und nacheinander angezeigt werden.

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars und schwebende Aktionsschaltflächen (FABs)

Snackbars sollten (auf dem Handy) über FABs angezeigt werden.

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

### Übergang ändern

[Grow](/components/transitions/#grow) ist der Standardübergang, Sie können jedoch einen anderen verwenden.

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### Schieberegler Richtung

Sie können die Richtung des [Gleiten](/components/transitions/#slide) Übergangs ändern.

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### notistack

![sterne](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

This example demonstrates how to use [notistack](https://github.com/iamhosseindhv/notistack). notistack has an **imperative API** that makes it easy to display snackbars, without having to handle their open/close state. It also enables you to **stack** them on top of one another (although this is discouraged by the Material Design guidelines).

TODO: Add example once notistack is compatible with v5 or replace with [#1824](https://github.com/mui-org/material-ui/issues/1824).

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-1.1/#alert)

- By default, the snackbar won't auto-hide. However, if you decide to use the `autoHideDuration` prop, it's recommended to give the user [sufficient time](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) to respond.
