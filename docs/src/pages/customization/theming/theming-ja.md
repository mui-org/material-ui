# テーマ

<p class="description">あなたが作成したテーマでMaterial-UIをカスタマイズしてください。 色や文字のスタイルなどを変更できます。</p>

テーマはコンポーネントの色、表面の暗さ、影のレベル、インク要素の透明度等を指定します。

テーマを使用することで、アプリに一貫したトーンを適用できます。 あなたのビジネスやブランドのニーズに合うようにデザインをカスタマイズすることができます。

アプリ間で一貫性を高めるために、ライトテーマとダークテーマを選択できます。 デフォルトでは、ライトテーマを使用する仕様になっています。

## テーマプロバイダー

`ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize. 詳細については、[ APIセクション](/styles/api/#themeprovider) をご覧ください。

詳細については、[ APIセクション](/styles/api/#themeprovider) をご覧ください。 `ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize.

## テーマ構成変数(Theme configuration variables)

テーマの構成変数を変更することは、Material-UIをニーズに合わせる最も効果的な方法です。 以下のセクションでは、最も重要なテーマ変数について説明します。 以下のセクションでは、最も重要なテーマ変数について説明します。 以下のセクションでは、最も重要なテーマ変数について説明します。 以下のセクションでは、最も重要なテーマ変数について説明します。 以下のセクションでは、最も重要なテーマ変数について説明します。 以下のセクションでは、最も重要なテーマ変数について説明します。

- [`.パレット`](/customization/palette/)
- [`.タイポグラフィ`](/customization/typography/)
- [`.spacing`](/customization/spacing/)
- [`.ブレークポイント`](/customization/breakpoints/)
- [`.zIndex`](/customization/z-index/)
- [`.transições`](/customization/transitions/)
- [`.コンポーネント`](/customization/theme-components/)

[既定のテーマセクション](/customization/default-theme/)をチェックアウトすると、既定のテーマをすべて表示できます。

### カスタム変数

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider), it can be convenient to add additional variables to the theme so you can use them everywhere. 例えば：

```jsx
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```tsx
declare module '@material-ui/core/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
```

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## コンポーネント内のテーマへのアクセス

<video autoPlay muted loop width="320">
  <source src="/static/studies.mp4" type="video/mp4" >
</video>

Reactコンポーネント内のテーマ変数に[アクセスできます](/styles/advanced/#accessing-the-theme-in-a-component) 。

- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/): A tool to generate themes for your Material-UI applications by just selecting the colors and having a live preview. Includes basic site templates to show various components and how they are affected by the theme
- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): Is an online tool for creating Material-UI themes via Material Design Color Tool.
- [マテリアルパレットジェネレータ](https://material.io/inline-tools/color/)　: マテリアルパレットジェネレータを使用して、入力した任意のカラーのパレットを生成できます。

## コンポーネント内のテーマへのアクセス

Reactコンポーネント内のテーマ変数に[アクセスできます](/styles/advanced/#accessing-the-theme-in-a-component) 。

## テーマのネスト

複数のテーマプロバイダーを[ネストできます](/styles/advanced/#theme-nesting)。

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

内部テーマは外側のテーマを**オーバーライドします**。 内部テーマは外側のテーマを**オーバーライドします**。 関数を提供することにより、外側のテーマを拡張できます。

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

**パフォーマンスに関する注意**

Otherwise you'll encounter `Error: Function component cannot be given refs`. See also: [Composition: Caveat with refs](/guides/composition/#caveat-with-refs).

- `theme`: レンダリングのたびに新しいテーマを指定すると、新しいCSSオブジェクトが計算されて注入されます。 UIの一貫性とパフォーマンスの両方のために、限られた数のテーマオブジェクトをレンダリングすることをお勧めします。 UIの一貫性とパフォーマンスの両方のために、限られた数のテーマオブジェクトをレンダリングすることをお勧めします。 UIの一貫性とパフォーマンスの両方のために、限られた数のテーマオブジェクトをレンダリングすることをお勧めします。 UIの一貫性とパフォーマンスの両方のために、限られた数のテーマオブジェクトをレンダリングすることをお勧めします。 UIの一貫性とパフォーマンスの両方のために、限られた数のテーマオブジェクトをレンダリングすることをお勧めします。 UIの一貫性とパフォーマンスの両方のために、限られた数のテーマオブジェクトをレンダリングすることをお勧めします。
- `styles` ：スタイルオブジェクトが大きいほど、より多くの作業が必要になります。

## API

### `createTheme(options, ...args) => theme`

受け取ったオプションに基づいてテーマを生成します。

#### 引数

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### 戻り値

`theme` (_object_): A complete, ready-to-use theme object.

#### 例

```js
import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

受け取ったオプションに基づいて、 レスポンシブなtypographyを生成します。

#### 引数

1. `theme` (_object_): The theme object to enhance.
2. `options` (_object_ [optional]):

- `breakpoints` (_array\<string\>_ [optional]): Default to `['sm', 'md', 'lg']`. `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`.
- `disableAlign` (_bool_ [optional]): Default to `false`. フォントサイズがわずかに変化して線が表示されるかどうか 高さは保持され、Material Designの4pxライン高さグリッドに位置合わせされます。 これには、テーマのスタイルで単位なしの行の高さが必要です。 これには、テーマのスタイルで単位なしの行の高さが必要です。 これには、テーマのスタイルで単位なしの行の高さが必要です。
- `factor` (_number_ [optional]): Default to `2`. この値は、フォントサイズのサイズ変更の強度を決定します。 値が大きいほど、小さな画面のフォントサイズの差は小さくなります。 値が小さいほど、小さい画面のフォントサイズが大きくなります。 値は1より大きくなければなりません。 値が大きいほど、小さな画面のフォントサイズの差は小さくなります。 値が小さいほど、小さい画面のフォントサイズが大きくなります。 値は1より大きくなければなりません。 値が大きいほど、小さな画面のフォントサイズの差は小さくなります。 値が小さいほど、小さい画面のフォントサイズが大きくなります。 値は1より大きくなければなりません。 値が大きいほど、小さな画面のフォントサイズの差は小さくなります。 値が小さいほど、小さい画面のフォントサイズが大きくなります。 値は1より大きくなければなりません。
- `variants` (_array\<string\>_ [optional]): Default to all. 処理するタイポグラフィバリアント。

#### 戻り値

`theme` (_object_): The new theme with a responsive typography.

#### 例

```js
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Using `unstable_createMuiStrictModeTheme` restricts the usage of some of our components.

#### 引数

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### 戻り値

`theme` (_object_): A complete, ready to use theme object.

#### 例

```js
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```
