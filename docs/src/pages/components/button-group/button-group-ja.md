---
title: React ButtonGroup コンポーネント
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Button group

<p class="description">ButtonGroupコンポーネントは、関連するボタンをグループ化するために使用することができます。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本的なbutton group

The buttons can be grouped by wrapping them with the `ButtonGroup` component. They need to be immediate children.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Button variants

All the standard button variants are supported.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## サイズと色

The `size` and `color` props can be used to control the appearance of the button group.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## 縦のグループ

The button group can be displayed vertically using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Split button

`ButtonGroup` で分割したボタンを作成することも可能です。 この例のようにドロップダウンでボタンの動作を変更することも、関連する動作をすぐに起動するために使用することもできます。 The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## 高さを無効化する

`disableElevation`でシャドウを取り除けます。

{{"demo": "pages/components/button-group/DisableElevation.js"}}
