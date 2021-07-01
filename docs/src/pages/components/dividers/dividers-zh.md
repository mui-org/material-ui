---
title: React Divider（分隔线）组件
components: Divider
githubLabel: 'component: Divider'
materialDesign: https://material.io/components/dividers
---

# Divider 分隔线

<p class="description">分隔线是对列表和布局中的内容进行分组的一条细线。</p>

分隔线可以将内容分成清晰的几组。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 列表分隔线

默认情况下，分割线会渲染成一个 `<hr>`。 您可以使用 `ListItem` 组件上的 `divider` 属性来保存渲染此 DOM 元素。

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5 规范

在一个列表中，请确保您将 `Divider` 渲染成一个 `<li>` 元素，这样才能遵循 HTML5 规范。 下面的例子展示了两种实现方式。

## 内嵌分隔线

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## 副标题分割线

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## 中段分隔线

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## 文本分隔线

你也可以使用文本内容来渲染分隔线。

{{"demo": "pages/components/dividers/DividerText.js"}}

## 垂直分隔线

您也可以使用 `orientation` 属性将分割线渲染成垂直形状。

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}

> 请注意这其中使用了 `flexItem` 属性来适应 flex 容器。

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "pages/components/dividers/VerticalDividerMiddle.js", "bg": true}}

### 垂直的文本分隔线

你也可以使用文本内容来渲染垂直的分隔线。

{{"demo": "pages/components/dividers/VerticalDividerText.js"}}
