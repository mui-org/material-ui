---
title: App Bar コンポーネント
components: AppBar, Toolbar, Menu
githubLabel: 'component: AppBar'
materialDesign: https://material.io/components/app-bars-top
---

# App Bar

<p class="description">App Barには、現在の画面に関する情報と操作が表示されます。</p>

トップにあるApp Barは、現在の画面に関連するコンテンツとアクションを提供します。 それらはブランディング、画面タイトル、ナビゲーション、およびアクションに使用されます。

アクションバーに変換したり、ナビゲーションバーとして使うことができます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基本的なApp Bar

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## 基本的な検索フィールド付きApp Bar

基本的な検索バー

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## メニュー付き App Bar

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## 検索フィールド付きApp Bar

サイド検索バー

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## Dense App Bar (デスクトップのみ)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## Prominent

目立つアプリバー

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## 下部アプリバー

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## ラベルの配置

アプリバーの位置を固定してレンダリングすると、要素の寸法はページの残りの部分に影響しません。 これにより、コンテンツの一部がアプリバーの背後で見えなくなる可能性があります。 以下に3つの解決策を示します。 これにより、コンテンツの一部がアプリバーの背後で見えなくなる可能性があります。 以下に3つの解決策を示します。 これにより、コンテンツの一部がアプリバーの背後で見えなくなる可能性があります。 以下に3つの解決策を示します。 これにより、コンテンツの一部がアプリバーの背後で見えなくなる可能性があります。 以下に3つの解決策を示します。 これにより、コンテンツの一部がアプリバーの背後で見えなくなる可能性があります。 以下に3つの解決策を示します。

1. fixed の代わりに `position="sticky"` を使用できます。 ⚠️ stickyはIE11ではサポートされていません。
2. 2番目の `<Toolbar />` コンポーネントをレンダリングできます:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. `theme.mixins.toolbar` CSSを使えます。:

```jsx
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Offset />
    </React.Fragment>
  );
}
```

## スクロール

`useScrollTrigger()` hookを使用して、ユーザーのスクロールアクションに 対応できます。

### App Barを隠す

アプリバーは下にスクロールすると非表示になり、読み込めるスペースが増えます。

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### App Barを固定する

アプリバーはスクロール時に上昇し、ユーザーがページの上部にいないことを伝えます。

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### トップへ戻る

スクロール時にフローティングアクションボタンが表示され、ページの上部に簡単に戻ることができます。

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### 引数

1. `options` (_object_ [optional]):

   - `options.disableHysteresis` (_bool_ [optional]): Defaults to `false`. ヒステリシスを無効にします。 ` trigger ` 値を決定するときにスクロール方向を無視します。
   - `options.target` (*Node* [optional]): デフォルト値: `window`.
   - `options.threshold` (*number* [optional]): デフォルト値:`100`. 垂直スクロールがこのしきい値(排他的) を厳密に超えたときに`trigger` 値を変更します。

#### 戻り値

`trigger`：スクロール位置が基準に合っていますか？

#### 例

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```

## Enable Color on Dark

Following the [Material Design guidelines](https://material.io/design/color/dark-theme.html), the `color` prop has no effect on the appearance of the AppBar in dark mode. You can override this behavior by setting the `enableColorOnDark` prop to `true`.

```jsx
// Specific element via prop
<AppBar enableColorOnDark />

// Affect all AppBars via theme
<ThemeProvider
  theme={createTheme({
    components: {
      MuiAppBar: {
        defaultProps: {
          enableColorOnDark: true,
        },
      },
    },
  })}
>
  <AppBar />
</ThemeProvider>
```
