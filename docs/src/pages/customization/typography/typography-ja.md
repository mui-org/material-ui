# タイポグラフィ

<p class="description">このテーマには、一緒に使用できるタイプサイズのセットと、レイアウトグリッドがあります。</p>

## フォントファミリー

You can change the font family with the `theme.typography.fontFamily` property.

For instance, this demo uses the system font instead of the default Roboto font:

```js
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

### Self-hosted fonts

セルフホストフォントを作成するには、`ttf`、`woff`、または`woff2`形式のフォントファイルをダウンロードし、コードに読み込みます。

⚠️これには、ビルドプロセスに`ttf`、`woff` 、および `woff2`の読み込みを処理できるプラグインまたはローダーが必要です。 フォントはバンドルに*埋め込まれません*。 それらは、 CDNの代わりにWebサーバーからロードされます。 フォントはバンドルに*埋め込まれません*。 それらは、 CDNの代わりにWebサーバーからロードされます。

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';
```

Next, you need to change the theme to use this new font. In order to globally define Raleway as a font face, the [`CssBaseline`](/components/css-baseline/) component can be used (or any other CSS solution of your choice).

```jsx
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: "local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2')";
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
        }
      `,
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        fontFamily: 'Raleway',
      }}
    >
      Raleway
    </Box>
  </ThemeProvider>
);
```

Note that if you want to add additional `@font-face` declarations, you need to use the string CSS template syntax for adding style overrides, so that the previosly defined `@font-face` declarations won't be replaced.

## フォントサイズ

Material-UIでは、フォントサイズに`rem`単位を使用します。 ブラウザの`<html>`要素のデフォルトのフォントサイズは`16px`ですが、ブラウザにはこの値を変更するオプションがあります。そのため、`rem`単位を使用すると、ユーザーの設定に対応できるため、アクセシビリティのサポートが向上します。 ユーザーは、視力の低下から最適な設定の選択まで、さまざまな理由でフォントサイズの設定を変更できます。サイズや表示距離が大幅に異なるデバイスにも対応できます。

Material-UIのフォントサイズを変更するには、`fontSize`プロパティを指定します。 デフォルト値は `14px` です。

```js
const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});
```

ブラウザで計算されるフォントサイズは、次の数式に従います。

<img src="/static/images/font-size.png" alt="font size calculation" style="width: 458px;" />

<!-- https://latex.codecogs.com/png.latex?\dpi{200}&space;\text{computed}&space;=&space;\text{specification}\cdot\frac{\text{typography.fontSize}}{14}\cdot\frac{\text{html&space;fontsize}}{\text{typography.htmlFontSize}} -->

### レスポンシブフォントサイズ

[media queries](/customization/breakpoints/#api) を使用できます： Typographyバリアント型プロパティは、生成されたCSSに直接マップされます。 [media queries](/customization/breakpoints/#api) を使用できます：

```js
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
```

{{"demo": "pages/customization/typography/CustomResponsiveFontSizes.js"}}

この設定を自動化するには、[`responsiveFontSizes()`](/customization/theming/#responsivefontsizes-theme-options-theme)ヘルパーを使用して、テーマのタイポグラフィフォントサイズを応答可能にします。

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideToolbar": true}}

以下の例で実際にこれを見ることができます。 Adjust your browser's window size, and notice how the font size changes as the width crosses the different [breakpoints](/customization/breakpoints/):

```js
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

### 滑らかなフォントサイズ

完了予定：[＃15251 ](https://github.com/mui-org/material-ui/issues/15251) 。

### HTMLフォントサイズ

`<html>`要素のデフォルトのフォントサイズを変更することもできます。 たとえば、[ 10pxの単純化を使用する場合](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/) 。

> ⚠️ フォントサイズを変えるとアクセシビリティに悪影響を及ぼす可能性があります ♿️ Most browsers agreed on the default size of 16 pixels, but the user can change it. For instance, someone with an impaired vision could have set their browser's default font size to something larger.

An `htmlFontSize` theme property is provided for this use case, which tells Material-UI what the font-size on the `<html>` element is. これは、計算されたフォントサイズが常に仕様と一致するように、`rem`の値を調整するために使用されます。

```js
const theme = createTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

_以下のデモを正しく表示するには、このページのhtml要素に上記のCSSを適用する必要があります_

{{"demo": "pages/customization/typography/FontSizeTheme.js"}}

## バリアント

タイポグラフィオブジェクトは、デフォルトでは[13のバリアント](/components/typography/#component)を持っています。

- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- サブタイトル2
- body1
- body2
- ボタン
- キャプション
- オーバーライン

これらのバリアントは各々個別にカスタマイズ可能です。

```js
const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
```

{{"demo": "pages/customization/typography/TypographyVariants.js"}}

## Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. Here is what you need to do:

**Step 1. Update the theme's typography object**

```js
const theme = createTheme({
  typography: {
    poster: {
      color: 'red',
    },
    // Disable h3 variant
    h3: undefined,
  },
});
```

**Step 2. Update the necessary typings (if you are using TypeScript)**

> If you aren't using TypeScript you should skip this step.

You need to make sure that the typings for the theme's `typography` variants and the `Typography`'s `variant` prop reflects the new set of variants.

<!-- Tested with packages/material-ui/test/typescript/augmentation/typographyVariants.spec.ts -->

```ts
declare module '@material-ui/core/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@material-ui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}
```

**Step 3. You can now use the new variant**

{{"demo": "pages/customization/typography/TypographyCustomVariant.js", "hideToolbar": true}}

```jsx
<Typography variant="poster">poster</Typography>;

/* This variant is no longer supported */
<Typography variant="h3">h3</Typography>;
```

## デフォルト値

タイポグラフィのデフォルト値を調べるには、[テーマエクスプローラ](/customization/default-theme/?expand-path=$.typography)を使うか、このページの開発ツールコンソール（`window.theme.typography`）を開くことで調べることができます。
