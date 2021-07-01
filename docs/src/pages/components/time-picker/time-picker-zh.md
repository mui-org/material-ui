---
title: React Time Picker（时间选择器）组件
components: DesktopTimePicker, MobileTimePicker, StaticTimePicker, TimePicker, ClockPicker
githubLabel: 'component: TimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/time-pickers
---

# Time Picker 时间选择器

<p class="description">时间选择器允许用户选择一个单独的时间。</p>

时间选择器允许用户选择一个单一的时间（格式为：小时：分钟）。 选定的时间由时针末端的填充圆圈表示。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 要求

该组件依赖于你所使用的日期管理库。 它支持 [date-fns](https://date-fns.org/)，[luxon](https://moment.github.io/luxon/)，[dayjs](https://github.com/iamkun/dayjs)，[moment](https://momentjs.com/) 以及其他任何使用公共 `dateAdapter` 接口的库。

请安装这些库中的任何一个，并使用 `LocalizationProvider` 来包裹到你的 root（或者包裹到该选择器你想要应用的最高位置）来设置正确的日期引擎。

```jsx
// 或者使用 @material-ui/lab/Adapter{DayJS,Luxon,Moment} 或者使用任何可适用的 date-io 适配器
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## 基本用法

The date picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop.

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## 静态模式

It's possible to render any time picker inline. 这将启用自定义弹出提示/模态框的容器。

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## 响应式

时间选择器组件是为它运行的设备设计和优化。

- The `MobileTimePicker` component works best for touch devices and small screens.
- The `DesktopTimePicker` component works best for mouse devices and large screens.

By default, the `TimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. 你也可以使用 `desktopModeMediaQuery` 属性来自定义它。

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## Form props 表单的属性

The time picker component can be disabled or read-only.

{{"demo": "pages/components/time-picker/FormPropsTimePickers.js"}}

## Localization 本地化

使用 `LocalizationProvider` 来改变用于渲染时间选择器的数据引擎的本地化。 时间选择器会自动调整为当地时间，即 12 小时或 24 小时格式。 这可以通过 `ampm` 属性来控制。

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## 验证时间

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## 横屏

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## 子组件

Some lower-level sub-components (`ClockPicker`) are also exported. 这些都是在没有包装器或外部逻辑（屏蔽输入、日期值解析和验证等）的情况下渲染的。

{{"demo": "pages/components/time-picker/SubComponentsTimePickers.js"}}

## 秒

秒的输入可以用来选择一个精确的时间点。

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
