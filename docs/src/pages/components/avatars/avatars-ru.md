---
title: Компонент React Avatar
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: Avatar'
---

# Avatar

<p class="description">Аватары встречаются в material design и используются во всем - от таблиц до диалоговых меню.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Аватары изображений

Аватары можно создать, передав стандартные свойства компонента `img`, такие как `src` или `srcSet`.

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Буквенные аватары

Аватары, содержащие простые символы, можно создать, передав вашу строку как `children`.

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

Вы можете использовать другие фоновые цвета для аватара The following demo generates the color based on the name of the person.

{{"demo": "pages/components/avatars/BackgroundLetterAvatars.js"}}

## Размеры

Вы можете изменить размер аватара используя `height` и `width` свойств CSS.

{{"demo": "pages/components/avatars/SizeAvatars.js"}}

## Иконочные аватары

Аватары значков создаются путем передачи значка как `children`.

{{"demo": "pages/components/avatars/IconAvatars.js"}}

## Variants

Если вам нужны квадратные или округлые аватары, используйте проп `variant`.

{{"demo": "pages/components/avatars/VariantAvatars.js"}}

## Запасные варианты

Если при загрузке изображения аватара возникает ошибка, компонент возвращается к альтернативному варианту в следующем порядке:

- the provided children
- the first letter of the `alt` text
- a generic avatar icon

{{"demo": "pages/components/avatars/FallbackAvatars.js"}}

## Сгруппированные

`AvatarGroup` отображает дочерние элементы в виде стека.

{{"demo": "pages/components/avatars/GroupAvatars.js"}}

## Со значком

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}
