---
title: React Select component
components: Select, NativeSelect
githubLabel: 'component: Select'
---

# Selects (auswähler)

<p class="description">Auswahllkomponenten werden zum Sammeln von vom Benutzer bereitgestellten Informationen aus einer Liste von Optionen verwendet.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Einfache Auswahl

Menüs werden über ihren Referenzelementen so positioniert, dass der aktuell ausgewählte Menüpunkt über dem Referenzelement angezeigt wird.

{{"demo": "pages/components/selects/BasicSelect.js"}}

## Advanced features

The Select component is meant to be interchangeable with a native `<select>` element.

If you are looking for more advanced features, like combobox, multiselect, autocomplete, async or creatable support, head to the [`Autocomplete` component](/components/autocomplete/). It's meant to be an improved version of the "react-select" and "downshift" packages.

## Eigenschaften

The Select component is implemented as a custom `<input>` element of the [InputBase](/api/input-base/). It extends the [text field components](/components/text-fields) sub-components, either the [OutlinedInput](/api/outlined-input/), [Input](/api/input/), or [FilledInput](/api/filled-input/), depending on the variant selected. It shares the same styles and many of the same props. Refer to the respective component's API page for details.

### Filled and standard variants

{{"demo": "pages/components/selects/NativeSelects.js"}}

### Labels and helper text

{{"demo": "pages/components/selects/SelectLabels.js"}}

### Auto width

{{"demo": "pages/components/selects/SelectAutoWidth.js"}}

### Other props

{{"demo": "pages/components/selects/SelectOtherProps.js"}}

## Text Felder (Text Fields)

Da die Benutzererfahrung auf mobilen Geräten durch die native Auswahl der Plattform verbessert werden kann, erlauben wir ein solches Muster.

🎨 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/styles/select) an.

## TextField

Die `TextField` Wrapper-Komponente ist ein vollständiges Formularsteuerelement, das eine Beschriftung, Eingabe und Hilfetext enthält. The `Select` component can handle multiple selections.

## Benutzerdefinierte Auswahl

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

Der erste Schritt besteht darin, die `InputBase` Komponente zu formatieren. Anschließend können Sie es entweder direkt als Textfeld verwenden oder der Eigenschaft select `input` zuweisen, um ein Feld `select` zu erhalten. Notice that the `"standard"` variant is easier to customize, since it does not wrap the contents in a `fieldset`/`legend` markup.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

🎨 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/styles/select) an.

## Kontrollierte Auswahl

The `Select` component can handle multiple selections. Die `TextField` Wrapper-Komponente ist ein vollständiges Formularsteuerelement, das eine Beschriftung, Eingabe und Hilfetext enthält.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. Es ist immer ein Array.

### Standard

{{"demo": "pages/components/selects/MultipleSelect.js"}}

### Checkmarks

{{"demo": "pages/components/selects/MultipleSelectCheckmarks.js"}}

### Chip

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

### Placeholder

{{"demo": "pages/components/selects/MultipleSelectPlaceholder.js"}}

### Native

{{"demo": "pages/components/selects/MultipleSelectNative.js"}}

## Mit einem Dialog

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Gruppierung

While it's discouraged by the Material Design guidelines, you can use a select inside a dialog.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Gruppierung

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## Barrierefreiheit

To properly label your `Select` input you need an extra element with an `id` that contains a label. That `id` needs to match the `labelId` of the `Select` e.g.

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

```jsx
<TextField id="select" label="Age" value="20" select>
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```

For a [native select](#native-select), you should mention a label by giving the value of the `id` attribute of the select element to the `InputLabel`'s `htmlFor` attribute:

```jsx
<InputLabel htmlFor="select">Age</InputLabel>
<NativeSelect id="select">
  <option value="10">Ten</option>
  <option value="20">Twenty</option>
</NativeSelect>
```
