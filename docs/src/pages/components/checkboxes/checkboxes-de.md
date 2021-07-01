---
title: React Checkbox component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
materialDesign: 'https://material.io/components/selection-controls#checkboxes'
githubLabel: 'component: Checkbox'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#checkbox'
---

# Checkbox

<p class="description">Kontrollkästchen ermöglichen dem Benutzer die Auswahl eines oder mehrerer Elemente aus einem Satz.</p>

[Kontrollkästchen ](https://material.io/design/components/selection-controls.html#checkboxes) können eine Option aus- oder anschalten.

Wenn in einer Liste mehrere Optionen erscheinen, können Sie durch Kontrollkästchen die Abstände erhalten statt Ein- / Aus - Schalter zu verwenden. Wenn Sie nur eine Option haben, vermeiden Sie die Verwendung eines Kontrollkästchens und verwenden Sie stattdessen einen Ein- / Ausschalter.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic checkboxes

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

## Kontrollkästchen mit FormGroup

You can provide a label to the `Checkbox` thanks to the `FormControlLabel` component.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the checkboxes.

{{"demo": "pages/components/checkboxes/SizeCheckboxes.js"}}

## Farbe (Color)

{{"demo": "pages/components/checkboxes/ColorCheckboxes.js"}}

## Icon

{{"demo": "pages/components/checkboxes/IconCheckboxes.js"}}

## Controlled

You can control the checkbox with the `checked` and `onChange` props:

{{"demo": "pages/components/checkboxes/ControlledCheckbox.js"}}

## Checkbox with FormControlLabel

A checkbox input can only have two states in a form: checked or unchecked. It either submits its value or doesn't. Visually, there are **three** states a checkbox can be in: checked, unchecked, or indeterminate.

{{"demo": "pages/components/checkboxes/IndeterminateCheckbox.js"}}

> ⚠️ When indeterminate is set, the value of the `checked` prop only impacts the form submitted values. It has no accessibility or UX implications.

## Etikettenplatzierung

`FormGroup` is a helpful wrapper used to group selection control components.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Etikettenplatzierung

Sie können die Platzierung des Etiketts ändern:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Angepasstes Kontrollkästchen

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js"}}

🎨 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/styles/checkbox) an.

## When to use

- [Kontrollkästchen vs. Optionsfeld (Radio Buttons)](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Kontrollkästchen vs. Schalter](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- Alle Formularsteuerelemente sollten Beschriftungen haben. Dazu gehören Optionsfelder, Kontrollkästchen und Schalter. In den meisten Fällen wird dazu das Element `<label>` ([FormControlLabel](/api/form-control-label/)) verwendet.
- Wenn ein Label nicht verwendet werden kann, muss der Eingabekomponente ein Attribut direkt hinzugefügt werden. In diesem Fall können Sie das zusätzliche Attribut (z. B. `aria-label`, `aria-labelby`, `title`) über die Eigenschaft `inputProps` anwenden.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```
