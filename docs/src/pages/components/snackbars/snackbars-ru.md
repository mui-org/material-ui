---
title: Компонент React Snackbar
components: Snackbar, SnackbarContent
githubLabel: 'component: Snackbar'
materialDesign: https://material.io/components/snackbars
waiAria: 'https://www.w3.org/TR/wai-aria-1.1/#alert'
---

# Snackbar

<p class="description">Snackbars provide brief messages about app processes. The component is also known as a toast.</p>

[Snackbars](https://material.io/design/components/snackbars.html) inform users of a process that an app has performed or will perform. Они времени отображаются в нижней части экрана (данное поведение можно изменить). They shouldn't interrupt the user experience, and they don't require user input to disappear.

Всплывающие компоненты содержат одну строку текста, непосредственно связанную с выполненной операцией. Они могут содержать текстовое действие, но не иконки. Вы можете использовать их для отображения уведомлений.

{{"component": "modules/components/ComponentLinkHeader.js"}}

#### Количество на странице

В один момент на странице можно отобразить только один всплывающий компонент.

## Простые всплывающие компоненты

A basic snackbar that aims to reproduce Google Keep's snackbar behavior.

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## Customized snackbars

Ниже находятся примеры кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## Позиционированные всплывающие уведомления

In wide layouts, snackbars can be left-aligned or center-aligned if they are consistently placed on the same spot at the bottom of the screen, however there may be circumstances where the placement of the snackbar needs to be more flexible. You can control the position of the snackbar by specifying the `anchorOrigin` prop.

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## Длина сообщения

Some snackbars with varying message length.

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## Переходы

### Consecutive Snackbars

When multiple snackbar updates are necessary, they should appear one at a time.

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars and floating action buttons (FABs)

Snackbars should appear above FABs (on mobile).

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

### Изменение анимации

[Увеличение](/components/transitions/#grow) - это анимация, которая используется по умолчанию, но вы можете использовать другую анимацию.

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### Control Slide direction

Вы можете изменить направление [анимации](/components/transitions/#slide).

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## Дополнительные проекты

Для более сложных вариантов использования вы можете воспользоваться:

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

This example demonstrates how to use [notistack](https://github.com/iamhosseindhv/notistack). notistack has an **imperative API** that makes it easy to display snackbars, without having to handle their open/close state. It also enables you to **stack** them on top of one another (although this is discouraged by the Material Design guidelines).

TODO: Add example once notistack is compatible with v5 or replace with [#1824](https://github.com/mui-org/material-ui/issues/1824).

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-1.1/#alert)

- По умолчанию всплывающий компонент не будет скрываться автоматически. Однако, если вы решите использовать функцию `autoHideDuration`, рекомендуется дать пользователю [достаточное время](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) для реагирования.
