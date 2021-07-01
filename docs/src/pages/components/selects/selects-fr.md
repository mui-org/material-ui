---
title: Composant React Select
components: Select, NativeSelect
githubLabel: 'component: Select'
---

# Liste à choix simple

<p class="description">Select components are used for collecting user provided information from a list of options.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Simple Select

Menus are positioned over their emitting elements such that the currently selected menu item appears on top of the emitting element.

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## Advanced features

The Select component is meant to be interchangeable with a native `<select>` element.

If you are looking for more advanced features, like combobox, multiselect, autocomplete, async or creatable support, head to the [`Autocomplete` component](/components/autocomplete/). C'est censé être une version améliorée de la "react-select" et de "downshift".

## Props

Le composant Select est implémenté en tant qu'élément `<input>` personnalisé de la [InputBase](/api/input-base/). It extends the [text field components](/components/text-fields) sub-components, either the [Input](/api/input/), [FilledInput](/api/filled-input/), or [OutlinedInput](/api/outlined-input/), depending on the variant selected. Il partage les mêmes styles et bon nombre des mêmes accessoires. Reportez-vous à la page API du composant respectif pour plus de détails.

### Filled and outlined variants

{{"demo": "pages/components/selects/NativeSelects.js"}}

### Étiquettes et texte d'aide

{{"demo": "pages/components/selects/SelectLabels.js"}}

### Largeur automatique

{{"demo": "pages/components/selects/SelectAutoWidth.js"}}

### D'autres accessoires

{{"demo": "pages/components/selects/SelectOtherProps.js"}}

## Sélection native

As the user experience can be improved on mobile using the native select of the platform, we allow such pattern.

{{"demo": "pages/components/selects/NativeSelect.js"}}

## TextField

Le composant d'encapsulation `TextField` est un contrôle de formulaire complet comprenant une étiquette, une entrée et un texte d'aide. The first step is to style the `InputBase` component.

## Customized selects

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

The first step is to style the `InputBase` component. Une fois qu'il est stylisé, vous pouvez soit l'utiliser directement comme champ de texte, soit le fournir à la propriété select `input` pour avoir un champ `select`. Notice that the `"standard"` variant is easier to customize, since it does not wrap the contents in a `fieldset`/`legend` markup.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

🎨 Si vous cherchez de l'inspiration, vous pouvez consulter les [exemples de personnalisation de MUI Treasury](https://mui-treasury.com/styles/select).

## Sélection multiple

The `Select` component can handle multiple selections. Il est activé avec la prop `multiple`.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. It's always an array.

### Défaut

{{"demo": "pages/components/selects/MultipleSelect.js"}}

### Coches

{{"demo": "pages/components/selects/MultipleSelectCheckmarks.js"}}

### Chip

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

### Espace réservé

{{"demo": "pages/components/selects/MultipleSelectPlaceholder.js"}}

### Originaire de

{{"demo": "pages/components/selects/MultipleSelectNative.js"}}

## Sélection ouverte contrôlée

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Avec un dialogue

Bien que cela soit découragé par la spécification Material Design, vous pouvez utiliser une sélection dans une boîte de dialogue.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Grouping

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## Accessibilité

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
