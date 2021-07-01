---
title: React Date Range Picker（日期范围选择器）组件
components: DateRangePicker, DateRangePickerDay, DesktopDateRangePicker, MobileDateRangePicker, StaticDateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Range Picker [<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-pro/) 日期范围选择器

<p class="description">日期选择器让用户选择一系列的日期。</p>

> ⚠️ Pro component <br /><br /> The date range picker is intended for Material-UI X Pro, a commercial set of advanced components built on top of the community edition (MIT license). <br /><br /> 该付费扩展将包括更高级的组件（大数据栅格，时间范围选择器，可拖动的树形视图 & 拖放组件等等）。 你现在可以以实惠的价格 [提前使用](https://material-ui.com/store/items/material-ui-pro/)。

日期范围选择器让用户选择一个日期范围。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 要求

该组件依赖于你所使用的日期管理库。 它支持 [date-fns](https://date-fns.org/)，[luxon](https://moment.github.io/luxon/)，[dayjs](https://github.com/iamkun/dayjs)，[moment](https://momentjs.com/) 以及其他任何使用公共 `dateAdapter` 接口的库。

请安装这些库中的任何一个，并使用 `LocalizationProvider` 来包裹到你的 root（或者包裹到该选择器你想要应用的最高位置）来设置正确的日期引擎。

```jsx
// 或者使用 @material-ui/lab/Adapter{dayjs,luxon,moment} 或者使用任何可适用的 date-io 适配器
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
  );
}
```

## 基本用法

请注意，你可以从 [DatePicker](/api/date-picker/) 中传递几乎任何的属性。

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## 静态模式

可以将任何选择器内嵌渲染。 这将启用自定义弹出提示/模态框的容器。

{{"demo": "pages/components/date-range-picker/StaticDateRangePickerDemo.js", "bg": true}}

## 响应式

日期范围选择器组件是针对运行它的设备进行设计并优化的。

- The `MobileDateRangePicker` component works best for touch devices and small screens.
- The `DesktopDateRangePicker` component works best for mouse devices and large screens.

By default, the `DateRangePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. 你也可以使用 `desktopModeMediaQuery` 属性来自定义它。 你也可以使用 `desktopModeMediaQuery` 属性来自定义它。

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Form props 表单的属性

The date range picker component can be disabled or read-only.

{{"demo": "pages/components/date-range-picker/FormPropsDateRangePickers.js"}}

## 不同的月数

请注意，`calendars` 属性仅运行在桌面端。

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## 禁用日期

禁用日期的行为与 `DatePicker` 相同。

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## 自定义输入组件

你可以使用 `renderInput` 属性来渲染自定义的输入。 对于 `DateRangePicker`，它需要**两个**参数 – 分别是开始和结束输入。 如果你需要渲染自定义的输入，请确保将 `ref` 和 `inputProps` 都正确地传入到输入组件中。

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## 自定义日期渲染

你可以通过 `renderDay` 函数属性来自定义所显示的日期。 You can take advantage of the internal [DateRangePickerDay](/api/date-range-picker-day/) component.

{{"demo": "pages/components/date-range-picker/CustomDateRangePickerDay.js"}}
