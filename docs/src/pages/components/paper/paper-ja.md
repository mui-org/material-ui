---
title: Reactペーパーコンポーネント
components: Paper
githubLabel: 'component: Paper'
---

# Paper

<p class="description">マテリアルデザインでは、紙の物理的特性が画面に変換されます。 </p>

アプリケーションの背景に紙のような質感を与えます。 ペーパーコンポーネントは、サイズを変更したり、シャッフルしたり、複数の紙を表示するように扱うことができます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本のペーパーコンポーネント

{{"demo": "pages/components/paper/SimplePaper.js", "bg": true}}

## バリアント

If you need an outlined surface, use the `variant` prop.

{{"demo": "pages/components/paper/Variants.js", "bg": "inline"}}

## Elevation

The elevation can be used to establish a hierachy between other content. In practical terms, the elevation controls the size of the shadow applied to the surface. In dark mode, raising the elevation also makes the surface lighter.

{{"demo": "pages/components/paper/Elevation.js", "bg": "inline"}}
