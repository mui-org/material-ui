---
title: Компонент React Fab
components: Fab
githubLabel: 'component: Fab'
materialDesign: https://material.io/components/buttons-floating-action-button
---

# Floating action button

<p class="description">A floating action button (FAB) performs the primary, or most common, action on a screen.</p>

A [floating action button](https://material.io/design/components/buttons-floating-action-button.html) appears in front of all screen content, typically as a circular shape with an icon in its center. FABs бывают двух типов: обычные и расширенные.

Используйте плавающую кнопку действий (FAB) только в том случае, если это наиболее подходящий способ представить основное действие экрана. Only use a FAB if it is the most suitable way to present a screen's primary action.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Floating Action Button

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size

By default, the size is `large`. Use the `size` prop for smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

{{"demo": "pages/components/floating-action-button/FloatingActionButtonExtendedSize.js"}}

## Animation

По умолчанию анимация кнопки с плавающим действием на экране является расширяющейся.

Кнопка с плавающим действием, которая охватывает несколько боковых экранов (например, экраны с вкладками), должна анимироваться при переходах.

Переход масштабирование (Zoom) может быть использован для достижения этой цели. Обратите внимание, что так как выход и вход анимации запускаются одновременно, мы используем `enterDelay`, чтобы разрешить исходящим кнопкам плавающего действия анимироваться постепенно.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
