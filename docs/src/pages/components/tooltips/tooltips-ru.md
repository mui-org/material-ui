---
title: Компонент React Tooltip
components: Tooltip
githubLabel: 'component: Tooltip'
materialDesign: https://material.io/components/tooltips
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tooltip'
---

# Tooltip

<p class="description">Всплывающие подсказки отображают информативный текст когда пользователь наводит курсор на элемент, фокусируется на нем или нажимает на него.</p>

При активации, [Tooltips](https://material.io/design/components/tooltips.html) отображают текстовую метку, идентифицирующая элемент, например, описание его функции.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Простые подсказки

{{"demo": "pages/components/tooltips/BasicTooltip.js"}}

## Positioned tooltips

The `Tooltip` has 12 **placements** choice. They don't have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Настраиваемые подсказки

Ниже находятся примеры кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Arrow tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Custom child element

The tooltip needs to apply DOM event listeners to its child element. The tooltip needs to apply DOM event listeners to its child element.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip title="Delete">
  <MyComponent>
</Tooltip>
```

You can find a similar concept in the [wrapping components](/guides/composition/#wrapping-components) guide.

## Триггеры

You can define the types of events that cause a tooltip to show.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Controlled tooltips

Вы можете использовать `open`, `onOpen` and `onClose` свойства, чтобы контролировать поведение всплывающей подсказки.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Variable width

The `Tooltip` wraps long text by default to make it readable.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Интерактивность

Подсказки интерактивны по умолчанию (чтобы пройти тест [WCAG 2.1 success criterion 1.4.13](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)). Перемещение указателя над подсказкой до истечения срока `leaveDelay` не приведет к её закрытию. Вы можете отключить это поведение (и таким образом не пройти тест, необходимый для достижения уровня АА), передав `disableInteractive`.

{{"demo": "pages/components/tooltips/NonInteractiveTooltips.js"}}

## Disabled elements

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

> ⚠️ In order to work with Safari, you need at least one display block or flex item below the tooltip wrapper.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a Material-UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property *pointer-events: none;* to your element when disabled:

```jsx
<Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ? <Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ?
```

## Переходы

Используйте другой transition.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Следовать за курсором

Вы можете разрешить подсказке следовать за курсором установкой `followCursor={true}`.

{{"demo": "pages/components/tooltips/FollowCursorTooltips.js"}}

## Virtual element

Если вам нужно указать собственное положение подсказки, вы можете воспользоваться параметром `anchorEl`. Значение `anchorEl` может быть ссылкой на имитированный DOM-элемент. You need to create an object shaped like the [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/).

{{"demo": "pages/components/tooltips/AnchorElTooltips.js"}}

## Отображение и скрытие

Всплывающая подсказка обычно отображается сразу же, как пользователь наводит курсор на элемент, и скрывается, как только курсор уходит с элемента. Задержку в отображении или скрытии всплывающей подсказки можно добавить через свойства `enterDelay` и `leaveDelay`, как показано выше в демонстрационной версии «Контролируемые подсказки».

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tooltip)

По умолчанию подсказка лишь маркирует дочерний элемент. Это существенно отличает её от `title`, который может либо маркировать **либо** описать свой дочерний элемент в зависимости от того, есть ли у него уже метка. Например, здесь:

```html
<button title="some more information">A button</button>
```

параметр `title` действует как доступное описание. Если вы хотите, чтобы сама подсказка служила доступным описанием, вы можете передать `describeChild`. Обратите внимание, вам не следует использовать `describeChild` если подсказка предоставляет только визуальную метку. В противном случае дочерний элемент не будет иметь доступного имени, и подсказка нарушит [критерий успеха 2.5.3 в WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "pages/components/tooltips/AccessibilityTooltips.js"}}
