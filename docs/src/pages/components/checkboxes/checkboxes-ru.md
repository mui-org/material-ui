---
title: Компонент React Checkbox
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
materialDesign: 'https://material.io/components/selection-controls#checkboxes'
githubLabel: 'component: Checkbox'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#checkbox'
---

# Checkbox

<p class="description">Чекбоксы позволяют выбрать один или несколько элементов из набора.</p>

[Чекбоксы](https://material.io/design/components/selection-controls.html#checkboxes) могут быть использованы для включения или выключения различных опций.

Если у вас есть несколько опций, отображаемых в списке, вы можете сохранить пространство, используя чекбоксы вместо переключателей. Если у вас есть только один вариант, лучше не использовать чекбокс, вместо него используйте переключатель включения / выключения.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic checkboxes

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

## Checkbox with FormGroup (Чекбоксы с FormGroup)

You can provide a label to the `Checkbox` thanks to the `FormControlLabel` component.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the checkboxes.

{{"demo": "pages/components/checkboxes/SizeCheckboxes.js"}}

## Цвет

{{"demo": "pages/components/checkboxes/ColorCheckboxes.js"}}

## Icon

{{"demo": "pages/components/checkboxes/IconCheckboxes.js"}}

## Controlled

You can control the checkbox with the `checked` and `onChange` props:

{{"demo": "pages/components/checkboxes/ControlledCheckbox.js"}}

## Checkbox with FormControlLabel

Чекбокс может иметь только два состояния: отмечен или нет. Либо передаёт значение, либо нет. Visually, there are **three** states a checkbox can be in: checked, unchecked, or indeterminate.

{{"demo": "pages/components/checkboxes/IndeterminateCheckbox.js"}}

> ⚠️ When indeterminate is set, the value of the `checked` prop only impacts the form submitted values. It has no accessibility or UX implications.

## FormGroup

`FormGroup` is a helpful wrapper used to group selection control components.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Расположение метки

Расположение метки можно изменить:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Customized checkbox

Ниже находится пример кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/checkbox).

## Бесплатно

- [Checkboxes или Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Checkboxes или Switches](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- Все элементы формы должны иметь метки, в том числе радиокнопки, переключатели и чекбоксы. В большинстве случаев это делается с помощью элемента `<label>` ([FormControlLabel](/api/form-control-label/)).
- Когда метка не может быть использована, необходимо добавить атрибут непосредственно на поле ввода. В этом случае можно применить дополнительный атрибут (например, `aria-label`, `aria-labelledby`, `title`) через свойство `inputProps`.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```
