---
title: Компонент React Alert
components: Alert, AlertTitle
githubLabel: 'component: Alert'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#alert'
---

# Alert

<p class="description">Alert показывает короткое и важное сообщение для того, чтобы привлечь внимание пользователя, не отвлекая его.</p>

**Примечание:** Этот компонент не задокументирован в [гайдлайнах Material Design](https://material.io/), но Material-UI поддерживает его.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Простые предупреждения

Alert предлагает 4 уровня важности предупреждения с уникальными цветом и значком.

{{"demo": "pages/components/alert/BasicAlerts.js"}}

## Описание

Вы можете использовать `AlertTitle`, чтобы отобразить отформатированный заголовок над содержимым.

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## Действия

Alert может иметь действие, например кнопку закрытия или отмены. Действие рендерится после сообщения, в конце Alert.

If an `onClose` callback is provided and no `action` prop is set, a close icon is displayed. The `action` prop can be used to provide an alternative action, for example using a Button or IconButton.

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### Transition

You can use a [transition component](/components/transitions/) such as `Collapse` to transition the appearance of the alert.

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Иконки

The `icon` prop allows you to add an icon to the beginning of the alert component. This will override the default icon for the specified severity.

You can change the default severity to icon mapping with the `iconMapping` prop. Это может быть определено глобально в [настройках темы](/customization/theme-components/#default-props).

Присвоение свойству icon значения `false` полностью удалит иконку.

{{"demo": "pages/components/alert/IconAlerts.js"}}

## Variants

Two additional variants are available – outlined, and filled:

### Контурный стиль

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### Заполненный стиль

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## Toast

You can use the Snackbar to [display a toast](/components/snackbars/#customized-snackbars) with the Alert.

## Цвет

The `color` prop will override the default color for the specified severity.

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads.

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
