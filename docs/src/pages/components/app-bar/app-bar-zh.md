---
title: React App Bar（应用栏）组件
components: AppBar, Toolbar, Menu
githubLabel: 'component: AppBar'
materialDesign: https://material.io/components/app-bars-top
---

# App Bar 应用栏

<p class="description">应用栏组件展示了与当前屏幕息息相关的信息和操作。</p>

而顶部应用栏（App Bar）则提供与当前屏幕相关的内容和操作。 该组件常用于展示品牌、展示标题、提供导航和一些可操作的内容。

它既可以用作于转换为上下文相关的操作栏，又可以直接充当导航栏。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的应用栏

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## 带一个主搜索输入框的应用栏

一个主要搜索栏。

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## 带有菜单的应用栏

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## 带有搜索输入框的应用栏

一个侧边搜索栏。

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## 紧凑模式 (仅限桌面模式)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## 突出模式

一个突出的应用栏。

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## 底部应用栏

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## 固定的位置

当渲染一个固定位置的应用栏时，元素的尺寸不会影响页面的其余内容。 这可能导致部分内容会被挡在应用程序栏后面，而无法可见。 下面是3种可能的解决方案：

1. 使用 `position =“ sticky”` 代替 fixed。 ⚠️ sticky 不支持 IE11。
2. 可以渲染第二个 `<Toolbar />` 组件：

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

3. 也可以用 `theme.mixins.toolbar` 的 CSS：

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

## Scrolling 滚动

您可以使用 `useScrollTrigger()` 这个 hook 来相应用户触发的滚动操作。

### 隐藏应用栏

向下滚动会隐藏应用栏，这样一来会留有更多的空间进行阅读。

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### 变高的应用栏

应用栏会在滚动时提升，以表明用户还未到页面的顶部。

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### 回到顶部

在滚动的时候，会出现一个浮动操作按钮，这样以便于返回页面的顶部。

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### 参数

1. `options` (_object_ [optional]):

   - `options.disableHysteresis` (_bool_ [optional]): Defaults to `false`. 禁用迟滞的效果。 在决定 `trigger` 的值时会忽略在滚动的方向。
   - `options.target` (_Node_ [optional])：默认值是 `window`。
   - `options.threshold` (_number_ [optional])：默认值是 `100`。 严格来说，当垂直滚动超过（但不包括）此阈值时，请更改 `trigger` 的值。

#### 返回结果

`trigger`: 此滚动的位置符合要求吗？

#### 例子

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>你好</div>
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
