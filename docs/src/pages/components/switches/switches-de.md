---
title: React Switch component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: Switch'
materialDesign: 'https://material.io/components/selection-controls#switches'
---

# Switch

<p class="description">Schalter ändern den Status einer einzelnen Einstellung ein oder aus.</p>

[Schalter](https://material.io/design/components/selection-controls.html#switches) sind die bevorzugte Methode zum Anpassen der Einstellungen auf dem Handy. The option that the switch controls, as well as the state it's in, should be made clear from the corresponding inline label.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic switches

{{"demo": "pages/components/switches/BasicSwitches.js"}}

## Kontrollkästchen mit FormGroup

You can provide a label to the `Switch` thanks to the `FormControlLabel` component.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Size

Use the `size` prop to change the size of the switch.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Farbe (Color)

{{"demo": "pages/components/switches/ColorSwitches.js"}}

## Controlled

You can control the switch with the `checked` and `onChange` props:

{{"demo": "pages/components/switches/ControlledSwitches.js"}}

## Schalter mit FormGroup

`FormGroup` ist ein hilfreicher Wrapper zum Gruppieren von Auswahlsteuerungskomponenten, welcher eine einfachere API bietet. `FormGroup` ist ein hilfreicher Wrapper zum Gruppieren von Auswahlsteuerungskomponenten, welcher eine einfachere API bietet. (See: [When to use](#when-to-use)).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Anpasster Schalter

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/styles/switch) an.

## Etikettenplatzierung

Sie können die Platzierung des Etiketts ändern:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## When to use

- [Kontrollkästchen vs. Schalter](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Barrierefreiheit

- Es wird ein Element mit der `checkbox`-Rolle statt der `switch`-Rolle ausgegeben, da jene größtenteils noch nicht unterstützt wird. Please test first if assistive technology of your target audience supports this role properly. Then you can change the role with `<Switch inputProps={{ role: 'switch' }}>`
- Alle Formularsteuerelemente sollten Beschriftungen haben. Dazu gehören Optionsfelder, Kontrollkästchen und Schalter. In den meisten Fällen wird dazu das Element `<label>` ([FormControlLabel](/api/form-control-label/)) verwendet.
- Wenn ein Label nicht verwendet werden kann, muss der Eingabekomponente ein Attribut direkt hinzugefügt werden. In diesem Fall können Sie das zusätzliche Attribut (z. B. `aria-label`, `aria-labelby`, `title`) über die Eigenschaft `inputProps` anwenden.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
