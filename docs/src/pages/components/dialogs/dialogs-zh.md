---
title: React Dialog（对话框）组件
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
githubLabel: 'component: Dialog'
materialDesign: https://material.io/components/dialogs
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal'
---

# Dialog 对话框

<p class="description">对话框将一个任务告知给用户，它承载了一些需要用户进行确认的关键信息或者多个任务。</p>

对话框是 [modal](/components/modal/) 窗体的一种类型，它通常在应用程序内容之前呈现，来提供一些关键信息，或者要求用户做出决策。 对话框出现的时候会禁用应用程序的所有功能，只有被确认、被取消或已采取其他必要的操作时，对话框会从屏幕中消失。

对话框会带有目的性地打断工作流程，所以请您谨慎使用。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的对话框

简单对话框可以提供有关列表的额外信息与操作。 例如，它们可以显示头像，图标，纯文本或具体动作(例如添加帐户)。

触摸操作机制：

- 选中一个选项则会立刻触发提交选项，并关闭菜单的操作
- 在对话框外点击，或按下“返回”，将会取消操作并关闭对话框。

{{"demo": "pages/components/dialogs/SimpleDialog.js"}}

## 警告框

警告框是一种紧急中断的行为，用以通知用户，并需要确认。

大多数警报不需要标题。 删繁就简，总而言之：

- 问一个问题（例如：“是否删除此对话？”）
- 陈述一个和动作按钮相关的声明

请仅在高风险情况下使用标题栏警报，考虑到可能丢失连接。 用户应该能够单凭标题和按钮文本来理解所有的选项。

如果需要加上标题请:

- 使用明确的问题或声明，并在内容区域对其做出解释，例如：“是否要清除 USB 上的内容？”。
- 避免使用道歉、模棱两可的内容或者问题，例如”警告！ “或者”你确定吗？ “

{{"demo": "pages/components/dialogs/AlertDialog.js"}}

## 过渡动画

当然你也可以换掉过渡效果，下面的示例使用了 ` Slide（幻灯片）`。

{{"demo": "pages/components/dialogs/AlertDialogSlide.js"}}

## 表单对话框

表单对话框允许用户在对话框内填写表单。 比如说，如果您的网站提示潜在订阅者填写他们的电子邮件地址，他们可以填写电子邮件字段然后点击“提交”。

{{"demo": "pages/components/dialogs/FormDialog.js"}}

## 自定义对话框

以下是自定义组件的一个示例。 您可以在 [重写文档页面](/customization/how-to-customize/) 中了解更多有关此内容的信息。

该对话框加上了一个关闭按钮来辅助可用性。

{{"demo": "pages/components/dialogs/CustomizedDialogs.js"}}

## 全屏对话框

{{"demo": "pages/components/dialogs/FullScreenDialog.js"}}

## 大小选择项

您可以使用 `maxWidth`的 enumerable 和 `fullWidth`的 boolean 来设定对话框的最大宽度。 当 `fullWidth` 属性为 true 时，对话框将根据 `maxWidth` 的值进行自我调整。

{{"demo": "pages/components/dialogs/MaxWidthDialog.js"}}

## 响应式全屏

您可以使用[`useMediaQuery`](/components/use-media-query/#usemediaquery)来实现一个全屏显示的对话框。

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return <Dialog fullScreen={fullScreen} />;
}
```

{{"demo": "pages/components/dialogs/ResponsiveDialog.js"}}

## 确认对话框

确认型对话框明确要求用户在提交选项之前确认他们的选择。 举个例子，用户可以听到多种铃声，但是只有在点击 “OK” 按钮后才意味着完成了选择。

在确认对话框中点按“取消”或“返回（Back）”键，可取消操作，放弃任何更改，并关闭对话框。

{{"demo": "pages/components/dialogs/ConfirmationDialog.js"}}

## 可拖动的对话框

您可以通过 [react-draggable](https://github.com/mzabriskie/react-draggable) 来创建一个可拖动的对话框。 为此，您可以将需要导入的 `Draggable` 组件作为 `Dialog` 组件的 `PaperComponent` 来传入。 这样一来，您就可以拖动整个对话框。

{{"demo": "pages/components/dialogs/DraggableDialog.js"}}

## 长内容滚动

当对话框相对于用户的视口或设备来说太长时，它们就可以滚动。

- 使用 `scroll=paper`，对话框的内容能在 paper 元素中滚动。
- 使用 `scroll=body`，对话框的内容能在 body 元素中滚动。

请看一下下面的例子，这会帮助您加深理解：

{{"demo": "pages/components/dialogs/ScrollDialog.js"}}

## 性能

参考[对话框性能部分](/components/modal/#performance)。

## 设计局限

参考[对话框性能部分](/components/modal/#limitations)。

## 无障碍设计

参考[模态框无障碍设计部分](/components/modal/#accessibility)。
