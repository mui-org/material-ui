---
title: React Menu component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
githubLabel: 'component: Menu'
materialDesign: https://material.io/components/menus
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Menu

<p class="description">Menüs zeigen eine Liste von Auswahlmöglichkeiten auf temporären Oberflächen an.</p>

A menu displays a list of choices on a temporary surface. It appears when the user interacts with a button, or other control.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic menu

A basic menu opens over the anchor element by default (this option can be [changed](#menu-positioning) via props). When close to a screen edge, a basic menu vertically realigns to make sure that all menu items are completely visible.

Durch die Auswahl einer Option wird die Option sofort übernommen und das Menü geschlossen.

**Begriffserklärung**: Im Gegensatz zu einfachen Menüs können einfache Dialogfelder zusätzliche Details in Bezug auf die für ein Listenelement verfügbaren Optionen enthalten oder Navigations- oder orthogonale Aktionen in Bezug auf die primäre Aufgabe bereitstellen. Although they can display the same content, simple menus are preferred over simple dialogs because simple menus are less disruptive to the user's current context.

{{"demo": "pages/components/menus/BasicMenu.js"}}

## Selected menu

If used for item selection, when opened, simple menus places the initial focus on the selected menu item. Das aktuell ausgewählte Menüelement wird mit der Eigenschaft `selected` (von [ListItem](/api/list-item/)) festgelegt. To use a selected menu item without impacting the initial focus, set the `variant` prop to "menu".

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## Positioned menu

Because the `Menu` component uses the `Popover` component to position itself, you can use the same [positioning props](/components/popover/#anchor-playground) to position it. For instance, you can display the menu below the anchor:

{{"demo": "pages/components/menus/PositionedMenu.js"}}

## MenuList-Zusammensetzung

Die Komponente `Menü` verwendet intern die Komponente `Popover`. Möglicherweise möchten Sie jedoch eine andere Positionierungsstrategie verwenden oder den Bildlauf nicht blockieren. Um diese Anforderungen zu erfüllen, stellen wir eine `MenuList` Komponente bereit, die Sie zusammen mit `Popper` erstellen können.

Die Hauptaufgabe der `MenuList` Komponente besteht darin, den Fokus festzulegen.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Customized menu

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

🎨 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/styles/menu) an.

## Max height menu

Wenn die Höhe eines Menüs die Anzeige aller Menüelemente verhindert, kann das Menü intern gescrollt werden.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Einschränkungen

Es gibt [einen FlexBox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437), das verhindert, dass `text-overflow: ellipsis` in einem FlexBox Layout funktioniert. Sie können die Komponente `Typography` mit `noWrap` benutzen, um dieses Problem zu umgehen:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## Übergang ändern

Verwenden Sie einen anderen Übergang.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Context menu

Here is an example of a context menu. (Right click to open.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### PopupState-Helfer

Es gibt ein Drittanbieter-Paket [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state), das sich in den meisten Fällen um Popper Status kümmern kann.

{{"demo": "pages/components/menus/MenuPopupState.js"}}
