# カラー

<p class="description"><strong>Palette</strong>: A palette is a collection of colors, i.e. hues and their shades. Out of the box you get access to all colors in the Material Design guidelines.</p>

Material Design[color system](https://material.io/design/color/)を使用すると、自分のブランドやスタイルを反映した色のテーマを作成できます。

## Picking colors

### 公式カラーツール

The Material Design team has also built an awesome palette configuration tool: [material.io/resources/color/](https://material.io/resources/color/). これにより、UIのカラーパレットを作成したり、任意のカラー組み合わせのアクセシビリティレベルを測定したりできます。

<a href="https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336" target="_blank" rel="noopener nofollow">
  <img src="/static/images/color/colorTool.png" alt="公式カラーツール" style="width: 574px" />
</a>

<br />
<br />

The output can be fed into `createTheme()` function:

```js
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
```

### Playground

To test a [material.io/design/color](https://material.io/design/color/) color scheme with the Material-UI documentation, simply select colors using the palette and sliders below. または、プライマリおよびセカンダリテキストフィールドに16進値を入力できます。

{{"demo": "pages/customization/color/ColorTool.js", "hideToolbar": true, "bg": true}}

The output shown in the color sample can be pasted directly into a [`createTheme()`](/customization/theming/#createtheme-options-theme) function (to be used with [`ThemeProvider`](/customization/theming/#theme-provider)):

```jsx
import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});
```

Only the `main` shades need be provided (unless you wish to further customize `light`, `dark` or `contrastText`), as the other colors will be calculated by `createTheme()`, as described in the [Theme customization](/customization/palette/) section.

If you are using the default primary and / or secondary shades then by providing the color object, `createTheme()` will use the appropriate shades from the material color for main, light and dark.

### コミュニティによるツール

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): Is an online tool for creating Material-UI themes via Material Design Color Tool.
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/): A tool to generate themes for your Material-UI applications by just selecting the colors and having a live preview. Includes basic site templates to show various components and how they are affected by the theme
- [マテリアルパレットジェネレータ](https://material.io/inline-tools/color/)　: マテリアルパレットジェネレータを使用して、入力した任意のカラーのパレットを生成できます。

## 2014 Material Design color palettes

These color palettes, originally created by Material Design in 2014, are comprised of colors designed to work together harmoniously, and can be used to develop your brand palette. To generate your own harmonious palettes, use the palette generation tool.

### 重要な用語

- **Palette**: A palette is a collection of colors, i.e. hues and their shades. Material-UIは、Material Designガイドラインのすべてのカラーを提供します。 [このカラーパレット](#color-palette)は、互いに調和する色でデザインされています。 [このカラーパレット](#color-palette)は、互いに調和する色でデザインされています。
- **Hue" & "Shade**: A single color within the palette is made up of a hue such as "red", and shade, such as "500". "red 50" は赤(*pink!*) の最も明るいシェードで、"red 900"は最も暗いシェードです。 また、ほとんどの色相には、先頭に`A`を持つ「アクセント」シェードが使用されます。

### カラー・パレット

HUEが与えられた場合* （赤、ピンクなど）および* SHADE * （500、600など）次のように色をインポートできます。

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideToolbar": true, "bg": "inline"}}

### 例

HUEが与えられた場合* （赤、ピンクなど）および* SHADE * （500、600など）次のように色をインポートできます。

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #f44336
const accent = purple['A200']; // #e040fb
const accent = purple.A200; // #e040fb (alternative method)
```
