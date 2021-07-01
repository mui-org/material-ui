---
components: CssBaseline, ScopedCssBaseline
githubLabel: 'component: CssBaseline'
---

# CSS Baseline 基线

<p class="description">Material-UI 提供了一个 CssBaseline 组件，用于启动一个优雅、一致且简单的基线。</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 全局重置

您可能对 [normailize.css](https://github.com/necolas/normalize.css) 比较熟悉，这是一个 HTML 元素和样式规范化的属性的集合。

```jsx
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/*其他代码 */}
    </React.Fragment>
  );
}
```

## 作用于子组件

然而，您可能会逐步将一个网站迁移到 Material-UI，若选择全局重置，那可能不是一个妥善的选项。 通过使用 `ScopedCsseline` 组件，是有可能将基线只应用于子组件。

```jsx
import * as React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import MyApp from './MyApp';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* 其他代码 */}
      <MyApp />
    </ScopedCssBaseline>
  );
}
```

⚠️ 请确保您移先导入 `ScopedCssBaseline`，以避免像在上面的例子那样出现 box-sizing 的冲突。

## 方法

### 页面

我们更新了 `<html>` 和 `<body>` 元素以提供更好的页面范围的默认值。 具体来说：

- 所有浏览器中的边距将会被删除。
- Material Design 的背景颜色会默认地被应用。 它在标准设备上使用的是 [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) ，而打印设备上使用的是白色背景。

### 布局

- 在 `<html>` 元素里面，我们将 `box-sizing` 全局设置为 `border-box`。 这样一来，包括 `*:: before` 和 `*:: after` 的每个元素，都会被声明来继承这个属性，这样能够确保元素的声明宽度永远不会超过 padding 或者 border。

### 滚动条

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

### 文字铸排

- 在 `<html>` 里面不会声明基础的 font-size，但是我们假设是 16px (浏览器的默认设置)。 您可以在 [主题文档](/customization/typography/#typography-html-font-size) 页面中了解更多有关更改 `<html>` 默认字体大小的影响 。
- 在 `theme.typography.body1` 元素上设置 `<body>` 样式。
- 您可以通过设置 `theme.typography.fontWeightBold` 来设置 `<b>` 和 `<strong>` 元素的 font-weight。
- 启用自定义字体平滑功能可以更好地显示 Roboto 字体。

## Customization 个性化

前往文档中的 [全局自定义](/customization/how-to-customize/#5-global-css-override) 部分来改变这些组件的输出。
