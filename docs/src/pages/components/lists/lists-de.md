---
title: React List component
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: List'
materialDesign: https://material.io/components/lists
---

# Listen (List)

<p class="description">Listen sind durchgehende, vertikale Indexe von Text oder Bildern.</p>

[Listen](https://material.io/design/components/lists.html) sind eine fortlaufende Gruppe von Text oder Bildern. Sie bestehen aus Elementen, die primäre und ergänzende Aktionen enthalten, die durch Symbole und Texte dargestellt werden.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic List

{{"demo": "pages/components/lists/BasicList.js", "bg": true}}

Das letzte Element der vorherigen Demo zeigt, wie Sie einen Link rendern können:

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/guides/routing/#list) of the documentation.

## Verschachtelte Liste

{{"demo": "pages/components/lists/NestedList.js", "bg": true}}

## Ordnerliste

{{"demo": "pages/components/lists/FolderList.js", "bg": true}}

## Interaktive Liste

Nachfolgend finden Sie eine interaktive Demo, mit der Sie die visuellen Ergebnisse der verschiedenen Einstellungen untersuchen können:

{{"demo": "pages/components/lists/InteractiveList.js", "bg": true}}

## Ausgewähltes Listenelement

{{"demo": "pages/components/lists/SelectedListItem.js", "bg": true}}

## Listenelemente ausrichten

Sie sollten die Ausrichtung der Listenelemente ändern, wenn Sie 3 Zeilen oder mehr anzeigen. Setzen Sie die Eigenschaft `alignItems = "flex-start"`.

{{"demo": "pages/components/lists/AlignItemsList.js", "bg": true}}

## Listensteuerelemente

### Checkbox

Eine Checkbox kann entweder eine primäre oder eine sekundäre Aktion sein.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/components/lists/CheckboxList.js", "bg": true}}

Die Checkbox ist die sekundäre Aktion für das Listenelement und ein separates Ziel.

{{"demo": "pages/components/lists/CheckboxListSecondary.js", "bg": true}}

### Switch

Der Schalter ist die sekundäre Aktion und ein separates Ziel.

{{"demo": "pages/components/lists/SwitchListSecondary.js", "bg": true}}

## Sticky subheader

Nach dem Scrollen bleiben angeheftete Kopfzeilen am oberen Bildschirmrand fixiert, bis sie von der nächsten Kopfzeile aus dem Bildschirm gedrückt werden. This feature relies on CSS sticky positioning. (⚠️ no IE 11 support)

{{"demo": "pages/components/lists/PinnedSubheaderList.js", "bg": true}}

## Inset List Item

The `inset` prop enables a list item that does not have a leading icon or avatar to align correctly with items that do.

{{"demo": "pages/components/lists/InsetList.js", "bg": true}}

## Virtualisierte Liste

When rendering a list within a component that defines its own gutters, `ListItem` gutters can be disabled with `disableGutters`.

{{"demo": "pages/components/lists/GutterlessList.js", "bg": true}}

## Virtualisierte Liste

Im folgenden Beispiel zeigen wir wie Sie [react-window](https://github.com/bvaughn/react-window) mit der `Listen<` Komponente nutzen können. Sie zeigt 200 Zeilen an und kann auch einfach mehr verwalten. Virtualisierung hilft bei Leistungsproblemen.

{{"demo": "pages/components/lists/VirtualizedList.js", "bg": true}}

Wenn diese Bibliothek Ihren Anwendungsfall nicht abdeckt, sollten Sie [react-virtualized](https://github.com/bvaughn/react-virtualized) und Alternativen wie [react-virtuoso](https://github.com/petyosi/react-virtuoso) in Betracht ziehen. The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged.

## Customized List

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

{{"demo": "pages/components/lists/CustomizedList.js"}}

## Individuelle Anpassung

🎨 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/styles/list-item) an.
