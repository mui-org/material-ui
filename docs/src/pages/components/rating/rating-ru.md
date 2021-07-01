---
title: Компонент React Rating
components: Rating
githubLabel: 'component: Rating'
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
---

# Rating

<p class="description">Рейтинги дают представление о мнении и опыте других и позволяют пользователю дать собственную оценку.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Базовый рейтинг

{{"demo": "pages/components/rating/BasicRating.js"}}

## Точность рейтинга

The rating can display any float number with the `value` prop. Use the `precision` prop to define the minimum increment value change allowed.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Hover feedback

Вы можете показать lable при наведении курсора, чтобы помочь пользователю выбрать правильное значение рейтинга. The demo uses the `onChangeActive` prop.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Размеры

Для больших или меньших рейтингов используйте prop `size`.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Настраиваемые кнопки

Ниже находятся примеры кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/rating/CustomizedRating.js"}}

## Radio group

The rating is implemented with a radio group, set `highlightSelectedOnly` to restore the natural behavior.

{{"demo": "pages/components/rating/RadioGroupRating.js"}}

## Доступность

([WAI Учебник](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

Доступность этого компонента зависит от:

- Скрыта ли визуально группа radio-кнопок. Rating содержит шесть radio-кнопок, по одному для каждой звёздочки, а ещё одна для 0 звёзд, которые проверяются по умолчанию. Не забудьте предоставить значение для prop `name`, который уникален для родительской формы.
- Labels for the radio buttons containing actual text (“1 Star”, “2 Stars”, …). Be sure to provide a suitable function to the `getLabelText` prop when the page is in a language other than English. You can use the [included locales](https://material-ui.com/guides/localization/), or provide your own.
- A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons) to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo. This is important to match [success Criterion 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) of WCAG2.1.

{{"demo": "pages/components/rating/TextRating.js"}}

### ARIA

The read only rating has a role of "img", and an aria-label that describes the displayed rating.

### Keyboard

Because the rating component uses radio buttons, keyboard interaction follows the native browser behavior. Tab will focus the current rating, and cursor keys control the selected rating.

The read only rating is not focusable.
