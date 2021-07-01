---
title: Компонент React Select
components: Select, NativeSelect
githubLabel: 'component: Select'
---

# Select (Список)

<p class="description">Компонент Select используются для сбора информации, предоставленной пользователем, из списка параметров.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Простой список

Меню располагаются над вызвавшими их элементами таким образом, чтобы элемент меню, выбранный в данный момент, перекрывал вызывающий элемент.

{{"demo": "pages/components/selects/BasicSelect.js"}}

## Расширенные возможности

Компонент Select взаимозаменяем с нативным элементом `<select>`.

Для более продвинутых опций, таких как Комбинированные Списки, Множественный Выбор, Автодополнения, а также поддержки async или Creatable, воспользуйтесь компонентом [`Autocomplete`](/components/autocomplete/). It's meant to be an improved version of the "react-select" and "downshift" packages.

## Props

The Select component is implemented as a custom `<input>` element of the [InputBase](/api/input-base/). It extends the [text field components](/components/text-fields) sub-components, either the [OutlinedInput](/api/outlined-input/), [Input](/api/input/), or [FilledInput](/api/filled-input/), depending on the variant selected. It shares the same styles and many of the same props. Refer to the respective component's API page for details.

### Filled and standard variants

{{"demo": "pages/components/selects/SelectVariants.js"}}

### Labels and helper text

{{"demo": "pages/components/selects/SelectLabels.js"}}

### Auto width

{{"demo": "pages/components/selects/SelectAutoWidth.js"}}

### Other props

{{"demo": "pages/components/selects/SelectOtherProps.js"}}

## Текстовые поля

Мы допускаем этот подход, так как использование нативных списков на мобильных платформах улучшает опыт пользователя (User Experience).

{{"demo": "pages/components/selects/NativeSelect.js"}}

## TextField

`TextField` представляет собой полноценный элемент управления формы, включая метку (label), само поле ввода и вспомогательный текст. Чтобы правильно подписать ваш элемент `Select`, вам потребуется дополнительный элемент со свойством `id`.

## Кастомизированные списки

Ниже находятся примеры кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

Чтобы правильно подписать ваш элемент `Select`, вам потребуется дополнительный элемент со свойством `id`. После стилизации, вы можете использовать компонент напрямую как текстовое поле, либо передать его в компонент `Select`, свойством `input`. Notice that the `"standard"` variant is easier to customize, since it does not wrap the contents in a `fieldset`/`legend` markup.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/select).

## Контроль открытия/закрытия

Компонент `Select` поддерживает множественный выбор. Компонент `Select` поддерживает множественный выбор.

Как и с одиночным списком, новое значение может быть получено из поля `event.target.value`, в коллбеке `onChange`. Это значение всегда является массивом.

### По-умолчанию

{{"demo": "pages/components/selects/MultipleSelect.js"}}

### Checkmarks

{{"demo": "pages/components/selects/MultipleSelectCheckmarks.js"}}

### Chip

В качестве альтернативы, компонент `TextField` со свойствами `id` и `label` создадут подходящую разметку:

### Placeholder

{{"demo": "pages/components/selects/MultipleSelectPlaceholder.js"}}

### Native

{{"demo": "pages/components/selects/MultipleSelectNative.js"}}

## Внутри диалогового окна

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Группировка

While it's discouraged by the Material Design guidelines, you can use a select inside a dialog.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Группировка

Используйте компонент `ListSubheader` или нативный элемент `<optgroup>` для отображения категорий.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## Доступность

Чтобы правильно подписать ваш элемент `Select`, вам потребуется дополнительный элемент со свойством `id`. Значение `id` должно совпадать со значением свойства `labelId` компонента `Select`, например

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

В качестве альтернативы, компонент `TextField` со свойствами `id` и `label` создадут подходящую разметку:

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
