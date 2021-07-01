---
title: React Breadcrumbs（面包屑导航）组件
components: Breadcrumbs, Link, Typography
githubLabel: 'component: Breadcrumbs'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#breadcrumb'
---

# Breadcrumbs 面包屑导航

<p class="description">面包屑导航允许用户在一系列的值中进行选择。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的面包屑导航

{{"demo": "pages/components/breadcrumbs/BasicBreadcrumbs.js"}}

## 激活最后一个面包屑导航

保持最后一个面包屑导航交互。

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## 自定义分隔符

In the following examples, we are using two string separators and an SVG icon.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## 带图标的面包屑导航

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## 可折叠的面包屑导航

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## 自定义的面包屑导航

以下是自定义组件的一个示例。 您可以在 [重写文档页面](/customization/how-to-customize/) 中了解更多有关此内容的信息。

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## 与 react-router 的交互

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

请务必在`面包屑导航`组件上加上 `aria-label` 的描述。

这个组件的可访问性依赖于：

- 这组链接是由一个有序列表（`<ol>`元素）组建的。
- 用 `aria-hidden` 属性隐藏各个链接之间的分隔符，这样屏幕阅读器不会把它们朗读出来。
- 有一个标有 `aria-label` 的 nav（导航）元素标记了面包屑导航的结构，并使其成为导航的标记，这样更容易定位。
