---
title: React Popover（弹出框）组件
components: Grow, Popover
githubLabel: 'component: Popover'
---

# Popover 弹出框

<p class="description">使用弹出框组件，您可在另一个元素之上显示一些内容。</p>

使用`弹出框`组件时，你需要了解的事项：

- 该组件构建在 [`Modal`](/components/modal/) 组件之上。
- 不同于  [`Popper`](/components/popper/) 组件，滚动（scroll）和 click away 行为是被阻止的。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic Popover

{{"demo": "pages/components/popover/BasicPopover.js" }}

## 锚点（Anchor）测试

你可以使用单选按钮（radio buttons）调整 `anchorOrigin` 和 `transformOrigin` 的位置。 您还可以将 `anchorReference` 设置为 `anchorPosition` 或 `anchorEl`。 当设置为 `anchorPosition` 时，该组件将指向 `anchorPosition` 属性，用其可以调整设置弹出框的位置，而不是指向`anchorEl`。

{{"demo": "pages/components/popover/AnchorPlayground.js", "hideToolbar": true}}

## 鼠标悬停的交互事件

This demo demonstrates how to use the `Popover` component and the mouseover event to achieve popover behavior.

{{"demo": "pages/components/popover/MouseOverPopover.js"}}

## 补充项目

For more advanced use cases, you might be able to take advantage of:

### PopupState helper

在大多数情况下，一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 可以为你管理 popper 的状态。

{{"demo": "pages/components/popover/PopoverPopupState.js"}}
