---
title: Radio buttons React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
githubLabel: 'component: Radio'
materialDesign: 'https://material.io/components/selection-controls#radio-buttons'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#radiobutton'
---

# Radio

<p class="description">Les radios buttons permettent a l'utilisateur de sélectionner un choix parmi un ensemble de choix.</p>

Utilisez les cases d’option lorsque l’utilisateur a besoin de voir toutes les options disponibles. Si les options disponibles peuvent être réduites, envisagez d'utiliser un menu déroulant, car il utilise moins d'espace disponibles.

Généralement, les cases d'option doivent avoir l'option la plus utilisée sélectionnée par défaut.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## RadioGroup

`RadioGroup` est un gestionnaire utile pour regrouper des composants `Radio` qui fournit une API plus facile et une accessibilité adéquate au clavier.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

### Direction

To lay out the buttons horizontally, set the `row` prop: `<RadioGroup row />`.

{{"demo": "pages/components/radio-buttons/RowRadioButtonsGroup.js"}}

### Checkbox personnalisée

You can control the radio with the `value` and `onChange` props:

{{"demo": "pages/components/radio-buttons/ControlledRadioButtonsGroup.js"}}

## Standalone radio buttons

`Radio` can also be used standalone, without the RadioGroup wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the radios.

{{"demo": "pages/components/radio-buttons/SizeRadioButtons.js"}}

## Couleur

{{"demo": "pages/components/radio-buttons/ColorRadioButtons.js"}}

## Emplacement du label

You can change the placement of the label with the `FormControlLabel` component's `labelPlacement` prop:

{{"demo": "pages/components/radio-buttons/FormControlLabelPlacement.js"}}

## Show error

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

{{"demo": "pages/components/radio-buttons/ErrorRadios.js"}}

## Customized radios

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## `useRadioGroup`

Pour les cas d'utilisation de personnalisation avancée, utilisez la fonction `useRadioGroup()`. Cela retourne la valeur de contexte du groupe radio parent. Le composant Radio utilise ce hook en interne.

### API

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```

#### Valeur de retour

`value` (_Object_):

- `value.name` (_String_ [optional]): The name used to reference the value of the control.
- `value.onChange` (_Void_ [optional]): Callback fired when a radio button is selected.
- `value.value` (_Any_ [optional]): Value of the selected radio button.

#### Exemple

{{"demo": "pages/components/radio-buttons/UseRadioGroup.js"}}

## Quand les utiliser

- [Cases à cocher vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- Tous les contrôles de formulaire doivent avoir des labels, cela vaut également pour les boutons radio, les cases à cocher et les interrupteurs. Dans la plupart des cas, cela se fait en utilisant l'élément `<label>` ([FormControlLabel](/api/form-control-label/)).
- Lorsqu'un label ne peut pas être utilisé, il est nécessaire d'ajouter un attribut directement au composant input. Dans ce cas, vous pouvez appliquer l'attribut supplémentaire (ex: `aria-label`, `aria-labelledby`, `title`) via la propriété `inputProps`.

```jsx
<RadioButton
  value="radioA"
  inputProps={{
    'aria-label': 'Radio A',
  }}
/>
```
