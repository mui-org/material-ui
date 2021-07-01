# Spacing 间距

<p class="description">A wide range of shorthand responsive margin and padding utility classes to modify an element's appearance.</p>

## 符号

用 space 辅助工具能够将简写的 margin 和 padding 属性转换为margin 和 padding 的 CSS 声明。 而属性则使用 `{property}{sides}` 的格式命名。

其中_属性_是其中之一：

- `m` - 对于设置*margin*
- `p` - 对于设置*padding*

哪边*边*是其中之一：

- `t` - 对于设置* margin-top*或*padding-top*的类
- `b` - 对于设置*margin-bottom的类*或*padding-bottom*的类
- `l` - 对于设置*margin-left*或*padding-left*的类
- `r` - 对于设置*margin-right*或*padding-right*的类
- `x` - 对于设置** -left*和** -right*的类
- `y` - 对于设置** -top*和** -bottom*的类
- blank - 能够设置元素的所有 4 个边的 margin 或者 padding 的类名

## 转换

根据输入和主题配置，您可以应用以下的转换：

- 输入：`数字` & 主题：`数字` ：该属性乘以主题值。

```jsx
const theme = {
  spacing: 8,
}

<Box sx={{ m: -2 }} /> // margin: -16px;
<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 0.5 }} /> // margin: 4px;
<Box sx={{ m: 2 }} /> // margin: 16px;
```

- 输入：`数字` & 主题：`数组` ：属性值用作数组索引。

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box sx={{ m: -2 }} /> // margin: -3px;
<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 2 }} /> // margin: 3px;
```

- 输入：`数字` & 主题：`功能` ：使用属性值调用该函数。

```jsx
const theme = {
  spacing: value => value * 2,
}

<Box sx={{ m: 0 }} /> // margin: 0px;
<Box sx={{ m: 2 }} /> // margin: 4px;
```

- input: `string`: 该属性作为原始CSS值传递。

```jsx
<Box sx={{ m: "2rem" }} /> // margin: 2rem;
<Box sx={{ mx: "auto" }} /> // margin-left: auto; margin-right: auto;
```

## 示例

{{"demo": "pages/system/spacing/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ p: 1 }}>…
<Box sx={{ m: 1 }}>…
<Box sx={{ p: 2 }}>…
```

## 水平居中

The CSS flex and grid display properties are often used to align elements at the center. However, you can also use `margin-left: auto;`, `margin-right: auto;`, and a width for horizontally centering:

{{"demo": "pages/system/spacing/HorizontalCentering.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ mx: "auto", width: 200 }}>…
<Box border={0}>…
<Box sx={{ borderTop: 1 }}>…
<Box borderRight={0}>…
<Box borderBottom={0}>…
<Box borderLeft={0}>…
<Box sx={{ borderRight: 1 }}>…
<Box sx={{ borderBottom: 1 }}>…
<Box sx={{ borderLeft: 1 }}>…
```

## API

```js
import { spacing } from '@material-ui/system';
```

| 导入名称      | 属性   | CSS 属性                          | Theme key                                                        |
|:--------- |:---- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing` | `m`  | `margin`                        | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `mt` | `margin-top`                    | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `mr` | `margin-right`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `mb` | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `ml` | `margin-left`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `mx` | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `my` | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `p`  | `padding`                       | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `pt` | `padding-top`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `pr` | `padding-right`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `pb` | `padding-bottom`                | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `pl` | `padding-left`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `px` | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `py` | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |

_有些人觉得属性简写让人困惑，如果你愿意的话，您也可以使用完整版：_

```diff
-<Box sx={{ pt: 2 }} />
+<Box sx={{ paddingTop: 2 }} />
```

```diff
-<Box sx={{ px: 2 }} />
+<Box sx={{ paddingX: 2 }} />
```
