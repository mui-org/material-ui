---
title: React Typography（文字铸排）组件
components: 文字铸排
githubLabel: 'component: Typography'
materialDesign: https://material.io/design/typography/the-type-system.html
---

# Typography 文字铸排

<p class="description">使用文字铸排可以尽可能清晰、高效地展示您的设计和内容。</p>

大量字阶和样式会影响任何布局的美观性。 一个带有限量字阶的[文字铸排比例（typographic scale）](https://material.io/design/typography/#type-scale)能够和排版网格搭配工作。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 概述

Material-UI **不会**自动加载 *Roboto* 字体。 你负责加载你的应用程序中使用的任何字体。 有这样几个简单的方法来加载 Roboto 字体。 若想查询更高级的配置，请参阅[主题定制部分](/customization/typography/)。

## Roboto 字体 CDN

以下是一个简单 link markup，可以用于从 CDN 加载 Roboto字体：

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## 通过 npm 安装

通过在终端键入以下命令，你可以这样 [安装字体](https://www.npmjs.com/package/@fontsource/roboto)：

`npm install @fontsource/roboto`

然后，你可以在开始文件中导入：

```js
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

有关更多信息请查看 [Fontsource](https://github.com/fontsource/fontsource)。

您可以将 Fontsource 配置为加载特定的子集（subsets）、字体粗细（weights）和样式（styles）。 Material-UI 默认的排版配置仅依赖于 300，400，500 和 700 的字体权重。

## 组件

文字铸排组件使其能够轻松地在你的应用程序中应用一组默认的字体权重和大小。

{{"demo": "pages/components/typography/Types.js"}}

## 主题

某些情况下，您可能无法使用 `Typography` 组件。 希望您可以利用 theme 里 [`typography `](/customization/default-theme/?expand-path=$.typography) 的一些值。

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## 改变语义元素

文字铸排组件通过 `variantMapping` 属性关联了一种 UI 变体和某一种语义元素。 重要的是要意识到排版组件的风格是独立于语义基础元素的。

- 使用 `component` 属性，您可以一次性改变底层元素的样式：

```jsx
{
  /* 在此页面中已经有一个 h1 标签，我们不会再重复。 */
}
<Typography variant="h1" component="h2">
  h1. 标题
</Typography>;
```

- 您也可以 [使用 theme](/customization/theme-components/#default-props) 来修改全局字体映射。

```js
const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
```

## 添加 & 禁用变体

除了使用默认的排版变体外，你还可以添加自定义的排版，或者禁用任何你不需要的排版。 更多信息请参见 [添加 & 禁用变体](/customization/typography/#adding-amp-disabling-variants) 示例。

## System props

As a CSS utility component, the `Typography` supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Typography mt={2}>
```

## 无障碍设计

考虑到文字铸排的无障碍设计，需要遵循以下几个关键点：

- **字体颜色**。 在文本颜色和背景颜色间提供足够的对比性，请参考 [WCAG 2.0 颜色对比度](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) 的最低标准（4.5:1）。
- **字体大小（字阶）**。 请使用 [相对单位（rem）](/customization/typography/#font-size) 来适应用户的设置。
- **标题等级**。 请不要跳过[标题的等级](https://www.w3.org/WAI/tutorials/page-structure/headings/) 。 你需要将 [ style 从语义元素中分离开来](#changing-the-semantic-element)，这样能够解决这个问题。
