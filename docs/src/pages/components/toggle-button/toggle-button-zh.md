---
title: React Toggle Button（切换按钮）组件
components: ToggleButton, ToggleButtonGroup
githubLabel: 'component: ToggleButton'
materialDesign: 'https://material.io/components/buttons#toggle-button'
---

# Toggle Button 切换按钮

<p class="description">切换按钮组件可用于对相关选项进行分组。</p>

为了强调组合之间的关联，每一组切换按钮应该共享一个容器。 当给定切换按钮的 `value` 属性时，`ToggleButtonGroup` 就可以控制其子按钮的选择状态（selected state）。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 唯一的选择

在唯一的选择中，选择一个选项就会取消其他的选择状态。

In this example, text justification toggle buttons present options for left, center, right, and fully justified text (disabled), with only one item available for selection at a time.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## 多选

多选允许使用逻辑分组的选项，如粗体、斜体和下划线，这可以选择多个选项。

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## Size 大小

For larger or smaller buttons, use the `size` prop.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Color 颜色

{{"demo": "pages/components/toggle-button/ColorToggleButton.js"}}

## 垂直排列的按钮

当 `orientation` 属性设置为 "vertical" 时，按钮可以变为垂直堆叠。

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## 强制设置值

如果你想要至少一个按钮必须是强制选中状态的，那么你可以调整你的 handleChange 函数。

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## 单独的切换按钮

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## 自定义切换按钮

以下是自定义组件的一个示例。 您可以在 [重写文档页面](/customization/how-to-customize/) 中了解更多有关此内容的信息。

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## 无障碍设计

### ARIA

- ToggleButtonGroup 具有 `role="group"`。 请您提供一个可访问的标签，标签包含 `aria-label="label"`，`aria-labelledby="id"` 或 `<label>`。
- ToggleButton 根据按钮的状态来设置 `aria-pressed="<bool>"`。 您应该用 `aria-label` 标记每个按钮。

### 键盘输入

目前，切换按钮是按 DOM 顺序排列的。 可以用 tab 键在它们之间进行导航切换。 按钮的行为遵循标准键盘语义。
