---
title: React Time Picker component
components: TimePicker
githubLabel: 'component: TimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/time-pickers
---

# Time Picker

<p class="description">Time pickers allow the user to select a single time.</p>

Time pickers allow the user to select a single time (in the hours:minutes format). The selected time is indicated by the filled circle at the end of the clock hand.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

Ce composant compatible avec les bibliothèques de gestion des dates de votre choix. Il supporte [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) et toute autre bibliothèque via une interface publique `dateAdapter`.

Veuillez installer l'une de ces bibliothèques et configurer le bon moteur de date en enveloppant votre racine (ou le niveau le plus élevé que vous souhaitez que les sélecteurs soient disponibles) avec `LocalizationProvider`:

```jsx
// ou @material-ui/lab/Adapter{DayJS,Luxon,Moment} ou tout adaptateur date-io valide
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Utilisation de base

The date picker will be rendered as a modal dialog on mobile, and a textfield with a popover on desktop.

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## Mode statique

It's possible to render any picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## LA responsive UI

The time picker component is designed and optimized for the device it runs on.

- The "Mobile" version works best for touch devices and small screens.
- The "Desktop" version works best for mouse devices and large screens.

By default, the `TimePicker` component uses a `@media (pointer: fine)` media query to determine which version to use. Ceci peut être personnalisé avec la propriété `desktopModeMediaQuery`.

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## Form props

The time picker component can be disabled or read-only.

{{"demo": "pages/components/time-picker/FormPropsTimePickers.js"}}

## Localisation

The time picker will automatically adjust to the locale's time setting, i.e. the 12-hour or 24-hour format. This can be controlled with `ampm` prop.

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## Time validation

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## Landscape

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## Sous-composants

Some lower-level sub-components (`ClockPicker`) are also exported. Celles-ci sont affichées sans wrapper ou logique externe (l'input masqué et validation des valeurs de date, etc.).

{{"demo": "pages/components/time-picker/SubComponentsTimePickers.js"}}

## Seconds

The seconds input can be used for selection of a precise time point.

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
