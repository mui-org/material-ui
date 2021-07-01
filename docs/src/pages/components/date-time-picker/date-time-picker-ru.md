---
title: React Date Time Picker component
components: DateTimePicker,DesktopDateTimePicker,MobileDateTimePicker,StaticDateTimePicker
githubLabel: 'component: DateTimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Time Picker (Выбор даты/времени)

<p class="description">Комбинированный выбор даты и времени (date & time picker).</p>

Этот компонент сочетает в себе выбор даты и времени. Он позволяет пользователю выбрать одновременно дату и время с одним и тем же контролем.

Обратите внимание, что этот компонент является комбинированным компонентом [DatePicker](/components/date-picker/) и [TimePicker](/components/time-picker/), поэтому любой из этих компонентов может быть передан пользователю DateTimePicker.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

Этот компонент опирается на выбранную Вами библиотеку управления датами. Поддерживает [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) и любую другую библиотеку с помощью публичного `dateAdapter` интерфейса.

Пожалуйста, установите любую из этих библиотек и настройте правильно механизм даты, обернув root (или самый высокий уровень, на котором вы хотели бы иметь доступ к pickers) с `LocalizationProvider`:

```jsx
// or @material-ui/lab/Adapter{Dayjs,Luxon,Moment} or any valid date-io adapter
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Basic Usage (Основное использование)

Позволяет выбрать дату и время. Существует 4 доступных шага (год, дата, час и минут), поэтому вкладки должны визуально различать шаги даты/времени.

{{"demo": "pages/components/date-time-picker/BasicDateTimePicker.js"}}

## Responsiveness

Компонент `DateTimePicker` разработан и оптимизирован под устройство, на котором он работает.

- The `MobileDateTimePicker` component works best for touch devices and small screens.
- The `DesktopDateTimePicker` component works best for mouse devices and large screens.

By default, the `DateTimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. Его можно настроить с помощью `DesktopModeMediaQuery`.

{{"demo": "pages/components/date-time-picker/ResponsiveDateTimePickers.js"}}

## Form props

The date time picker component can be disabled or read-only.

{{"demo": "pages/components/date-time-picker/FormPropsDateTimePickers.js"}}

## Date and time validation (Валидация даты и времени)

Можно ограничить выбор даты и времени двумя способами:

- с помощью `minDateTime`/`maxDateTime` можно ограничить выбор времени до или после определенного момента во времени
- используя `minTime`/`maxTime`, вы можете отключить выбор времени до или после определенного времени каждый день соответственно.

{{"demo": "pages/components/date-time-picker/DateTimeValidation.js"}}

## Static mode (Статический режим)

It's possible to render any date & time picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/date-time-picker/StaticDateTimePickerDemo.js", "bg": true}}

## Кастомизация

Вот несколько примеров хорошо настроенного выбора даты и времени:

{{"demo": "pages/components/date-time-picker/CustomDateTimePicker.js"}}
