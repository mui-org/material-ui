---
title: Composant React Divider
components: Divider
githubLabel: 'component: Divider'
materialDesign: https://material.io/components/dividers
---

# Divider

<p class="description">Un diviseur est une ligne mince qui regroupe le contenu dans des listes et des mises en page.</p>

[Diviseurs](https://material.io/design/components/dividers.html) séparer le contenu en groupes clairs.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Liste diviseurs

Par défaut, le diviseur est rendu comme un `<hr>`. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Spécification HTML5

Dans une liste, vous devez vous assurer que le `Divider` est rendu en tant que `<li>` pour correspondre à la spécification HTML5. Les exemples ci-dessous montrent deux manières d'y parvenir.

## Encart De Diviseurs

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Sous-En-Tête Diviseurs

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Diviseurs moyens

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Diviseurs avec texte

Vous pouvez également rendre un séparateur avec le contenu.

{{"demo": "pages/components/dividers/DividerText.js"}}

## Séparateurs verticaux

Vous pouvez également rendre un séparateur verticalement en utilisant la propriété `orientation`.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}

> Notez l'utilisation de l'accessoire `flexItem` pour accueillir le conteneur flex.

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "pages/components/dividers/VerticalDividerMiddle.js", "bg": true}}

### Vertical avec texte

Vous pouvez également rendre un séparateur avec le contenu.

{{"demo": "pages/components/dividers/VerticalDividerText.js"}}
