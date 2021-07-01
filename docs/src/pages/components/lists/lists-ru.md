---
title: Компонент React List
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'component: List'
materialDesign: https://material.io/components/lists
---

# Списки

<p class="description">Списки представляют собой непрерывные вертикальные массивы данных из текста или изображений.</p>

[Списки](https://material.io/design/components/lists.html) представляют собой непрерывную группу из текста или изображений. Они состоят из элементов, содержащих основные и дополнительные действия, которые представлены значками и текстом.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic List

{{"demo": "pages/components/lists/BasicList.js", "bg": true}}

Последний элемент предыдущего примера показывает, как вы можете отрисовать ссылку:

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/guides/routing/#list) of the documentation.

## Вложенный список

{{"demo": "pages/components/lists/NestedList.js", "bg": true}}

## Список папок

{{"demo": "pages/components/lists/FolderList.js", "bg": true}}

## Интерактивность

Ниже приведен интерактивный пример, который демонстрирует результаты различных настроек сетки:

{{"demo": "pages/components/lists/InteractiveList.js", "bg": true}}

## Выбранный ListItem

{{"demo": "pages/components/lists/SelectedListItem.js", "bg": true}}

## Выравнивание элементов списка

Вы должны изменить выравнивание элементов списка при отображении 3 или более элементов. Для этого установите свойство `alignItems = "flex-start"`

{{"demo": "pages/components/lists/AlignItemsList.js", "bg": true}}

## Элементы управления списком

### Checkbox

Checkbox может быть основным или второстепенным действием.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/components/lists/CheckboxList.js", "bg": true}}

Тут checkbox является второстепенным действием для элемента списка.

{{"demo": "pages/components/lists/CheckboxListSecondary.js", "bg": true}}

### Switch (переключатель)

Switch является второстепенным действием.

{{"demo": "pages/components/lists/SwitchListSecondary.js", "bg": true}}

## Sticky subheader

При прокрутке подзаголовки остаются закрепленными в верхней части экрана, пока следующий подзаголовок не оттеснит предыдущий. This feature relies on CSS sticky positioning. (⚠️ no IE 11 support)

{{"demo": "pages/components/lists/PinnedSubheaderList.js", "bg": true}}

## Inset List Item

The `inset` prop enables a list item that does not have a leading icon or avatar to align correctly with items that do.

{{"demo": "pages/components/lists/InsetList.js", "bg": true}}

## Gutterless list

When rendering a list within a component that defines its own gutters, `ListItem` gutters can be disabled with `disableGutters`.

{{"demo": "pages/components/lists/GutterlessList.js", "bg": true}}

## Virtualized List

In the following example, we demonstrate how to use [react-window](https://github.com/bvaughn/react-window) with the `List` component. Он отображает 200 строк и c легкостью может еще больше. Virtualization helps with performance issues.

{{"demo": "pages/components/lists/VirtualizedList.js", "bg": true}}

If this library doesn't cover your use case, you should consider using [react-virtualized](https://github.com/bvaughn/react-virtualized), then alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso). The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged.

## Customized List

Ниже находятся примеры кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/lists/CustomizedList.js"}}

## Кастомизация

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/list-item).
