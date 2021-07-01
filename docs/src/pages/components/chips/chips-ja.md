---
title: React Chip コンポーネント
components: Chip
githubLabel: 'component: Chip'
materialDesign: https://material.io/components/chips
---

# Chip

<p class="description">Chipsは、入力、属性、やアクションを表すコンパクトな要素です。</p>

Chipを使用すると、情報の入力、選択、内容のフィルター、またはアクションのトリガーを行うことができます。

ここで、スタンドアロンコンポーネントとして含まれていますが、最も一般的な用途は、 何らかの形の入力なので、ここで示した挙動の一部はコンテキストに表示されません。

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

あなたは小さなチップを定義するために `サイズ` propsを使うことができます。

{{"demo": "pages/components/chips/SizesChips.js"}}

## Chip array

An example of rendering multiple chips from an array of values. チップを削除すると、それがアレイから削除されます。 Note that since no `onClick` prop is defined, the `Chip` can be focused, but does not gain depth while clicked or touched.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Chip playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## アクセシビリティ

チップが削除またはクリック可能な場合は、タブの順序でボタンになります。 When the Chip is focused (e.g. when tabbing) releasing (`keyup` event) `Backspace` or `Delete` will call the `onDelete` handler while releasing `Escape` will blur the Chip.
