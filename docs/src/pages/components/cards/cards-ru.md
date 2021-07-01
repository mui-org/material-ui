---
title: Компонент React Card
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'component: Card'
materialDesign: https://material.io/components/cards
---

# Card (карточка)

<p class="description">Карточки содержат контент и действия, относящиеся к одной теме.</p>

[Карточки](https://material.io/design/components/cards.html) - это поверхности, которые отображают контент и действия относящиеся к одной теме / объекту.

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic card

Несмотря на то, что на карточках можно располагать несколько действий, элементы управления и выпадающие меню, будьте сдержаны и помните, что карточки - это входные точки для более сложной и детальной информации.

{{"demo": "pages/components/cards/BasicCard.js", "bg": true}}

### Outlined Card

Set `variant="outlined"` to render an outlined card.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## Сложное взаимодействие

В варианте для десктопа контент карточки может расширяться. (Click the downward chevron to view the recipe.)

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Медиа

Пример карточки, использующей изображение, дополняющее контент.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

По умолчанию мы используем комбинацию `<div>` элемента и *background image* для отображения медиа. Это может быть проблематично в некоторых ситуациях. Например, вам может понадобиться отобразить видео или адаптивное изображение. Используйте свойство `component` для этих случаев:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ When `component="img"`, CardMedia relies on `object-fit` for centering the image. Не поддерживается в IE11.

## Primary action

Часто карта позволяет пользователям взаимодействовать со всей ее поверхностью, чтобы вызвать ее основное действие, будь то расширение, ссылка на другой экран или какое-либо другое поведение. The action area of the card can be specified by wrapping its contents in a `CardActionArea` component.

{{"demo": "pages/components/cards/ActionAreaCard.js", "bg": true}}

A card can also offer supplemental actions which should stand detached from the main action area in order to avoid event overlap.

{{"demo": "pages/components/cards/MultiActionAreaCard.js", "bg": true}}

## Элементы управления

Все доступные в пределах карточки дополнительные действия следует явно изображать с помощью иконок, текста и других элементов управления, обычно размещаемых в нижней части карточки.

Вот пример карточки с элементами управления мультимедиа.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}

## Кастомизация

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/card).
