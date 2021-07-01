---
title: React Date Range Picker component
components: DateRangePicker, DateRangePickerDay, DesktopDateRangePicker, MobileDateRangePicker, StaticDateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Range Picker [<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-pro/)

<p class="description">Date pickers let the user select a range of dates.</p>

> ⚠️ Pro component <br /><br /> The date range picker is intended for Material-UI X Pro, a commercial set of advanced components built on top of the community edition (MIT license). <br /><br /> This paid extension will include more advanced components (rich data grid, date range picker, tree view drag & drop, etc.). [Early access](https://material-ui.com/store/items/material-ui-pro/) starts at an affordable price.

The date range pickers let the user select a range of dates.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

This component relies on the date management library of your choice. It supports [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) and any other library via a public `dateAdapter` interface.

Please install any of these libraries and set up the right date engine by wrapping your root (or the highest level you wish the pickers to be available) with `LocalizationProvider`:

```jsx
// or @material-ui/lab/dateAdapter/{dayjs,luxon,moment} or any valid date-io adapter
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
  );
}
```

## Basic usage

Note that you can pass almost any prop from [DatePicker](/api/date-picker/).

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## Static mode

It's possible to render any picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/date-range-picker/StaticDateRangePickerDemo.js", "bg": true}}

## Responsiveness

The date range picker component is designed to be optimized for the device it runs on.

- The `MobileDateRangePicker` component works best for touch devices and small screens.
- The `DesktopDateRangePicker` component works best for mouse devices and large screens.

By default, the `DateRangePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. This can be customized with the `desktopModeMediaQuery` prop. This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Form props

The date range picker component can be disabled or read-only.

{{"demo": "pages/components/date-range-picker/FormPropsDateRangePickers.js"}}

## Different number of months

Note that the `calendars` prop only works in desktop mode.

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## Disabling dates

Disabling dates behaves the same as the simple `DatePicker`.

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## Custom input component

You can customize the rendered input with the `renderInput` prop. For `DateRangePicker` it takes **2** parameters – for start and end input respectively. If you need to render custom inputs make sure to spread `ref` and `inputProps` correctly to the input components.

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## Customized day rendering

The displayed days are customizable with the `renderDay` function prop. You can take advantage of the internal [DateRangePickerDay](/api/date-range-picker-day/) component.

{{"demo": "pages/components/date-range-picker/CustomDateRangePickerDay.js"}}
