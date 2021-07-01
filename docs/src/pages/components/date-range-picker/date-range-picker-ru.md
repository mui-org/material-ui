---
title: React Date Range Picker component
components: DateRangePicker, DateRangePickerDay, DesktopDateRangePicker, MobileDateRangePicker, StaticDateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Range Picker [<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-pro/) (Выбор диапазона дат)

<p class="description">Date pickers позволяют пользователю выбрать диапазон дат.</p>

> ⚠️ Pro component <br /><br /> The date range picker is intended for Material-UI X Pro, a commercial set of advanced components built on top of the community edition (MIT license). <br /><br /> Это платное расширение будет включать более продвинутые компоненты (rich data grid, date range picker, tree view drag & drop, и т.д.). [Ранний доступ](https://material-ui.com/store/items/material-ui-pro/) начинается по доступной цене.

Выбор диапазона дат (date range pickers) позволяет пользователю выбрать диапазон дат.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

Этот компонент опирается на выбранную Вами библиотеку управления датами. Поддерживает [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) и любую другую библиотеку с помощью публичного `dateAdapter` интерфейса.

Пожалуйста, установите любую из этих библиотек и настройте правильно механизм даты, обернув root (или самый высокий уровень, на котором вы хотели бы иметь доступ к pickers) с `LocalizationProvider`:

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

## Basic Usage (Основное использование)

Обратите внимание, что вы можете передать почти любой prop (свойство) от [DatePicker](/api/date-picker/).

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## Static mode (Статический режим)

It's possible to render any picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/date-range-picker/StaticDateRangePickerDemo.js", "bg": true}}

## Responsiveness

Компонент выбора диапазона дат предназначен для оптимизации устройства на котором он работает.

- The `MobileDateRangePicker` component works best for touch devices and small screens.
- The `DesktopDateRangePicker` component works best for mouse devices and large screens.

By default, the `DateRangePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. Его можно настроить с помощью `DesktopModeMediaQuery`. Его можно настроить с помощью `DesktopModeMediaQuery`.

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Form props

The date range picker component can be disabled or read-only.

{{"demo": "pages/components/date-range-picker/FormPropsDateRangePickers.js"}}

## Different number of months (Разное количество месяцев)

Обратите внимание, что свойства `calender` работает только в режиме desktop.

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## Disabling dates (Отключение дат)

Отключение дат ведет себя так же, как и простой `DatePicker`.

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## Custom input component (Кастомный компонент input)

Вы можете кастомизировать (настроить) рендеринг input с помощью свойства `renderInput`. `DateRangePicker` принимает **2** параметра – для начала и конца ввода соответственно. Если вам нужно отобразить кастомные входные данные, убедитесь, что `ref` и `inputProps` правильно установлены на компоненте input.

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## Customized day rendering (Кастомизированный рендеринг дня)

Отображаемые дни настраиваются с помощью функции-свойства `renderDay`. You can take advantage of the internal [DateRangePickerDay](/api/date-range-picker-day/) component.

{{"demo": "pages/components/date-range-picker/CustomDateRangePickerDay.js"}}
