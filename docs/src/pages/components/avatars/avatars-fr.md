---
title: Composant React Avatar
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: Avatar'
---

# Avatar

<p class="description">Les avatars se trouvent tout au long material-design avec des utilisations dans tout, des tables aux menus de dialogue.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Avatars de l'image

Les avatars d'image peuvent être créés en passant le standard `img` props `src` ou `srcSet` au composant.

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Lettre avatars

Les avatars contenant des caractères simples peuvent être créés en passant une chaîne en tant que `children`.

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

You can use different background colors for the avatar. The following demo generates the color based on the name of the person.

{{"demo": "pages/components/avatars/BackgroundLetterAvatars.js"}}

## Tailles

Vous pouvez modifier la taille de l'avatar avec les propriétés CSS `height` et `width`.

{{"demo": "pages/components/avatars/SizeAvatars.js"}}

## Avatars d'icônes

Les avatars d'icônes sont créés en transmettant une icône à `children`.

{{"demo": "pages/components/avatars/IconAvatars.js"}}

## Variants

Si vous avez besoin d'avatars carrés ou arrondis, utilisez la prop `variant`.

{{"demo": "pages/components/avatars/VariantAvatars.js"}}

## Fallbacks

S'il y a une erreur lors du chargement de l'image d'avatar, le composant retombe vers une alternative dans l'ordre suivant :

- les children fournis
- la première lettre du texte `alt`
- une icône générique d'avatar

{{"demo": "pages/components/avatars/FallbackAvatars.js"}}

## Groupé

`L'avatarGroup` rend ses enfants comme une pile.

{{"demo": "pages/components/avatars/GroupAvatars.js"}}

## Avec badge

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}
