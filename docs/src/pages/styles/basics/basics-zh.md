# @material-ui/styles

<p class="description">无论您是否使用了 Material-UI 组件，都可以在应用中使用 Material-UI 的样式方案。</p>

Material-UI 旨在为构建动态的 UI 提供扎实的基础。 为了构造更加清晰的结构，**我们单独发布了 Material-UI 组件中使用的样式方案**，它将作为一个 `@material-ui/styles` 的依赖包存在。 @material-ui/styles 并不是你唯一的选择，Material-UI 也可以与其他主流样式方案[彼此协作](/guides/interoperability/)。

## 为什么要使用 Material-UI 的样式方案呢？

在以前的版本中，Material-UI 曾使用过 LESS，以及而后的自定义内嵌式样式表来编写组件的样式，但是这些方法都有其局限性。 [_CSS-in-JS_ 方案](https://github.com/oliviertassinari/a-journey-toward-better-style) 突破了这些限制，并**提供了很多强大的功能**（主题嵌套、动态样式、自我支持等等）。

Material-UI 的样式方案来自于许多其他 CSS-in-JS 库的启发，例如 [styled-components](https://www.styled-components.com/) 和 [emotion](https://emotion.sh/)。

- 💅你可以期待和 styled-components [一样的优势](https://www.styled-components.com/docs/basics#motivation)。

<!-- #default-branch-switch -->

- 🚀它的运行速度 [非常快](https://github.com/mui-org/material-ui/blob/HEAD/benchmark/server#material-uistyles)。
- 🧩你可以通过一个 [插件](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API 来扩展。
- ⚡️它使用 [JSS](https://github.com/cssinjs/jss) 为其核心 —— 一个 [高性能的](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript 到 CSS 的编译器，它在运行时和服务器端编译。
- 📦低于[15KB压缩](https://bundlephobia.com/result?p=@material-ui/styles)；若和 Material-UI 一起使用，将不会有捆绑的尺寸增加。

## 安装

> 我们将 `@material-ui/styles` 导出为 `@material-ui/core/styles` ——若你想和 Material-UI 分开使用，只需单独安装它。

若想安装并写入您的 `package.json` 依赖包，请运行以下命令：

```sh
// 用 npm 安装
npm install @material-ui/styles

// 用 yarn 安装
yarn add @material-ui/styles
```

## 快速开始

有3种可能的 API 来生成并应用样式，但是它们都有着相同的底层逻辑。

### Hook API

```jsx
import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

{{"demo": "pages/styles/basics/Hook.js"}}

### Styled components API

注意：在只是用调用语法—— 您仍需使用一个 JSS 对象来定义你的样式。 你可以[改变这样的行为](/styles/advanced/#string-templates)，但还是存在一些限制。

```jsx
import * as React from 'react';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

{{"demo": "pages/styles/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
```

{{"demo": "pages/styles/basics/HigherOrderComponent.js"}}

## 嵌套选择器

您可以在当前的 class 或组件内的一个目标元素里嵌套样式选择器。 以下示例使用 Hook API，但和其他 API 大同小异。

```js
const useStyles = makeStyles({
  root: {
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue',
      },
    },
  },
});
```

{{"demo": "pages/styles/basics/NestedStylesHook.js", "defaultCodeOpen": false}}

## 根据属性来调节

您可以将一个函数传递给`makeStyles` (“插值”)，这样一来根据组件的属性可以变换生成的样式的值。 此函数可以运用于样式规范的级别，也可以安置于 CSS 属性级别：

```jsx
const useStyles = makeStyles({
  // 样式规则
  foo: (props) => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS property
    color: (props) => props.color,
  },
});

function MyComponent() {
  // 为了这个示例，我们模拟了一些属性
  const props = {
    backgroundColor: 'black',
    color: 'white',
  };
  // 将 props 作为 useStyles() 的第一个参数传入
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />;
}
```

此按钮组件有一个颜色属性，通过它可以改变颜色：

### 采用 hook API

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### 采用 styled components API

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### 采用 higher-order component API

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

### 压力测试

在以下压力测试中，您可以实时更新*主题颜色*和 *background-color 属性*：

```js
const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## Using the theme context

Starting from v5, Material-UI no longer uses JSS as its default styling solution. If you still want to use the utilities exported by `@material-ui/styles`, you will need to provide the `theme` as part of the context. For this, you can use the `ThemeProvider` component available in `@material-ui/styles`, or, if you are already using `@material-ui/core`, you should use the one exported from `@material-ui/core/styles` so that the same `theme` is available for components from '@material-ui/core'.

```jsx
import { makeStyles } from '@material-ui/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  }
}));

const App = (props) => {
  const classes = useStyles();
  return <ThemeProvider theme={theme}><div {...props} className={classes.root}></ThemeProvider>;
}
```
