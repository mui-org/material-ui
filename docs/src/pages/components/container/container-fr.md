---
title: Composant React Container
components: Container (Conteneur)
githubLabel: 'component: Container'
---

# Container (Conteneur)

<p class="description">Le conteneur centralise votre contenu horizontalement. C'est l'élément de mise en page le plus basique.</p>

Bien que les conteneurs puissent être imbriqués, la plupart des mises en page ne nécessitent pas de conteneur imbriqué.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Fluid

La largeur d'un conteneur fluid (pleine largeure) est limitée par la valeur de la propriété `maxWidth`.

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## Fixe

Si vous préférez concevoir pour un ensemble fixe de tailles au lieu d'essayer de vous adapter à un viewport fluid (pleine largeure), vous pouvez définir la propriété `fixed`. La largeur maximale correspond à la largeur minimale du point d'arrêt actuel.

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```
