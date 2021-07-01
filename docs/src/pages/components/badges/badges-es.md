---
title: React Badge component
components: Badge, BadgeUnstyled
githubLabel: 'component: Badge'
---

# Badge

<p class="description">El componente Badge genera un pequeño badge en la esquina superior derecha de su(s) hijo(s).</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Badges básicos

Ejemplos de insignias que contienen texto, utilizando colores primarios y secundarios. La insignia se aplica a sus hijos.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Placas personalizadas

He aquí un ejemplo de personalización del componente. Puedes aprender más sobre esto en la [sección Personalizando Componentes de la documentación](/customization/how-to-customize/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Visibilidad del Badge

Usted puede usar la propiedad `overlap` para establecer el Badge relativo a la esquina del elemento envuelto.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

El badge se oculta automáticamente con `badgeContent` igual a cero. Usted puede sobrescribir esto con la propiedad `showZero`.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Valor máximo

Usted puede usar la propiedad `max` para establecer el valor máximo que puede contener el Badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge de punto

La propiedad `dot` cambia el badge a un pequeño punto. Esto se puede usar como una notificación de que algo ha cambiado sin contar.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Superposición del Badge

Usted puede usar la propiedad `anchorOrigin` para mover el Badge a cualquier esquina del elemento envuelto.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Alineación del Badge

Puede usar la propiedad `overlap` para colocar la insignia relativa a la esquina del elemento envuelto.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideToolbar": true}}

## Unstyled

The badge also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import BadgeUnstyled from '@material-ui/unstyled/BadgeUnstyled';
```

{{"demo": "pages/components/badges/UnstyledBadge.js"}}

## Accesibilidad

You can't rely on the content of the badge to be announced correctly. You should provide a full description, for instance, with `aria-label`:

{{"demo": "pages/components/badges/AccessibleBadges.js"}}
