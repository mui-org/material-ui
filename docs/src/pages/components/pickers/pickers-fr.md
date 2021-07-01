---
title: Date picker, Time picker React components
components: TextField
githubLabel: 'component: DatePicker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
packageName: '@material-ui/lab'
---

# Date / Time pickers

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- Sur mobile, les sélecteurs conviennent mieux à l’affichage dans la boîte de dialogue de confirmation.
- Pour un affichage en ligne, par exemple sur un formulaire, envisagez d'utiliser des contrôles compacts tels que des boutons déroulants segmentés.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Composants réactifs

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native pickers

⚠️ La prise en charge des sélecteurs natifs par les navigateurs [n'est pas parfaite](https://caniuse.com/#feat=input-datetime).

### Sélecteur de date

Exemple de sélecteur de date natif avec `type = "date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date et ; Sélecteur de temps

Exemple de sélecteur de date natif avec `type = "datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Sélecteur de temps

Exemple de sélecteur de temps natif avec `type = "time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}
