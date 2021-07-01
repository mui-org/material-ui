# Color 颜色

<p class="description">颜色承载了不同的寓意。 Out of the box you get access to all colors in the Material Design guidelines.</p>

使用 Material Design 的[颜色系统](https://material.io/design/color/)，您可创建表现独特品牌或风格的颜色主题。

## 选取颜色

### 官方的色彩工具

Material Design 团队也搭建了一个非常棒的调色板配置工具： [material.io/resources/color/](https://material.io/resources/color/)。 您可以用它来为 UI 创建调色板，以及检测任何颜色组合的无障碍水平。

<a href="https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336
" target="_blank" rel="noopener nofollow">
  <img src="/static/images/color/colorTool.png" alt="官方的色彩工具" style="width: 574px" />
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

### 练习

若想用 Material-UI 文档来测试 [material.io/design/color](https://material.io/design/color/) 的配色方案，只需使用下面的调色板和滑块来选取颜色即可。 另外，您也可以在主要（Primary）和次要（Secondary）文本字段中输入十六进制（hex）值。

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

### 社区提供的一些工具

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/)：使用 Material Design 颜色工具来创建 Material-UI 主题的在线工具。
- [mui-theme-creator](https://bareynol.github.io/mui-theme-creator/)：一个帮助设计和定制 Material-UI 组件库主题的工具。 包括基本的网站模板，并且展示各种组件及其受主题影响的方式。
- [Material palette generator](https://material.io/inline-tools/color/)：它可用于通过您输入的任何颜色生成一系列的调色板。

## 2014 Material Design 调色板

这些调色板最初由 Material Design 于 2014 年创建，由一些旨在和谐搭配的颜色组成，您可以用它们来开发品牌调色板。 要生成您专属的颜色协调的调色板，请使用调色板生成工具。

### 一些重要的术语

- **Palette**：调色板是颜色的集合，即色调及其深度。 Material-UI 提供 Material Design 指南中的所有颜色。 设计 [此调色板](#color-palette) 时，我们确保了各个颜色之间的协调呈现。
- **Hue & Shade**：调色板中的单一颜色由色调（如“red”）和深度（如“500”）组成。 "rad 50" 是红色的最浅的阴影（_ 粉红色！ _），而 "red 900" 是最暗的深红色。 除此之外，大多数的色调都带有以 `A` 为前缀的强调（accent）色调。

### 调色板

若给定了一种_色调_（如红色，粉红色等）以及一个_阴影_ （500，600等），你可以这样导入颜色：

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideToolbar": true, "bg": "inline"}}

### 例子

例如：您可以参考互补的主色和重点色，像 "red 500" 和 "purple A200" 这样的：

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #f44336
const accent = purple['A200']; // #e040fb
const accent = purple.A200; // #e040fb（替代方法）
```
