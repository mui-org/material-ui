---
title: Composant React Date Range Picker (Sélecteur de plage de dates)
components: DateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Range Picker [<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-x/)

<p class="description">Les sélecteurs de dates permettent à l'utilisateur de sélectionner une plage de dates.</p>

> <br /><br /> This paid extension will include more advanced components (rich data grid, date range picker, tree view drag & drop, etc.). ⚠️ Premium component <br /><br /> The date range picker is intended for Material-UI X, a commercial set of advanced components built on top of the community edition (MIT license) of Material-UI. [Early access](https://material-ui.com/store/items/material-ui-x/) starts at an affordable price.

Les sélecteurs de plage de dates permettent à l'utilisateur de sélectionner une plage de dates.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

Ce composant compatible avec les bibliothèques de gestion des dates de votre choix. Il supporte [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) et toute autre bibliothèque via une interface publique `dateAdapter`.

Veuillez installer l'une de ces bibliothèques et configurer le bon moteur de date en enveloppant votre racine (ou le niveau le plus élevé que vous souhaitez que les sélecteurs soient disponibles) avec `LocalizationProvider`:

```jsx
// ou @material-ui/lab/dateAdapter/{dayjs,luxon,moment} ou tout adaptateur date-io valide
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
  );
}
```

## Utilisation de base

Note that you can pass almost any prop from [DatePicker]('/api/date-picker/').

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## Mode statique

It's possible to render any picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/date-range-picker/StaticDateRangePicker.js"}}

## LA responsive UI

Le composant sélecteur de plage de dates est conçu pour être optimisé pour l'appareil sur lequel il s'exécute.

- The "Mobile" version works best for touch devices and small screens.
- The "Desktop" version works best for mouse devices and large screens.

By default, the `DateRangePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. Ceci peut être personnalisé avec la propriété `desktopModeMediaQuery`. Ceci peut être personnalisé avec la propriété `desktopModeMediaQuery`.

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Form props

The date range picker component can be disabled or read-only.

{{"demo": "pages/components/date-range-picker/FormPropsDateRangePickers.js"}}

## Nombre de mois différent

Notez que la prop `calendars` ne fonctionne qu'en mode bureau.

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## Désactiver les dates

La désactivation des dates se comporte de la même manière que le simple `DatePicker`.

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## Composant d'Input personnalisé

Vous pouvez personnaliser l'entrée rendue avec le prop `renderInput`. Pour `DateRangePicker`, il prend **2** paramètres - pour l'entrée de début et de fin respectivement. Si vous devez restituer des entrées personnalisées, assurez-vous de répartir correctement `ref` et `inputProps` dans les composants d'entrée.

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## Affichage du jour personnalisé

Les jours affichés sont personnalisables avec la propriété type fonction `renderDay`. You can take advantage of the internal [DateRangePickerDay](/api/date-range-picker-day/) component.

{{"demo": "pages/components/date-range-picker/CustomDateRangePickerDay.js"}}
