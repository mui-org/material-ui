---
title: React Date Picker component
components: CalendarPicker, CalendarPickerSkeleton, DatePicker, DesktopDatePicker, MobileDatePicker, MonthPicker, PickersDay, StaticDatePicker, YearPicker
githubLabel: 'component: DatePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Picker

<p class="description">Date pickers позволяют пользователю выбирать дату.</p>

Date pickers позволяют пользователю выбирать дату. Date pickers отображаются с:

- Dialogs on mobile
- Text field dropdowns on desktop

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

Этот компонент опирается на выбранную Вами библиотеку управления датами. Поддерживает [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) и любую другую библиотеку с помощью публичного `dateAdapter` интерфейса.

Пожалуйста, установите любую из этих библиотек и настройте правильно механизм даты, обернув root (или самый высокий уровень, на котором вы хотели бы иметь доступ к pickers) с `LocalizationProvider`:

```jsx
// or @material-ui/lab/Adapter{DayJS,Luxon,Moment} or any valid date-io adapter
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Basic Usage (Основное использование)

The date picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop.

{{"demo": "pages/components/date-picker/BasicDatePicker.js"}}

## Static mode (Статический режим)

It's possible to render any date picker without the modal/popover and text field. Это может быть полезно при создании пользовательских popover/modal контейнеров.

{{"demo": "pages/components/date-picker/StaticDatePickerDemo.js", "bg": true}}

## Responsiveness

Компонент выбора даты разработан и оптимизирован под устройство, на котором он работает.

- The `MobileDatePicker` component works best for touch devices and small screens.
- The `DesktopDatePicker` component works best for mouse devices and large screens.

By default, the `DatePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. Его можно настроить с помощью `DesktopModeMediaQuery`.

{{"demo": "pages/components/date-picker/ResponsiveDatePickers.js"}}

## Form props

The date picker component can be disabled or read-only.

{{"demo": "pages/components/date-picker/FormPropsDatePickers.js"}}

## Локализация

Используйте `LocalizationProvider` для изменения локали движка дат, используемой для рендеринга date picker. Вот пример изменения локали для адаптера `date-fns`:

{{"demo": "pages/components/date-picker/LocalizedDatePicker.js"}}

## Jalali calendar system

Install `date-fns-jalali` and use `@date-io/date-fns-jalali` adapter to support [Jalali calendar](https://en.wikipedia.org/wiki/Jalali_calendar).

{{"demo": "pages/components/date-picker/JalaliDatePicker.js"}}

## Views playground

Можно комбинировать вид выбора `year`, `month`, и `date` . Этот вид будет отображаться в том порядке, в котором они указаны в массиве `views`.

{{"demo": "pages/components/date-picker/ViewsDatePicker.js"}}

## Landscape orientation (Альбомная ориентация)

For ease of use, the date picker will automatically change the layout between portrait and landscape by subscription to the `window.orientation` change. Вы можете принудительно установить определенный вид с помощью свойства `orientation`.

{{"demo": "pages/components/date-picker/StaticDatePickerLandscape.js", "bg": true}}

## Sub-components (Подкомпоненты)

Some lower-level sub-components (`CalendarPicker`, `MonthPicker`, and `YearPicker`) are also exported. Они рендерятся без обёртки или внешней логики (masked input, date values parsing, validation, и т.д.).

{{"demo": "pages/components/date-picker/SubComponentsPickers.js"}}

## Custom input component (Кастомный компонент input)

You can customize the rendering of the input with the `renderInput` prop. Убедитесь в корректности указания  `ref` и `inputProps` в кастомном компоненте input.

{{"demo": "pages/components/date-picker/CustomInput.js"}}

## Customized day rendering (Кастомизированный рендеринг дня)

Отображаемые дни настраиваются с помощью функции-свойства `renderDay`. You can take advantage of the [PickersDay](/api/pickers-day/) component.

{{"demo": "pages/components/date-picker/CustomDay.js"}}

## Dynamic data (Динамические данные)

Иногда в календаре может потребоваться отображение дополнительной информации. Вот пример предварительной выборки и отображения серверных данных с помощью свойств `onMonthChange`, `loading`и `renderDay`.

{{"demo": "pages/components/date-picker/ServerRequestDatePicker.js"}}
