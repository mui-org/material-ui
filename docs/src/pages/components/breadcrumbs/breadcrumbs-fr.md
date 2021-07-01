---
title: Composant React Breadcrumbs
components: Breadcrumbs, Link, Typography
githubLabel: 'component: Breadcrumbs'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#breadcrumb'
---

# Breadcrumbs (Fil d'Ariane)

<p class="description">Le fil d'Ariane permet aux utilisateurs d’effectuer des sélections dans une plage de valeurs.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Fil d'Ariane simple

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Dernier fil d'Ariane actif

Garder le dernier fil d'ariane interactif.

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## Séparateur personnalisé

Dans les exemples qui suivent, nous utilisons deux chaînes de caractère et une icône SVG comme séparateurs.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Fil d'Ariane avec icônes

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Fil d'Ariane contracté

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Fil d'Ariane personnalisé

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Intégration avec react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

Assurez-vous d'ajouter l'attribut `aria-label` sur le composant `Breadcrumbs`.

L'accessibilité de ce composant repose sur les points suivants :

- La liste des liens est structurée en utilisant une liste ordonnée (balise `<ol>`).
- Afin de prévenir la lecture des séparateurs par les lecteurs d'écran, ils sont cachés en utilisant l'attribut `aria-hidden`.
- Un élément HTML `nav` avec l'attribut `aria-label` identifie la structure comme étant un fil d'Ariane et en fait un repère de navigation facile à trouver.
