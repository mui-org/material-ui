---
title: Icon コンポーネント
components: Icon, SvgIcon
githubLabel: 'components: SvgIcon'
materialDesign: https://material.io/design/iconography/system-icons.html
---

# Icons

<p class="description">Material-UIでアイコンを使用するためのガイダンスと提案です。</p>

Material-UIはアイコンについて、3種類の提供方法をサポートします。

1. 標準の [Material Design icons](#material-icons)を、Ractコンポーネント(SVGアイコン)として、エクスポートする方法
1. ReactラッパーのカスタムSVGアイコンとして、[SVGアイコン](#svgicon) コンポーネントを利用する方法
1. Reactラッパーのカスタムフォントアイコンとして、[アイコン](#icon-font-icons)  コンポーネントを利用する方法

## マテリアルアイコン（Material Icons）

Google has created over 1,700 official Material icons, each in five different "themes" (see below). SVGアイコンは、`@material-ui/icons` パッケージでReactコンポーネントとしてそれぞれエクスポートされています。 [これらのアイコンの一覧を検索](/components/material-icons/)することが出来ます。

### インストール

次を使用して、プロジェクトディレクトリにパッケージをインストールします。

```sh
// npmの場合
npm install @material-ui/icons@next

// yarnの場合
yarn add @material-ui/icons@next
```

これらのコンポーネントはMaterial-UIの `SvgIcon` コンポーネントを使用してそれぞれのアイコンを表示するため、`@materialui/core` をpeer-dependencyに持っています。

プロジェクトでまだMaterial-UIを使用していない場合は、次のコマンドでインストールできます:

```sh
// npmの場合
npm install @material-ui/core@next

// yarnの場合
yarn add @material-ui/core@next

```

### 使い方

次の2つの選択肢のいずれかを使用してアイコンをインポートします。

- Option 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

バンドルサイズの面で最も安全なのはOption 1ですが、一部の開発者はOption 2を好みます。 2番目の方法を使用する前に [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) に従ってください。

各マテリアルアイコンには「テーマ」があります。Filled(デフォルト)、Outline、Rounded、Two-tone、そしてSharpです。 デフォルト以外のテーマでアイコンコンポーネントをインポートするには、アイコン名にテーマ名を追加します。 例えば `@material-ui/icons/Delete` アイコンには次のものが含まれます:

- `@material-ui/icons/Delete` としてエクスポートされた Filled テーマ(デフォルト)
- `@material-ui/icons/DeleteOutlined` としてエクスポートされた Outlinedテーマ
- `@material-ui/icons/DeleteRounded` としてエクスポートされた Roundedテーマ
- `@material-ui/icons/DeleteTwoTone` としてエクスポートされた Twotone テーマ
- `@material-ui/icons/DeleteSharp` としてエクスポートされた Sharpテーマ

> Note: The Material Design guidelines name the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@material-ui/icons` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). There are three exceptions to this naming rule: `3d_rotation` exported as `ThreeDRotation`, `4k` exported as `FourK`, and `360` exported as `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

### テスト

テストの目的で、 `@material-ui/icons` で公開された各アイコンには、アイコンの名前を持つ `data-testid` 属性があります。 例えば：

```jsx
import DeleteIcon from '@material-ui/icons/Delete';
```

は次の属性を持っています

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon

カスタム SVG アイコンが必要な場合 ( [Material Icons](/components/material-icons/)にない場合) は、 `SvgIcon` ラッパーを使用できます。 This component extends the native `<svg>` element:

- It comes with built-in accessibility.
- SVG elements should be scaled for a 24x24px viewport so that the resulting icon can be used as is, or included as a child for other Material-UI components that use icons. (This can be customized with the `viewBox` attribute).
- By default, the component inherits the current color. Optionally, you can apply one of the theme colors using the `color` prop.

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### カラー

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Size

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Component プロパティ

You can use the `SvgIcon` wrapper even if your icons are saved in the `.svg` format. [svgr](https://github.com/smooth-code/svgr) has loaders to import SVG files and use them as React components. For example, with webpack:

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// ---
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

It's also possible to use it with "url-loader" or "file-loader". This is the approach used by Create React App.

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
}

// ---
import { ReactComponent as StarIcon } from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

### createSvgIcon

The `createSvgIcon` utility component is used to create the [Material icons](#material-icons). It can be used to wrap an SVG path with an SvgIcon component.

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
```

{{"demo": "pages/components/icons/CreateSvgIcon.js"}}

### Font Awesome

If you find that there are layout issues when using FontAwesomeIcon from `@fortawesome/react-fontawesome`, you can try passing the Font Awesome SVG data directly to SvgIcon.

以下は、`FontAwesomeIcon`コンポーネントとラップされた`SvgIcon`コンポーネントの比較です。

{{"demo": "pages/components/icons/FontAwesomeSvgIconDemo.js"}}

FontAwesomeIcon's `fullWidth` prop can also be used to approximate the correct dimensions, but it isn't perfect.

### ライブラリ

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 icons. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component, or with `createSvgIcon()`.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

`Icon` will set the correct class name for the Material icon font. As a prerequisite, you must include one, such as the [Material icon font](https://google.github.io/material-design-icons/#icon-font-for-the-web) in your project. アイコンを使用するには、単純にアイコン名（フォントの合字）を `Icon` コンポーネントでラップします。例えば：

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

デフォルトでは、アイコンは現在のテキストの色を継承します。 必要に応じて、テーマの色のプロパティのいずれかを使用して、アイコンの色を設定することができます。`primary`, `secondary`, `action`, `error`, `disabled` です。

### Font Material icons

`Icon` はデフォルトで、Material Iconsフォント(Filled)に正しいベースクラス名を設定します。 あなたがしなければいけないことは例えばGoogle Web Fontsなどからフォントをロードすることだけです。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

{{"demo": "pages/components/icons/Icons.js"}}

### カスタムフォント

他のフォントを使用する場合、 `baseClassName` プロパティを使用してベースラインクラス名をカスタマイズできます。 たとえば、two-toneのMaterial Designアイコンを表示できます。

```jsx
import Icon from '@material-ui/core/Icon';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
  // Import the two tones MD variant                           ^^^^^^^^
/>;
```

{{"demo": "pages/components/icons/TwoToneIcons.js"}}

#### Global base class name

Modifying the `baseClassName` prop for each component usage is repetitive. You can change the default prop globally with the theme

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      defaultProps: {
        // Replace the `material-icons` default value.
        baseClassName: 'material-icons-two-tone',
      },
    },
  },
});
```

Then, you can use the two-tone font directly:

```jsx
<Icon>add_circle</Icon>
```

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) は `Icon` コンポーネントで以下のように使用できます:

{{"demo": "pages/components/icons/FontAwesomeIcon.js"}}

Font AwesomeのアイコンはMaterial Designのアイコンのようにデザインされていない(前の2つのデモと比較して)ことに注意してください。 faアイコンは、利用可能なすべてのスペースを使用するようにトリミングされます。 これはグローバルオーバーライドで調整できます。

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/components/icons/FontAwesomeIconSize.js"}}

## Font vs SVG どのアプローチを使用しますか？

どちらの方法でも問題なく動作しますが、特にパフォーマンスとレンダリング品質の点で、わずかな違いがいくつかあります。 コード分割を可能にし、より多くのアイコンをサポートし、より速くより良くレンダリングするので、可能な限りSVGが優先されます。

詳しくは、[why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/)をご覧ください。

## アクセシビリティ

アイコンはあらゆる種類の有意義な情報を伝えることができるので、適切な場所にアクセスできるようにすることが重要です。 考慮するユースケースが2つあります。

- **装飾アイコン** は、視覚的またはブランド強化のためにのみ使用されています。 それらがページから削除された場合でも、ユーザーはあなたのページを理解して使用することができます。
- **セマンティックアイコン** は、単なる装飾ではなく、意味を伝えるためのものです。 これには、ボタン、フォーム要素、トグルなど、インタラクティブコントロールとして使用されるテキストのないアイコンが含まれます。

### 装飾アイコン

アイコンが純粋に装飾的なものであれば、他にすることはありません。 他のフォントの場合、Iconコンポーネントの `className` プロパティを使用して クラス名を指定する必要があります。

### セマンティックアイコン

#### セマンティックSVGアイコン

`titleAccess` プロパティに意味のある値を含める必要があります。 正しいアクセシビリティのために、`role="img"` 属性と `<title>` 要素が追加されます。

アイコンボタンと一緒に使用したときのようにフォーカス可能なインタラクティブ要素の場合は、 `aria-label` プロパティを使用できます。

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

#### セマンティックフォントアイコン

支援技術にのみ表示される代替テキストを提供する必要があります。

```jsx
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { visuallyHidden } from '@material-ui/utils';

// ...

<Icon>add_circle</Icon>
<Box component="span" sx={visuallyHidden}>Create a user</Box>
```

#### リファレンス

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
