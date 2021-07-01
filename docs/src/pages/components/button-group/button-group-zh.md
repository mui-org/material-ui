---
title: React ButtonGroup（按钮组）组件
components: Button, ButtonGroup
githubLabel: '组件：按钮组'
---

# Button groups 按钮组组件

<p class="description">按钮组组件可用于对相关按钮进行分组。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic button group 基本的按钮组

The buttons can be grouped by wrapping them with the `ButtonGroup` component. They need to be immediate children.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Button variants

All the standard button variants are supported.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## 大小和颜色

The `size` and `color` props can be used to control the appearance of the button group.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Vertical group 垂直组

The button group can be displayed vertically using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Split button 分体式按钮

`按钮组组件`也可用于创建分体式按钮。 The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Disabled elevation 禁用立体效果（elevation）

你也可以使用属性 `disableElevation` 属性来消除实心按钮的立体效果。

{{"demo": "pages/components/button-group/DisableElevation.js"}}
