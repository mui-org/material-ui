---
title: Composant React Badge
components: Badge, BadgeUnstyled
githubLabel: 'component: Badge'
---

# Badge

<p class="description">Le badge génère un petit badge en haut à droite de son enfant.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Badges Basique

Exemples de badges contenant du texte, utilisant les couleurs primaires et secondaires. Le badge est appliqué aux enfants.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Badges personnalisés

Voici un exemple de personnalisation du composant. Vous pouvez en apprendre plus à ce sujet dans la [page de documentation](/customization/how-to-customize/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Visibilité du badge

La visibilité des badges peut être contrôlée à l'aide de la propriété `invisible`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

Le badge se cache automatiquement quand badgeContent est null. Vous pouvez la remplacer avec la propriété `showZero`.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Valeur maximale

Vous pouvez utiliser la propriété `max` pour limiter la valeur du contenu du badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge à points

La propriété `dot` change un badge en petit point. Cela peut être utilisé comme une notification que quelque chose a changé sans donner de compte.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Chevauchement des badges

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Alignement du badge

Vous pouvez utiliser le prop `anchorOrigin` pour déplacer le badge dans n'importe quel coin de l'élément enveloppé.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideToolbar": true}}

## Unstyled

The badge also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import BadgeUnstyled from '@material-ui/unstyled/BadgeUnstyled';
```

{{"demo": "pages/components/badges/UnstyledBadge.js"}}

## Accessibilité

You can't rely on the content of the badge to be announced correctly. You should provide a full description, for instance, with `aria-label`:

{{"demo": "pages/components/badges/AccessibleBadges.js"}}
