---
title: Datumsauswahl, Zeit Auswahl Reagieren Sie auf React Komponenten
components: TextField
githubLabel: 'component: DatePicker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
packageName: '@material-ui/lab'
---

# Datums- und Uhrzeitauswahlen

<p class="description">Datums- und Zeitauswahlen bieten einen einfachen weg, um einen einzigen Wert aus einem vorgefertigten Bereich zu erfassen.</p>

- Auf dem Handy sind Pcikers am besten für die Anzeige im Bestätigungsdialogfeld geeignet.
- Für die Inline-Anzeige, z. B. in einem Formular, sollten Sie kompakte Steuerelemente wie segmentierte Dropdown-Schaltflächen verwenden.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## React components

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native Picker

⚠️ Unterstützung von systemeigenen Eingabesteuerelementen durch Browser [ist nicht perfekt](https://caniuse.com/#feat=input-datetime).

### Date picker

Eine native Datumsauswahl mit `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date & Time picker

Ein natives Datum & Zeitauswahlbeispiel mit `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Time picker

Ein natives Datum Zeitauswahlbeispiel mit `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}
