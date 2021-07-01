---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
githubLabel: 'component: ToggleButton'
materialDesign: 'https://material.io/components/buttons#toggle-button'
---

# Toggle Buttons

<p class="description">Toggle buttons can be used to group related options.</p>

To emphasize groups of related [Toggle buttons](https://material.io/components/buttons#toggle-button), a group should share a common container. The `ToggleButtonGroup` controls the selected state of its child buttons when given its own `value` prop.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Exclusive selection

С исключительным выделением выбор одной опции снимает выделение с остальных.

In this example, text justification toggle buttons present options for left, center, right, and fully justified text (disabled), with only one item available for selection at a time.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Multiple selection

Множественное выделение позволяет выбрать несколько вариантов из логически связанных опций, таких как bold, italic, и underline.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## Size

For larger or smaller buttons, use the `size` prop.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Цвет

{{"demo": "pages/components/toggle-button/ColorToggleButton.js"}}

## Vertical buttons

Кнопки можно выстроить вертикально задав свойству `orientation` значение "vertical".

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## Enforce value set

Если вы хотите, чтобы по крайней мере одна кнопка была активной, то можете адаптировать под себя функцию handleChange.

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## Standalone toggle button

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

Ниже находится пример кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Доступность

### ARIA

- ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.
- ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.

### Keyboard

В настоящее время кнопки переключения расположены в порядке DOM. Для перемещения между ними используйте клавишу табуляции. Поведение кнопки следует стандартной семантике клавиатуры.
