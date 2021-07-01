# 从右到左读取

<p class="description">支持从右到左的语言，如阿拉伯语（Arabic）、波斯语（Persian ）或希伯来语（Hebrew ）。 要更改 Material-UI 组件的读取方向，您必须执行以下步骤。</p>

## 步骤

### 1. HTML

确保在 body 上设置了 `dir` 属性，否则本机组件将中断：

```html
<body dir="rtl">
```

As an alternative to the above, you can also wrap your application in an element with the `dir` attribute:

```jsx
function App() {
  return (
    <div dir="rtl">
      <MyComponent />
    </div>
  );
}
```

This can be helpful for creating components to toggle language settings in the live application.

### 2. 主题

在您自定义的主题中设置方向：

```js
const theme = createTheme({
  direction: 'rtl',
});
```

### 3。 安装 rtl 插件

你需要这个 JSS 插件来翻转样式： [jss-rtl](https://github.com/alitaheri/jss-rtl)。

```sh
npm install jss-rtl
```

如果你正在使用 `emotion` 或者 `styled-components`，你需要使用该插件来翻转样式： [stylis-plugin-rtl](https://github.com/styled-components/stylis-plugin-rtl)。

```sh
npm install stylis-plugin-rtl
```

**Note**: Only `emotion` is compatible with version 2 of the plugin. `styled-components` requires version 1. If you are using `styled-components` as styled engine, make sure to install the correct version. `styled-components` requires version 1. If you are using `styled-components` as styled engine, make sure to install the correct version.

在你的项目中安装了该插件后，Material-UI 组件仍然需要通过你使用的样式引擎实例来加载它。 下面的指南讲述了如何进行加载。

### 3。 加载 rtl 插件

#### 3.1 JSS

如下所述，在项目中安装了插件后，Material-UI 组件仍然需要通过 jss 实例来加载。 在内部，若 `direction: 'rtl'` 上在主题设置了，withStyles 则会使用该 JSS 插件 。 请前往 [此插件的 README](https://github.com/alitaheri/jss-rtl) 来了解更多信息。

一旦您通过插件创建了一个新的 JSS 实例，您需要提给组件树中的所有组件。 我们有一个 [`StylesProvider`](/styles/api/#stylesprovider) 组件来服务这个需求：

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
```

#### 3.2 emotion

如果你的样式引擎的是 emotion，那么你应该创建并使用  `stylis-plugin-rtl` 的新缓存实例，并将其提供在你应用程序树的顶部。 [CacheProvider](https://emotion.sh/docs/cache-provider) 组件实现了这一点：

```jsx
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// 创建 rtl 缓存
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
```

#### 3.3 styled-components

如果你的样式引擎是 `styled-components`，那么你可以使用 [StyleSheetManager](https://styled-components.com/docs/api#stylesheetmanager)，并在 `stylisPlugins` 属性中将 stylis-plugin-rtl 作为项目（item）提供。

```jsx
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';

function RTL(props) {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      {props.children}
    </StyleSheetManager>
  );
}
```

## 演示

_请使用右上角的方向切换按钮来翻转整个文档。_

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## 选择退出 rtl 转换

### JSS

若您想避免一个特殊的特定规则受到 `rtl` 转换的影响，您可以在最开始时加上 `flip: false`。

_请使用右上角的方向切换按钮来查看效果。_

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}

### emotion & styled-components

你必须使用模板文字语法，并在你要禁用从右到左（right-to-left）样式的规则或属性前添加 `/* @noflip */` 指令。

_请使用右上角的方向切换按钮来查看效果。_

{{"demo": "pages/guides/right-to-left/RtlOptOutStylis.js", "hideEditButton": true}}
