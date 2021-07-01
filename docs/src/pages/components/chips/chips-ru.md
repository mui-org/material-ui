---
title: Компонент React Chip
components: Chip
githubLabel: 'component: Chip'
materialDesign: https://material.io/components/chips
---

# Chip

<p class="description">Фишки - это компактные элементы, представляющие входные данные, атрибут или действие.</p>

[Фишки](https://material.io/design/components/chips.html) позволяют пользователям вводить информацию, делать выбор, фильтровать контент или инициировать действия.

Несмотря на то, что он включен здесь как автономный компонент, наиболее распространенное использование будет в той или иной форме ввода, поэтому некоторые из продемонстрированных здесь действий не показаны в контексте.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic chip

The `Chip` component supports outlined and filled styling.

{{"demo": "pages/components/chips/BasicChips.js"}}

## Chip actions

You can use the following actions.

- Chips with the `onClick` prop defined change appearance on focus, hover, and click.
- Chips with the `onDelete` prop defined will display a delete icon which changes appearance on hover.

### Clickeable

{{"demo": "pages/components/chips/ClickeableChips.js"}}

### Deleteable

{{"demo": "pages/components/chips/DeleteableChips.js"}}

### Clickeable and deleteable

{{"demo": "pages/components/chips/ClickeableAndDeleteableChips.js"}}

### Clickeable link

{{"demo": "pages/components/chips/ClickeableLinkChips.js"}}

### Custom delete icon

{{"demo": "pages/components/chips/CustomDeleteIconChips.js"}}

## Chip adornments

You can add ornaments to the beginning of the component.

Use the `avatar` prop to added a avatar or use the `icon` prop to added a icon.

### Avatar chip

{{"demo": "pages/components/chips/AvatarChips.js"}}

### Icon chip

{{"demo": "pages/components/chips/IconChips.js"}}

## Color chip

You can use the `color` prop to define a primary or secondary color.

{{"demo": "pages/components/chips/ColorChips.js"}}

## Sizes chip

Для определения маленькой фишки можно использовать свойство `size`.

{{"demo": "pages/components/chips/SizesChips.js"}}

## Массив фишек

An example of rendering multiple chips from an array of values. Удаление фишки удаляет ее из массива. Note that since no `onClick` prop is defined, the `Chip` can be focused, but does not gain depth while clicked or touched.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Chip playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Доступность

If the Chip is deletable or clickable then it is a button in tab order. When the Chip is focused (e.g. when tabbing) releasing (`keyup` event) `Backspace` or `Delete` will call the `onDelete` handler while releasing `Escape` will blur the Chip.
