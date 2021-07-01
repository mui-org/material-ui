---
title: Composant React List
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: List'
materialDesign: https://material.io/components/lists
---

# Lists (Listes)

<p class="description">Les listes sont continues, des index verticaux de texte ou d’images.</p>

[Les listes](https://material.io/design/components/lists.html) sont des groupes successifs de textes ou d'images. Ils sont composés d'items contenant les actions primaires ou secondaires, représentées par des icônes et/ou du texte.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Liste simple

{{"demo": "pages/components/lists/SimpleList.js", "bg": true}}

Le dernier élément de la démonstration précédente montre comment vous pouvez créer un lien:

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

Vous pouvez trouver une [démonstration avec la bibliothèque React Router en suivant cette section](/guides/composition/#react-router) de la documentation.

## Liste imbriquée

{{"demo": "pages/components/lists/NestedList.js", "bg": true}}

## Liste en répertoires

{{"demo": "pages/components/lists/FolderList.js", "bg": true}}

## Interactif

Vous trouverez ci-dessous une démo interactive vous permettant d'explorer les résultats visuels des différents paramètres:

{{"demo": "pages/components/lists/InteractiveList.js", "bg": true}}

## Sélection d'élément de liste

{{"demo": "pages/components/lists/SelectedListItem.js", "bg": true}}

## Alignement d'élément de liste

Vous devez modifier l'alignement des éléments de la liste lorsque vous affichez 3 lignes ou plus, définissez la propriété `alignItems = "flex-start"`.

{{"demo": "pages/components/lists/AlignItemsList.js", "bg": true}}

## Controles de liste

### Case à cocher

Une case à cocher peut être une action principale ou secondaire.

La case a cocher est l'action primaire et l'indicateur d'état pour l'élément liste. Le bouton comment est une action secondaire et une cible séparée.

{{"demo": "pages/components/lists/CheckboxList.js", "bg": true}}

La case à cocher est l'action secondaire pour un élément de liste et une cible distincte.

{{"demo": "pages/components/lists/CheckboxListSecondary.js", "bg": true}}

### Interrupteur (switch)

Le commutateur (switch) est l'action secondaire et une cible distincte.

{{"demo": "pages/components/lists/SwitchListSecondary.js", "bg": true}}

## Épingler les sous-entêtes

Lors du défilement, les sous-en-têtes restent épinglés en haut de l'écran jusqu'à ce qu'ils soient déplacés en dehors de l'écran par le prochain en-tête. This feature relies on CSS sticky positioning. (⚠️ no IE 11 support)

{{"demo": "pages/components/lists/PinnedSubheaderList.js", "bg": true}}

## Élément de la liste d'entrée (inset)

The `inset` prop enables a list item that does not have a leading icon or avatar to align correctly with items that do.

{{"demo": "pages/components/lists/InsetList.js", "bg": true}}

## Liste sans gouttière

When rendering a list within a component that defines its own gutters, `ListItem` gutters can be disabled with `disableGutters`.

{{"demo": "pages/components/lists/GutterlessList.js", "bg": true}}

## Liste virtualisée

Dans l'exemple suivant, nous montrons comment utiliser [react-virtualized](https://github.com/bvaughn/react-window) avec le composant `List`. Il affiche 200 lignes et peut facilement gérer plus. La virtualisation aide à résoudre les problèmes de performances.

{{"demo": "pages/components/lists/VirtualizedList.js", "bg": true}}

If this library doesn't cover your use case, you should consider using [react-virtualized](https://github.com/bvaughn/react-virtualized), then alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso). The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged.

## Personnalisation

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

🎨 Si vous cherchez de l'inspiration, vous pouvez consulter les [exemples de personnalisation de MUI Treasury](https://mui-treasury.com/styles/list-item).

## Personnalisation

🎨 Si vous cherchez de l'inspiration, vous pouvez consulter les [exemples de personnalisation de MUI Treasury](https://mui-treasury.com/styles/list-item).
