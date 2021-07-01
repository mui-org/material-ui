---
title: React Time Picker component
components: DesktopTimePicker, MobileTimePicker, StaticTimePicker, TimePicker, ClockPicker
githubLabel: 'component: TimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/time-pickers
---

# Time Picker

<p class="description">Time pickers allow the user to select a single time.</p>

Time pickers allow the user to select a single time (in the hours:minutes format). The selected time is indicated by the filled circle at the end of the clock hand.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

This component relies on the date management library of your choice. It supports [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) and any other library via a public `dateAdapter` interface.

Please install any of these libraries and set up the right date engine by wrapping your root (or the highest level you wish the pickers to be available) with `LocalizationProvider`:

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

## Basic usage

The date picker will be rendered as a modal dialog on mobile, and a textfield with a popover on desktop.

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## Static mode

It's possible to render any time picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## Responsiveness

The time picker component is designed and optimized for the device it runs on.

- The `MobileTimePicker` component works best for touch devices and small screens.
- The `DesktopTimePicker` component works best for mouse devices and large screens.

By default, the `TimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## Propiedades del Form

The time picker component can be disabled or read-only.

{{"demo": "pages/components/time-picker/FormPropsTimePickers.js"}}

## Localización

Use `LocalizationProvider` to change the date-engine locale that is used to render the time picker. The time picker will automatically adjust to the locale's time setting, i.e. the 12-hour or 24-hour format. This can be controlled with `ampm` prop.

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## Time validation

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## Landscape

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## Sub-components

Some lower-level sub-components (`ClockPicker`) are also exported. These are rendered without a wrapper or outer logic (masked input, date values parsing and validation, etc.).

{{"demo": "pages/components/time-picker/SubComponentsTimePickers.js"}}

## Seconds

The seconds input can be used for selection of a precise time point.

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
