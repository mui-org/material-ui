---
title: React Paper（纸张）组件
components: Paper
githubLabel: 'component: Paper'
---

# Paper 纸张组件

<p class="description">在 Material Design 中，我们在屏幕上展现了纸张的物理属性。 </p>

应用程序的背景类似于纸张的平坦、不透明的纹理，应用程序的行为模仿了纸张的能力，可以重新调整大小、洗牌和装订成多张纸。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础的纸张组件

{{"demo": "pages/components/paper/SimplePaper.js", "bg": true}}

## 变体

如果你想要一个轮廓的曲面，你可以使用 `variant` 属性。

{{"demo": "pages/components/paper/Variants.js", "bg": "inline"}}

## Elevation

The elevation can be used to establish a hierachy between other content. In practical terms, the elevation controls the size of the shadow applied to the surface. In dark mode, raising the elevation also makes the surface lighter.

{{"demo": "pages/components/paper/Elevation.js", "bg": "inline"}}
