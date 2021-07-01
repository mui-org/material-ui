---
title: Компонент React Switch
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: Switch'
materialDesign: 'https://material.io/components/selection-controls#switches'
---

# Switch (переключатель)

<p class="description">Переключатели изменяют состояние одного отдельного параметра между "включено" и "выключено".</p>

[Переключатели](https://material.io/design/components/selection-controls.html#switches) – предпочтительный способ установки параметров на мобильных устройствах. The option that the switch controls, as well as the state it's in, should be made clear from the corresponding inline label.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Основные переключатели

{{"demo": "pages/components/switches/BasicSwitches.js"}}

## Checkbox with FormGroup (Чекбоксы с FormGroup)

You can provide a label to the `Switch` thanks to the `FormControlLabel` component.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Size

Use the `size` prop to change the size of the switch.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Цвет

{{"demo": "pages/components/switches/ColorSwitches.js"}}

## Controlled

You can control the switch with the `checked` and `onChange` props:

{{"demo": "pages/components/switches/ControlledSwitches.js"}}

## Переключатели с FormGroup

`FormGroup` - это полезная обертка, используемая для группировки компонентов элементов управления выбором, она предоставляет более простой API. `FormGroup` - это полезная обертка, используемая для группировки компонентов элементов управления выбором, она предоставляет более простой API. (See: [When to use](#when-to-use)).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Кастомизация переключателей

Ниже находятся примеры кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch).

## Расположение метки

Расположение метки можно изменить:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Бесплатно

- [Checkboxes или Switches](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Доступность

- У элемента будет роль `checkbox`, а не `switch`, так как эта роль пока слабо поддерживается. Если вы хотите использовать роль `switch`, пожалуйста, сперва проверьте что вспомогательные технологии вашей целевой аудитории её поддерживают. После этого вы можете изменить роль `<Switch inputProps={{ role: 'switch' }}>`
- Все элементы формы должны иметь метки, в том числе радиокнопки, переключатели и чекбоксы. В большинстве случаев это делается с помощью элемента `<label>` ([FormControlLabel](/api/form-control-label/)).
- Когда метка не может быть использована, необходимо добавить атрибут непосредственно на поле ввода. В этом случае можно применить дополнительный атрибут (например, `aria-label`, `aria-labelledby`, `title`) через свойство `inputProps`.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
