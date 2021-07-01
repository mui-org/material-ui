---
components: CssBaseline, ScopedCssBaseline
githubLabel: 'component: CssBaseline'
---

# CSSベースライン

<p class="description">Material-UIはCssBaselineコンポーネントを提供することで、エレガントで一貫性のあるシンプルなベースラインを構築します。</p>

[The palette](/system/palette/) style関数。

## Global reset

貴方はもしかしたら、HTMLの要素と属性のスタイル正規化のコレクションである [normalize.css](https://github.com/necolas/normalize.css)精通しているかもしれません。

```jsx
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* アプリケーションの他のコード */}
    </React.Fragment>
  );
}
```

## 子要素にのみスコープさせる

しかしながら、サイトをMaterial-UIに移行している途中で、グローバルなリセットを使えないかもしれません。 `ScopedCssBaseline` コンポーネントを使用して、子要素にのみベースラインを適用することができます。

```jsx
import * as React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import MyApp from './MyApp';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* アプリケーションの他のコード */}
      <MyApp />
    </ScopedCssBaseline>
  );
}
```

⚠️ 上記の例のように、最初に `ScopedCssBaseline` をインポートして、box-sizingの競合を回避してください。

## アプローチ

### ページ

`<html>` および `<body>` 要素は、ページ全体のデフォルトが改善されるように更新されています。 具体的には: 具体的には: 具体的には: 具体的には: 具体的には: 具体的には:

- すべてのブラウザの余白が削除されています。
- デフォルトのマテリアルデザインの背景色が適用されます。 標準のデバイスや、白背景に印刷されたデバイスの為に[`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) が使われています。

### レイアウト

- `ボックスサイズ` は、 `<html>` 要素で `border-box`グローバルに設定されます。 すべての要素（ `*:: before` および `*:: after` を含む）は、このプロパティを継承するように宣言されています は、要素の宣言された幅がパディングまたは境界のために超過しないことを保証されます。

### スクロールバー

The colors of the scrollbars can be customized to improve the contrast (especially on Windows). Add this code to your theme (for dark mode).

```jsx
import darkScrollbar from '@material-ui/core/darkScrollbar';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: theme.palette.mode === 'dark' ? darkScrollbar() : null,
      },
    },
  },
});
```

This website uses `darkScrollbar` when dark mode is enabled. Be aware, however, that using this utility (and customizing `-webkit-scrollbar`) forces MacOS to always show the scrollbar.

### タイポグラフィ

- `<html>`には基本フォントサイズは宣言されていませんが、16pxが想定されています（ブラウザのデフォルト）。 デフォルトのフォントサイズの`<html>`を変更した場合の影響については、ここをクリックしてください。[the theme documentation](/customization/typography/#typography-html-font-size)
- `<body>` 要素に `theme.typography.body1` スタイルを設定します。
- `<b>`、`<strong>`要素のfont-weightに `theme.typography.fontWeightBold` を設定します。
- Roboto フォントの表示を改善するために、カスタムの font-smoothing が有効になります。

## カスタマイズ

ドキュメントの[グローバルカスタマイズ](/customization/how-to-customize/#5-global-css-override)セクションに従って、これらのコンポーネントの出力を変更してください。
