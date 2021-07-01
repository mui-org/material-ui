---
title: Componente de Avatar de React
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: Avatar'
---

# Avatar

<p class="description">Los avatares se pueden encontrar a lo largo de todo Material Design con usos en todo desde tablas hasta diálogos de menús.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Avatares de Imágenes

Las imágenes de avatar pueden ser creadas pasándoles las propiedades estándar de `img`, `src` o `srcSet` al componente.

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Avatares de Letras

Los avatares que contengan carácteres simples pueden ser creados pasándoles un string como `children`.

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

You can use different background colors for the avatar. The following demo generates the color based on the name of the person.

{{"demo": "pages/components/avatars/BackgroundLetterAvatars.js"}}

## Tamaños

Puedes cambiar el tamaño del avatar con las propiedades de CSS `height` y `width`.

{{"demo": "pages/components/avatars/SizeAvatars.js"}}

## Avatares de iconos

Los avatares de íconos son creados pasando un ícono como `children`.

{{"demo": "pages/components/avatars/IconAvatars.js"}}

## Variantes

Si necesitas avatares cuadrados o redondeados, utiliza la prop `variant`.

{{"demo": "pages/components/avatars/VariantAvatars.js"}}

## Fallbacks

Si hay un error cargando la imagen del avatar, el componente recurre a una alternativa en el siguiente orden:

- los componentes hijos proporcionados
- la primera letra del texto `alt`
- una imagen de avatar generica

{{"demo": "pages/components/avatars/FallbackAvatars.js"}}

## Agrupado

`AvatarGroup` renderiza sus componentes hijos como una pila.

{{"demo": "pages/components/avatars/GroupAvatars.js"}}

## Con Badge

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}
