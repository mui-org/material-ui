---
title: React Avatar Komponente
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: Avatar'
---

# Avatar

<p class="description">Avatare sind im gesamten Material Design zu finden und werden in allen Bereichen von Tabellen bis hin zu Dialogmenüs verwendet.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Bild-Avatare

Bild-Avatare können erstellt werden, indem reguläre `img` props `src` oder `srcSet` an die Komponente übergeben werden.

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Buchstaben-Avatare

Avatars containing simple characters can be created by passing a string as `children`.

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

You can use different background colors for the avatar. The following demo generates the color based on the name of the person.

{{"demo": "pages/components/avatars/BackgroundLetterAvatars.js"}}

## Größen

Die Größe des Avatars kann mit den `height`- und `width`-CSS-Eigenschaften verändert werden.

{{"demo": "pages/components/avatars/SizeAvatars.js"}}

## Icon-Avatare

Icon-Avatare werden erstellt, indem man ein Icon als `children` übergibt.

{{"demo": "pages/components/avatars/IconAvatars.js"}}

## Varianten

If you need square or rounded avatars, use the `variant` prop.

{{"demo": "pages/components/avatars/VariantAvatars.js"}}

## Fallbacks

If there is an error loading the avatar image, the component falls back to an alternative in the following order:

- die mitgegebenen children
- den ersten Buchstaben des `alt`-Textes
- ein generisches Avatar-Symbol

{{"demo": "pages/components/avatars/FallbackAvatars.js"}}

## Grouped

`AvatarGroup` renders its children as a stack.

{{"demo": "pages/components/avatars/GroupAvatars.js"}}

## Mit Badge

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}
