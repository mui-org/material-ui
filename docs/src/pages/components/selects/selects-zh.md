---
title: React Select（选择器）组件
components: Select, NativeSelect
githubLabel: 'component: Select'
---

# Select 选择属性

<p class="description">选择器组件能从一个选项列表中去获得用户所提供的信息。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础的选择器

我们通常将菜单（Menus）放置在其所点击的元素上，这样的话能够确保当前选定的菜单项显示在点击的元素之上。

{{"demo": "pages/components/selects/BasicSelect.js"}}

## 高级功能

Select 组件的设计原理是和一个原生的 `<select>` 元素能够互相替代。

若您需要一个更优雅的功能，譬如 combobox，multiselect，autocomplete，async 或者 creatable support，请查看 [`Autocomplete` 组件](/components/autocomplete/)。 此组件旨在改进 “react-select” 和 “downshift” 这两个包。

## 属性

选择器组件是通过自定义 [InputBase](/api/input-base/) 的 `<input>` 元素来实现的。 It extends the [text field components](/components/text-fields) sub-components, either the [OutlinedInput](/api/outlined-input/), [Input](/api/input/), or [FilledInput](/api/filled-input/), depending on the variant selected. 它有着相同的样式和许多相同的属性。 详情请参阅相应组件的 API 文档。

### Filled and standard variants

{{"demo": "pages/components/selects/SelectVariants.js"}}

### 标签和助手文本

{{"demo": "pages/components/selects/SelectLabels.js"}}

### 自动宽度

{{"demo": "pages/components/selects/SelectAutoWidth.js"}}

### 其他属性

{{"demo": "pages/components/selects/SelectOtherProps.js"}}

## 原生选择器

为了提高用户体验，对于在移动设备上使用平台的原生选择器这样的模式，我们是支持的。

{{"demo": "pages/components/selects/NativeSelect.js"}}

## TextField

`TextField` wrapper 组件是一个完整的表单控件，它包括了标签，输入和帮助文本。 您可以在 [在此章节中](/components/text-fields/#select) 查看使用 select 模式的示例。

## 自定义选择器

你可以参考以下一些例子来自定义组件。 您可以在 [重写文档页面](/customization/how-to-customize/) 中了解更多有关此内容的信息。

首先，需要设置 `InputBase` 组件的样式。 一旦设置好了样式，您就可以直接将其用作文本字段，也可以将其作为一个 `select` 字段提供给 select 组件的 `input` 属性。 Notice that the `"standard"` variant is easier to customize, since it does not wrap the contents in a `fieldset`/`legend` markup.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

🎨 如果您还在寻找灵感，您可以看看 [MUI Treasury 特别定制的一些例子](https://mui-treasury.com/styles/select)。

## 多重选择

`Select` 组件也支持多项选择。 `Select` 组件也支持多项选择。

与单项选择一样，您可以通过访问 `onChange` 的回调函数中的 `event.target.value ` 来提取新的值。 它总是以一个数组的形式出现。

### 默认值

{{"demo": "pages/components/selects/MultipleSelect.js"}}

### 选中标记

{{"demo": "pages/components/selects/MultipleSelectCheckmarks.js"}}

### Chip

{{"demo": "pages/components/selects/MultipleSelectChip.js"}}

### 占位符

{{"demo": "pages/components/selects/MultipleSelectPlaceholder.js"}}

### 原生（Native）

{{"demo": "pages/components/selects/MultipleSelectNative.js"}}

## 可被控制的打开选择框

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## 与对话框组件（Dialog）一起使用

While it's discouraged by the Material Design guidelines, you can use a select inside a dialog.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## 联动

可以和 `ListSubheader` 组件一起罗列分类，或者和原生的 `<optgroup>` 元素一起使用。

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## 无障碍设计

若想正确的给 `Select` 加上标签，你的 input 控件需要一个额外的带有 label 的 `id` 属性。 `id` 的内容需要和 `Select` 的 `labelId` 值相同，例如：

```jsx
<InputLabel id="label">年龄</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">10</MenuItem>
  <MenuItem value="20">20</MenuItem>
</Select>
```

或者，您也可以使用一个带有 `id` 和 `label` 的 `TextField` 组件来创建合适的标记和 id：

```jsx
<TextField id="select" label="Age" value="20" select>
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```

对于一个 [原生选择器](#native-select)，你应该通过将选择元素的 `id` 属性的值赋给 `InputLabel` 的 `htmlFor` 属性来提及标签。

```jsx
<InputLabel htmlFor="select">Age</InputLabel>
<NativeSelect id="select">
  <option value="10">Ten</option>
  <option value="20">Twenty</option>
</NativeSelect>
```
