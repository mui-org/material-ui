---
title: Компонент React Divider
components: Divider
githubLabel: 'component: Divider'
materialDesign: https://material.io/components/dividers
---

# Divider

<p class="description">Разделитель - это тонкая линия, которая группирует содержимое (контент) в списки и макеты (слои).</p>

[Разелители](https://material.io/design/components/dividers.html) делят содержимое (контент) на явные (четкие) группы.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Разделители списков

The divider renders as an `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Спецификации HTML5

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification. The examples below show two ways of achieving this.

## Вкладыш

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Подтитульные разделители

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Центральные разделители

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

You can also render a divider with content.

{{"demo": "pages/components/dividers/DividerText.js"}}

## Divider (разделитель)

You can also render a divider vertically using the `orientation` prop.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}

> Note the use of the `flexItem` prop to accommodate for the flex container.

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "pages/components/dividers/VerticalDividerMiddle.js", "bg": true}}

### Вертикальный с текстом

You can also render a vertical divider with content.

{{"demo": "pages/components/dividers/VerticalDividerText.js"}}
