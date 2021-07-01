---
title: Компонент React Button
components: Button, IconButton, ButtonBase
materialDesign: https://material.io/components/buttons
githubLabel: 'component: Button'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#button'
---

# Button

<p class="description">Кнопки позволяют пользователям выполнять действия и делать выбор одним нажатием.</p>

[Кнопки](https://material.io/design/components/buttons.html) обозначают действия, которые могут выполнять пользователи. Они используются в таких местах пользовательского интерфейса, как:

- Диалоги
- Всплывающие окно
- Формы
- Карточки
- Панели инструментов

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic Button

The `Button` comes with three variants: text (default), contained, and outlined.

{{"demo": "pages/components/buttons/BasicButtons.js"}}

### Текстовые кнопки

[Text buttons](https://material.io/components/buttons#text-button) are typically used for less-pronounced actions, including those located: in dialogs, in cards. В Карточках (Cards) текстовые кнопки помогают сохранить акцент на содержании карточки.

{{"demo": "pages/components/buttons/TextButtons.js"}}

### Блочные кнопки

[Блочные кнопки](https://material.io/design/components/buttons.html#contained-button) имеют высокий акцент, отличаются использованием возвышения и заполнения. Они содержат действия, которые являются основными для вашего приложения.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

Вы можете убрать эффект "всплытия" с помощью пропа `disableElevation`.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

### Контурные кнопки

[Outlined buttons](https://material.io/components/buttons#outlined-button) are medium-emphasis buttons. They contain actions that are important but aren't the primary action in an app.

Выделенные кнопки также являются альтернативой выделенным кнопкам или могут использоваться как альтернатива текстовым кнопкам.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Handling clicks

All components accept an `onClick` handler that is applied to the root DOM element.

```jsx
<Button onClick={() => { alert('clicked') }}>Click me</Button>
```

Note that the documentation [avoids](/guides/api/#native-properties) mentioning native props (there are a lot) in the API section of the components.

## Цвет

{{"demo": "pages/components/buttons/ColorButtons.js"}}

In addition to using the default button colors, you can add custom ones, or disable any you don't need. See the [Adding new colors](/customization/palette/#adding-new-colors) example for more info.

## Размеры

For larger or smaller buttons, use the `size` prop.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Кнопка загрузки файла

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Кнопки с иконками и текстом

Иногда вам нужно поместить иконку внутри кнопки, чтобы улучшить UX-состовляющую приложения, потому что мы легче распознаем иконки, чем простой текст. Например, если у вас есть кнопка удаления, вы можете пометить ее значком мусорной корзины.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Кнопки с иконками

Кнопки с иконками обычно находятся на панелях навигации и на панелях инструментов.

Значки также подходят для кнопок переключения, которые позволяют выбрать элемент или отменить выбор, например, добавление или удаление звезды для элемента.

{{"demo": "pages/components/buttons/IconButtons.js"}}

### Размеры

For larger or smaller icon buttons, use the `size` prop.

{{"demo": "pages/components/buttons/IconButtonSizes.js"}}

## Настраиваемые кнопки

Ниже находятся примеры кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/button).

## Сложные кнопки

The loading buttons can show loading state and disable interactions.

{{"demo": "pages/components/buttons/LoadingButtons.js"}}

Здесь можно ознакомится [с примером использования с react-router](/guides/composition/#button).

Компонент ButtonBase устанавливает `pointer-events: none;` на отключенных (disabled) кнопках, что отменяет появление disabled-курсора.

## Complex buttons

Текстовые кнопки, плавающие кнопки действий, блочные кнопки построены на основе одного и того же компонента: `ButtonBase`. Вы можете воспользоваться этим более низкоуровневым компонентом для создания пользовательских взаимодействий.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Сторонняя библиотека маршрутизации

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. Одно из обыденных случаев использования кнопки - это навигация на другую страницу. Here is a [more detailed guide](/guides/routing/#button).

## Ограничения

### Cursor not-allowed

Компонент ButtonBase устанавливает `pointer-events: none;` на отключенных (disabled) кнопках, что отменяет появление disabled-курсора.

Есть два способа использовать `not-allowed`

1. **Только CSS** You can remove the pointer-events style on the disabled state of the `<button>` element:

```css
.MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
```

Однако:

- Необходимо вернуть `pointer-events: none;` назад, в момент когда вам нужно будет отобразить [подсказку на отключенном элементе](/components/tooltips/#disabled-elements).
- Курсор не изменится, в случае если вы отрендерите какой-либо другой элемент, например `<a>`.

2. **Изменение DOM** Вы можете обернуть кнопку в дополнительный контейнер:

```jsx
<span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
```

Этот способ работает для всех элементов, в том числе и для `<a>`.
