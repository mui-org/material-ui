---
title: Composent React Date Picker (Sélecteur de date)
components: DatePicker, PickersDay
githubLabel: 'component: DatePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Sélecteur de date

<p class="description">Ce composent permettent à l'utilisateur  de sélectionner une date</p>

Ce composent permettent à l'utilisateur  de sélectionner une date Date pickers let the user select a date.

- Dialog sur un mobile
- Liste déroulante des champs de texte  sur un ecran de pc

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

{{"demo": "pages/components/date-picker/BasicDatePicker.js"}}

## Mode statique

It's possible to render any picker without the modal/popover and text field. Cela peut être utile lors que vous faite votre propre popover/modal.

{{"demo": "pages/components/date-picker/StaticDatePickerDemo.js", "bg": true}}

## LA responsive UI

Le composant du sélecteur de dates est conçu et optimisé pour le périphérique sur lequel il s'exécute.

- The "Mobile" version works best for touch devices and small screens.
- The "Desktop" version works best for mouse devices and large screens.

By default, the `DatePicker` component uses a `@media (pointer: fine)` media query to determine which version to use. Ceci peut être personnalisé avec la propriété `desktopModeMediaQuery`.

{{"demo": "pages/components/date-picker/ResponsiveDatePickers.js"}}

## Form props

The date picker component can be disabled or read-only.

{{"demo": "pages/components/date-picker/InternalPickers.js"}}

## Localisation

Utilisez la propriété `LocalizationProvider` pour modifier la locale du moteur de date qui est utilisée pour afficher le sélecteur de date. Voici un exemple de changement de locale pour l'adaptateur `date-fns`:

{{"demo": "pages/components/date-picker/LocalizedDatePicker.js"}}

## Jalali calendar system

Install `date-fns-jalali` and use `@date-io/date-fns-jalali` adapter to support [Jalali calendar](https://en.wikipedia.org/wiki/Jalali_calendar).

{{"demo": "pages/components/date-picker/JalaliDatePicker.js"}}

## Affichages des Models

Il est possible de combiner les affichages du selecteur de date par `année`, `mois`, et `date`. Les vues apparaîtront dans l'ordre dans lequel elles sont incluses dans le tableau `views`.

{{"demo": "pages/components/date-picker/ViewsDatePicker.js"}}

## L'orientation d'affichage

For ease of use the date picker will automatically change the layout between portrait and landscape by subscription to the `window.orientation` change. Vous pouvez forcer une mise en page spécifique en utilisant la prop `orientation`.

{{"demo": "pages/components/date-picker/StaticDatePickerLandscape.js", "bg": true}}

## Sous-composants

Some lower level sub-components (`DayPicker`, `MonthPicker` and `YearPicker`) are also exported. Celles-ci sont affichées sans wrapper ou logique externe (l'input masqué et validation des valeurs de date, etc.).

{{"demo": "pages/components/date-picker/SubComponentsPickers.js"}}

## Composant d'Input personnalisé

You can customize rendering of the input with the `renderInput` prop. Assurez-vous d'étendre `ref` et `inputProps` correctement au composant d'input personnalisé.

{{"demo": "pages/components/date-picker/CustomInput.js"}}

## Affichage du jour personnalisé

Les jours affichés sont personnalisables avec la propriété type fonction `renderDay`. You can take advantage of the internal [PickersDay](/api/pickers-day) component.

{{"demo": "pages/components/date-picker/CustomDay.js"}}

## Données dynamiques

Parfois, il peut être nécessaire d'afficher des informations supplémentaires directement dans le calendrier. Voici un exemple de pré-affichage des données côté serveur en utilisant les propriétés `onMonthChange`, `loading`, et `renderDay`.

{{"demo": "pages/components/date-picker/ServerRequestDatePicker.js"}}
