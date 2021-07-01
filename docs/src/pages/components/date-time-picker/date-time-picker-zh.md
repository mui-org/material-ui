---
title: React Date Time Picker（日期时间选择器） 组件
components: DateTimePicker,DesktopDateTimePicker,MobileDateTimePicker,StaticDateTimePicker
githubLabel: 'component: DateTimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Time Picker 日期时间选择器

<p class="description">合并日期和时间选择。</p>

该组件合并了日期与时间选择器。 它允许用户在一套控制逻辑下同时选择日期和时间。

请注意，该组件是 [DatePicker](/components/date-picker/) 和 [TimePicker](/components/time-picker/) 的复合组件，所以这两个组件的所有属性都可以传递到日期时间选择器内。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 要求

该组件依赖于你所使用的日期管理库。 它支持 [date-fns](https://date-fns.org/)，[luxon](https://moment.github.io/luxon/)，[dayjs](https://github.com/iamkun/dayjs)，[moment](https://momentjs.com/) 以及其他任何使用公共 `dateAdapter` 接口的库。

请安装这些库中的任何一个，并使用 `LocalizationProvider` 来包裹到你的 root（或者包裹到该选择器你想要应用的最高位置）来设置正确的日期引擎。

```jsx
// 或者使用 @material-ui/lab/Adapter{Dayjs,Luxon,Moment} 或者任何可适用的 date-io 适配器
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## 基本用法

需要先选择日期在选择时间。 有 4 个步骤可供选择（年、日期、小时和分钟），所以需要用标签来直观地区分日期/时间步骤。

{{"demo": "pages/components/date-time-picker/BasicDateTimePicker.js"}}

## 响应式

`DateTimePicker组件` 会根据运行时的设备进行优化。

- The `MobileDateTimePicker` component works best for touch devices and small screens.
- The `DesktopDateTimePicker` component works best for mouse devices and large screens.

By default, the `DateTimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. 你也可以使用 `desktopModeMediaQuery` 属性来自定义它。

{{"demo": "pages/components/date-time-picker/ResponsiveDateTimePickers.js"}}

## Form props 表单的属性

The date time picker component can be disabled or read-only.

{{"demo": "pages/components/date-time-picker/FormPropsDateTimePickers.js"}}

## 对日期和时间进行验证

可以通过以下两种方式限制日期和时间的选择：

- 通过使用 `minDateTime`/`maxDateTime` 可以将时间选择限制在某一特定时刻之前或之后。
- 使用 `minTime`/`maxTime`，你可以分别在每天的某个时间之前或之后禁止选择时间。

{{"demo": "pages/components/date-time-picker/DateTimeValidation.js"}}

## 静态模式

It's possible to render any date & time picker inline. 这将启用自定义弹出提示/模态框的容器。

{{"demo": "pages/components/date-time-picker/StaticDateTimePickerDemo.js", "bg": true}}

## Customization 个性化

以下是一些高度定制的日期 & 时间选择器的例子：

{{"demo": "pages/components/date-time-picker/CustomDateTimePicker.js"}}
