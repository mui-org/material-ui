---
title: Composant React switch
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: Switch'
materialDesign: 'https://material.io/components/selection-controls#switches'
---

# Interrupteur (switch)

<p class="description">Switches toggle the state of a single setting on or off.</p>

[Switches](https://material.io/design/components/selection-controls.html#switches) sont le moyen préféré pour ajuster les paramètres sur mobile. The option that the switch controls, as well as the state it's in, should be made clear from the corresponding inline label. L'option que le switch contrôle, ainsi que l'état dans lequel il se trouve, doivent être clairement indiqués à partir de l'étiquette en ligne correspondante.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic switches

{{"demo": "pages/components/switches/Switches.js"}}

## Checkbox avec FormControlLabel

`Switch` can be provided with a description thanks to the `FormControlLabel` component.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Size

Fancy smaller switches? Use the `size` prop.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Couleur

{{"demo": "pages/components/switches/ColorSwitches.js"}}

## Checkbox personnalisée

You can control the switch with the `checked` and `onChange` props:

🎨 Si vous cherchez de l'inspiration, vous pouvez consulter les [exemples de personnalisation de MUI Treasury](https://mui-treasury.com/styles/switch).

## Switches with FormGroup

`FormGroup` est un wrapper utile utilisé pour regrouper les composants de contrôles de sélection et qui fournit une API plus simple. Cependant, nous vous encourageons à utiliser des [cases à cocher](/components/checkboxes/) à la place si plusieurs switch sont requis. (See: [When to use](#when-to-use)).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Customized switches

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 Si vous cherchez de l'inspiration, vous pouvez consulter les [exemples de personnalisation de MUI Treasury](https://mui-treasury.com/styles/switch).

## Emplacement du label

Vous pouvez changer l'emplacement du label:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Quand les utiliser

- [Cases à cocher vs. Switches (interrupteurs)](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibilité

- It will render an element with the `checkbox` role not `switch` role since this role isn't widely supported yet. Please test first if assistive technology of your target audience supports this role properly. Then you can change the role with `<Switch inputProps={{ role: 'switch' }}>`
- Tous les contrôles de formulaire doivent avoir des labels, cela vaut également pour les boutons radio, les cases à cocher et les interrupteurs. Dans la plupart des cas, cela se fait en utilisant l'élément `<label>` ([FormControlLabel](/api/form-control-label/)).
- Lorsqu'un label ne peut pas être utilisé, il est nécessaire d'ajouter un attribut directement au composant input. Dans ce cas, vous pouvez appliquer l'attribut supplémentaire (ex: `aria-label`, `aria-labelledby`, `title`) via la propriété `inputProps`.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
