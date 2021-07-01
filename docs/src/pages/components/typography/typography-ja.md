---
title: React Typography component
components: タイポグラフィ
githubLabel: 'component: Typography'
materialDesign: https://material.io/design/typography/the-type-system.html
---

# タイポグラフィ

<p class="description">タイポグラフィを使用して、デザインとコンテンツをできるだけ明確かつ効率的に表現します。</p>

**Font size**. [typographic scale](https://material.io/design/typography/#type-scale) は、レイアウトグリッドとともに適切に機能する限られたタイプサイズのセットがあります。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本設定

*Roboto*フォントは、Material-UIによって自動的にロード**されません** 。 You are responsible for loading any fonts used in your application. Roboto Fontには、簡単に開始できる方法がいくつかあります。 より高度な設定については、[テーマのカスタマイズセクション](/customization/typography/)チェックしてください 。

## Roboto Font CDN

以下に、CDNからRobotoフォントをロードするために使用されるリンクマークアップのサンプルを示します。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Install with npm

端末で次のコマンドを入力すると、[インストール](https://www.npmjs.com/package/@fontsource/roboto)できます。

`npm install @fontsource/roboto`

その後、エントリポイントにインポートできます。

```js
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

For more info check out [Fontsource](https://github.com/fontsource/fontsource).

Fontsource can be configured to load specific subsets, weights and styles. Material-UIのデフォルトのタイポグラフィ構成は、300、400、500、および700のフォントウェイトのみに依存しています。

## Component

The Typography component makes it easy to apply a default set of font weights and sizes in your application.

{{"demo": "pages/components/typography/Types.js"}}

## テーマ

状況によっては、 `Typography` コンポーネントを使用できない場合があります。 状況によっては、 `Typography` コンポーネントを使用できない場合があります。 状況によっては、 `Typography` コンポーネントを使用できない場合があります。 状況によっては、 `Typography` コンポーネントを使用できない場合があります。 状況によっては、 `Typography` コンポーネントを使用できない場合があります。 このテーマのe [`typography`](/customization/default-theme/?expand-path=$.typography)キーを活用できることを願っています。 このテーマのe [`typography`](/customization/default-theme/?expand-path=$.typography)キーを活用できることを願っています。

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## セマンティック要素の変更

Typographyコンポーネントは、 `variantMapping` プロパティを使用して、UIバリアントをセマンティック要素に関連付けます。 It's important to realize that the style of a typography component is independent from the semantic underlying element.

- You can change the underlying element for a one time occasion with the `component` property:

```jsx
{/* There is already an h1 in the page, let's not duplicate it. */}
<Typography variant="h1" component="h2">
  h1. */}
<Typography variant="h1" component="h2">
  h1.
```

- 以下のようにテーマ使用して、[マッピング をグローバルに](/customization/theme-components/#default-props)変更できます。

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

## Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. See the [Adding & disabling variants](/customization/typography/#adding-amp-disabling-variants) example for more info.

## System props

As a CSS utility component, the `Typography` supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Typography mt={2}>
```

## アクセシビリティ

A few key factors to follow for an accessible typography:

- **Color**. Provide enough contrast between text and its background, check out the minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Font size**. Use [relative units (rem)](/customization/typography/#font-size) to accommodate the user's settings.
- **Heading hierarchy**. [Don't skip](https://www.w3.org/WAI/tutorials/page-structure/headings/) heading levels. In order to solve this problem, you need to [separate the semantics from the style](#changing-the-semantic-element).
