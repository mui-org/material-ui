---
title: React Badge Komponente
components: Badge, BadgeUnstyled
githubLabel: 'component: Badge'
---

# Badge

<p class="description">Badge generiert ein kleines Abzeichen an der oberen rechten Ecke seiner Kinder.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Einfaches Abzeichen

Beispiele für Text Badges in Primär- und Sekundärfarben. The badge is applied to its children.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Benutzerdefinierte Badges

Hier ist ein Beispiel zum Anpassen der Komponente. Weitere Informationen hierzu finden Sie auf der [Dokumentationsseite zu Overrides](/customization/how-to-customize/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Badge Sichtbarkeit

Die Sichtbarkeit von Badges kann über die Eigenschaft `invisible` gesteuert werden.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

The badge auto hides with badgeContent is zero. Sie können dies mit der Eigenschaft `showZero` überschreiben.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Maximaler Wert

Sie können die Eigenschaft `max` verwenden, um den Wert des Badge-Inhalts zu begrenzen.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot badge

Die Eigenschaft `dot` verwandelt ein Badge in einen kleinen Punkt. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Badge overlap

Du kannst dieser `overlap`, um das Badge relativ zur Ecke des umschlossenen Elements zu platzieren.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Badge alignment

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideToolbar": true}}

## Unstyled

The badge also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import BadgeUnstyled from '@material-ui/unstyled/BadgeUnstyled';
```

{{"demo": "pages/components/badges/UnstyledBadge.js"}}

## Barrierefreiheit

You can't rely on the content of the badge to be announced correctly. You should provide a full description, for instance, with `aria-label`:

{{"demo": "pages/components/badges/AccessibleBadges.js"}}
