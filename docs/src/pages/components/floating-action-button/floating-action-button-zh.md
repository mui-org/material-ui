---
title: React Fab（浮动操作按钮）组件
components: Fab
githubLabel: 'component: Fab'
materialDesign: https://material.io/components/buttons-floating-action-button
---

# Floating action button 浮动操作按钮组件

<p class="description">浮动操作按钮 (FAB) 通常用于在屏幕上执行一些主要的或是最为常见的操作。</p>

浮动操作按钮组件出现在所有屏幕内容的前面，通常是以圆形的形状出现，并且中间有一个图标。 FAB 有两种类型：常规（regular）和扩展（extended）。

Only use a FAB if it is the most suitable way to present a screen's primary action. 在每个屏幕中，我们建议只有一个浮动操作按钮来表示最常见的操作。 在每个屏幕中，我们建议只有一个浮动操作按钮来表示最常见的操作。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的浮动操作按钮

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size 大小

By default, the size is `large`. Use the `size` prop for smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

{{"demo": "pages/components/floating-action-button/FloatingActionButtonExtendedSize.js"}}

## Animation 动画

默认情况下，浮动操作按钮会以展开一片区域的动画在屏幕上出现。

当跨越多个横向屏幕（如标签式屏幕）时，浮动操作按钮应短暂消失，然后当动作改变的时候，重新出现。

您可以使用缩放动画（Zoom transition）来实现这个效果。 请注意，因为退出动画和进入动画都是同时触发的，所以我们需要使 `enterDelay` 方法，确保在新的浮动操作按钮进入之前，就已经执行完旧的那个的退出动作。

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
