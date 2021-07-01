---
title: Компонент React Typography
components: Typography
githubLabel: 'component: Typography'
materialDesign: https://material.io/design/typography/the-type-system.html
---

# Typography

<p class="description">Используйте оформление для максимально четкого и эффективного представления своего дизайна и содержания.</p>

Слишком много типов размеров и стилей одновременно могут портить любой макет. [Типографический масштаб](https://material.io/design/typography/#type-scale) имеет ограниченный набор размеров типов, которые хорошо работают вместе с макетной сеткой.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Основное

The *Roboto* font will **not** be automatically loaded by Material-UI. You are responsible for loading any fonts used in your application. Есть несколько простых способов начать использование шрифта Roboto. Для более продвинутой конфигурации ознакомьтесь с [разделом настроек темы](/customization/typography/).

## Шрифт Roboto через CDN

Ниже показан пример HTML-разметки, используемой для загрузки шрифта Roboto с CDN:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Установка используя npm

Вы можете [установить его](https://www.npmjs.com/package/@fontsource/roboto) набрав команду ниже в терминале:

`npm install @fontsource/roboto`

Затем вы можете импортировать его в вашу точку входа.

```js
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

For more info check out [Fontsource](https://github.com/DecliningLotus/fontsource/blob/master/packages/roboto/README.md).

Fontsource может быть настроен на загрузку определенных подмножеств, жирности и стилей. Стандартная конфигурация оформления в стиле Material-UI зависит только от жирности шрифта: 300, 400, 500 и 700.

## Компоненты

The Typography component makes it easy to apply a default set of font weights and sizes in your application.

{{"demo": "pages/components/typography/Types.js"}}

## Темы

В некоторых ситуациях вы не сможете использовать компонент `Typography`. Надеемся, что вы сможете воспользоваться ключами свойства темы [`typograpthy`](/customization/default-theme/?expand-path=$.typography).

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## Изменение семантического элемента

The Typography component uses the `variantMapping` property to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element.

- You can change the underlying element for a one time occasion with the `component` property:

```jsx
{/* There is already an h1 in the page, let's not duplicate it. */}
<Typography variant="h1" component="h2">
  h1. */}
<Typography variant="h1" component="h2">
  h1.
```

- Вы можете изменить сопоставление вариантов [глобально используя тему](/customization/theme-components/#default-props):

```js
const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
```

## Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. See the [Adding & disabling variants](/customization/typography/#adding-amp-disabling-variants) example for more info.

## System props

As a CSS utility component, the `Typography` supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Typography mt={2}>
```

## Доступность

Несколько ключевых факторов для доступности оформления:

- **Цвет**. Предоставьте достаточный уровень контраста между текстом и его фоном, проверьте минимально рекомендованное [WCAG 2.0 цветовое соотношение контраста](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Размер шрифта**. Используйте [относительные единицы (rem)](/customization/typography/#font-size) для соответствия настройкам пользователя.
- **Иерархия заголовков**. [Не пропускайте](https://www.w3.org/WAI/tutorials/page-structure/headings/) уровни заголовков. Чтобы решить эту задачу, вам нужно [отделить семантику от стиля](#changing-the-semantic-element).
