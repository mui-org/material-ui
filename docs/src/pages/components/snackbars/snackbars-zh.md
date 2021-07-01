---
title: React Snackbar（消息条）组件
components: Snackbar, SnackbarContent
githubLabel: 'component: Snackbar'
materialDesign: https://material.io/components/snackbars
waiAria: 'https://www.w3.org/TR/wai-aria-1.1/#alert'
---

# Snackbar（消息条）

<p class="description">消息条提供简短的通知信息。 该组件也被称为 toast。</p>

消息条将应用程序已执行或即将执行的进程通知给用户。 它们会从屏幕底部短暂地出现。 它们不应该打断用户体验，也不需要用户输入就能消失。

消息条包含了一行直接与所执行操作相关的文本。 它们可能包含一些文本操作，但并不会展示图标。 您也可以用他们展示通知。

{{"component": "modules/components/ComponentLinkHeader.js"}}

#### 频率

我们规定一次只能显示一个消息条。

## 简单的消息条

一个简单的消息条旨在重现谷歌 Keep 消息条的行为。

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## 自定义的消息条

你可以参考以下一些例子来自定义组件。 您可以在 [重写文档页面](/customization/how-to-customize/) 中了解更多有关此内容的信息。

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## 定位的消息条

在宽大的布局中，如果消息条始终放在屏幕底部的同一位置，那么可以左对齐或中间对齐，但在某些情况下，消息条的位置可能需要更加灵活。 通过指定 `anchorOrigin` 的属性，您可以控制消息条的位置。

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## 消息的长度

有些消息条会有不同的长度。

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## 过渡动画

### 连续的消息条

当需要显示多个消息条的时候，一次应该只显示一个。

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### 消息条（Snackbars）和悬浮按钮（FABs）

消息条应当显示在悬浮按钮的上方（这是在移动设备上）。

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

### 更改过渡动画

[Grow](/components/transitions/#grow) 是默认的过渡动画，但你可以使用不同的过渡动画。

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### 控制滑动的方向

你可以修改 [Slide](/components/transitions/#slide) 过渡的方向 。

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm下载](https://img.shields.io/npm/dm/notistack.svg)

以下例子演示了如何使用 [notistack](https://github.com/iamhosseindhv/notistack)。 notistack 有一个 **imperative API** 可以轻松地显示一串消息条，且无需处理其打开/关闭状态。 It also enables you to **stack** them on top of one another (although this is discouraged by the Material Design guidelines).

TODO: Add example once notistack is compatible with v5 or replace with [#1824](https://github.com/mui-org/material-ui/issues/1824).

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-1.1/#alert)

- 默认情况下，消息条不会自动隐藏。 但是，如果您决定使用 `autoHideDuration` 属性，我们建议给用户提供 [足够的时间](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) 来响应。
