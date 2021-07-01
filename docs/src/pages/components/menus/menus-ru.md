---
title: Компонент React Menu
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
githubLabel: 'component: Menu'
materialDesign: https://material.io/components/menus
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Menu

<p class="description">Меню временно отображают список вариантов.</p>

A menu displays a list of choices on a temporary surface. Оно появляется когда пользователь взаимодействует с кнопкой или другим элементом управления.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic menu

A basic menu opens over the anchor element by default (this option can be [changed](#menu-positioning) via props). When close to a screen edge, a basic menu vertically realigns to make sure that all menu items are completely visible.

Выбор варианта должен в идеале немедленно зафиксировать его и закрыть меню.

**Неточности:** В отличии от простых меню, простые диалоги могут содержать дополнительную информацию относительно опций, доступных для элемента списка или предоставлять навигационные или ортогональные действия, относящиеся к главной задаче. Although they can display the same content, simple menus are preferred over simple dialogs because simple menus are less disruptive to the user's current context.

{{"demo": "pages/components/menus/BasicMenu.js"}}

## Selected menu

If used for item selection, when opened, simple menus places the initial focus on the selected menu item. The currently selected menu item is set using the `selected` property (from [ListItem](/api/list-item/)). To use a selected menu item without impacting the initial focus, set the `variant` prop to "menu".

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## Positioned menu

Because the `Menu` component uses the `Popover` component to position itself, you can use the same [positioning props](/components/popover/#anchor-playground) to position it. For instance, you can display the menu below the anchor:

{{"demo": "pages/components/menus/PositionedMenu.js"}}

## MenuList composition

The `Menu` component uses the `Popover` component internally. However, you might want to use a different positioning strategy, or not blocking the scroll. For answering those needs, we expose a `MenuList` component that you can compose, with `Popper` in this example.

The primary responsibility of the `MenuList` component is to handle the focus.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Customized menu

Ниже находится пример кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/menu).

## Max height menu

Если высота меню препятствует отображению всех пунктов меню, меню можно прокручивать внутри.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Ограничения

Существует [ошибка flexbox](https://bugs.chromium.org/p/chromium/issues/detail?id=327437), которая предотвращает работу свойства `text-overflow: ellipsis` внутри flexbox. Вы можете использовать компонент `Typography` с `noWrap`, чтобы обойти эту проблему:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## Change transition

Используйте другой transition.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Context menu

Вот пример контекстного меню. (Right click to open.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## Дополнительные проекты

Для более сложных вариантов использования вы можете воспользоваться:

### PopupState helper

Существует сторонний пакет [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state), который, в большинстве случаев, заботится о состоянии всплывающего меню за вас.

{{"demo": "pages/components/menus/MenuPopupState.js"}}
