# 从 v0.x 版本迁移到 v1 版本

<p class="description">是的，v1 版本已经发布了！ 我们用了两年的努力达到了这个里程碑。</p>

## 常问问题

### 哇—— API 看起来完全不一样！ Does that mean 1.0 is completely different, I'll have to learn the basics all over again, and migrating will be practically impossible?

I'm glad you asked! 答案是不。 答案是不。 The core concepts haven't changed. 您会注意到 API 提供了更多的灵活性，但这有一定的成本——一些更低级别的组件提取了较低的复杂性。

### 到底是什么带来了如此巨大的改变呢？

Material-UI 这个项目是从[4年前](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46)开始的。 在此期间，整个个生态系统发展了很多，我们也学到了很多东西。 [@nathanmarks](https://github.com/nathanmarks/) 启动了一项雄心勃勃的任务，将 Material-UI **重新启动**，并利用我们学到的知识，来解决一些长期存在的问题。 譬如这些主要的变化：

- New styling solution using CSS-in-JS (better [customization](/customization/how-to-customize/) power, better performance)
- 新的主题处理 （有嵌套，自主支撑等。）
- 感谢 [Next.js](https://github.com/zeit/next.js) 超快地创建文档
- 更容易检测 [测试覆盖率](/guides/testing/) （99％以上，在所有主流浏览器上运行， [视觉回归测试](https://www.argos-ci.com/mui-org/material-ui)）
- 完全的 [服务器端渲染](/guides/server-rendering/) 支持
- 大范围地 [支持的浏览器](/getting-started/supported-platforms/)

### 我应该从哪里开始迁移？

1. 首先，和 v0.x 版本一起，安装 v1.x 版本的 Material-UI。

用 yarn：

```sh
yarn add material-ui
```
```sh
yarn add @material-ui/core
```

或者用 npm：

```sh
npm install material-ui
```
```sh
npm install @material-ui/core
```

然后

```js
import FlatButton from 'material-ui/FlatButton'; // v0.x
  import Button from '@material-ui/core/Button'; // v1.x
```

2. 未来，我们打算提供一个简单的组件来解决这个用例：[#9997](https://github.com/mui-org/material-ui/issues/9997)。
3. `MuiThemeProvider` 对于v1.x.版本是可选的，但如果您有自定义主题，则可以同时使用该组件的v0.x和v1.x版本，如下所示：

```jsx
import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = createMuiTheme({
  /* v1.x 版本的主题 */
});
const themeV0 = getMuiTheme({
  /* v0.x 版本的主题 */
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <V0MuiThemeProvider muiTheme={themeV0}>{/*Components*/}</V0MuiThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
```

4. 之后，您可以自由地一次迁移一个组件实例。

## Components 组件

### Autocomplete 自动补全组件

Material-UI 不提供用于解决此问题的高级 API。 Material-UI doesn't provide a high-level API for solving this problem. You're encouraged you to explore [the solutions the React community has built](/components/autocomplete/).

在你的项目上运行 [迁移助手](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod)

### Svg 图标

未来，我们打算提供一个简单的组件来解决这个用例：[#9997](https://github.com/mui-org/material-ui/issues/9997)。

这将应用如下更改：

```diff
-import AddIcon from 'material-ui/svg-icons/Add';
+import AddIcon from '@material-ui/icons/Add';

<AddIcon />
```

### Flat Button（扁平按钮）

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from '@material-ui/core/Button';

-<FlatButton />
+<Button />
```

### Raised Button（凸起的按钮）

凸起按钮的升级的路径：

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from '@material-ui/core/Button';

-<RaisedButton />
+<Button variant="contained" />
```

### Subheader（副标题)

```diff
-import Subheader from 'material-ui/Subheader';
+import ListSubheader from '@material-ui/core/ListSubheader';

-<Subheader>副标题</Subheader>
+<ListSubheader>副标题</ListSubheader>
```

### Toggle（切换）

```diff
-import Toggle from 'material-ui/Toggle';
+import Switch from '@material-ui/core/Switch';

-<Toggle
-  toggled={this.state.checkedA}
-  onToggle={this.handleToggle}
-/>
+<Switch
+  checked={this.state.checkedA}
+  onChange={this.handleSwitch}
+/>
```

### Menu Item（菜单项）

```diff
-import MenuItem from 'material-ui/MenuItem';
+import MenuItem from '@material-ui/core/MenuItem';

-<MenuItem primaryText="Profile" />
+<MenuItem>个人资料</MenuItem>
```

### Font Icon（字体图标）

```diff
-import FontIcon from 'material-ui/FontIcon';
+import Icon from '@material-ui/core/Icon';

-<FontIcon>home</FontIcon>
+<Icon>home</Icon>
```

### Circular Progress（环状进度条）

```diff
-import CircularProgress from 'material-ui/CircularProgress';
+import CircularProgress from '@material-ui/core/CircularProgress';

-<CircularProgress mode="indeterminate" />
+<CircularProgress variant="indeterminate" />
```

### Drop Down Menu（下拉式菜单）

```diff
-import DropDownMenu from 'material-ui/DropDownMenu';
+import Select from '@material-ui/core/Select';

-<DropDownMenu></DropDownMenu>
+<Select value={this.state.value}></Select>
```

### 未完待续...

您是否已成功迁移您的应用，并助社区一臂之力？ 要完成本迁移指南 [#7195](https://github.com/mui-org/material-ui/issues/7195)，还存在一个未决问题。 我们欢迎任何 pull request。
