---
title: React Box（分组）组件
githubLabel: 'component: Box'
---

# Box 分组

<p class="description">对于大多数 CSS 实用程序来说，Box 组件能够作为一个包装组件来使用。</p>

在`@material-ui/system`中，您可以找到所述 Box 组件包的 [所有的样式功能](/system/basics/#all-inclusive)。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 示例

查看[调色板](/system/palette/)样式功能。

## `sx` 属性

All system properties are available via the [`sx` prop](/system/basics/#the-sx-prop). In addition, the `sx` prop allows you to specify any other CSS rules you may need. 下面是一个如何使用的示例：

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## 覆盖 Material-UI 组件

Box 组件能够封装您的组件。 它创建了一个新的 DOM 元素，默认情况下为 `<div>`，并可以通过 `组件` 的属性进行更改。 假设反之你想使用一个 `<span>`：

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

当所需的更改与新的 DOM 元素分开时比较有效。 例如，您可以使用这个方法来更改边距。

但是，有时您必须针对到底层的 DOM 元素。 As an example, you may want to change the border of the Button. 但是按钮组件已经定义自己的样式。 所以使用 CSS 继承是于事无补的。 To workaround the problem, you can use the [`sx`](/system/basics/#the-sx-prop) prop directly on the child if it is a Material-UI component.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <Button>Save</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Save</Button>
```

For non-Material-UI components, use the `component` prop.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  <button>Save</button>
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
```

## API

```jsx
import Box from '@material-ui/core/Box';
```

| 名称                                       | 类型                                                                                                                            | 默认值                                     | 描述                                         |
|:---------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:------------------------------------------ |
| <span class="prop-name">children</span>  | <span class="prop-type">node<br></span>                                                                                 |                                         | Box 渲染函数或者返回节点。                            |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | component 用于根节点。 可以是一个使用 DOM 元素或者一个组件的字符串。 |
| <span class="prop-name">sx</span>        | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | 接受所有系统属性，以及任何有效的 CSS 属性。                   |

## System props

As a CSS utility component, the `Box` also supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Box mt={2}>
```
