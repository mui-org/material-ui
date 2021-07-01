---
title: Composant React Card
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'component: Card'
materialDesign: https://material.io/components/cards
---

# Card (carte)

<p class="description">Les cartes contiennent du contenu et des actions sur un seul sujet.</p>

Les cartes sont des surfaces qui affichent le contenu et des actions sur un seul sujet.

Ils devraient être faciles à analyser pour trouver des informations pertinentes et réalisables. Les éléments, comme le texte et les images, doivent être placés sur eux d'une manière qui indique clairement la hiérarchie.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Carte simple

Bien que les cartes puissent prendre en charge plusieurs actions, des contrôles de l'interface utilisateur et un menu de dépassement, utilisez la retenue et rappelez-vous que les cartes sont des points d'entrée pour des informations plus complexes et détaillées.

{{"demo": "pages/components/cards/SimpleCard.js", "bg": true}}

### Cartes encadrées

Définissez `variant="outlined"` pour afficher une carte encadrée.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## Interaction complexe

Sur le bureau, le contenu de la carte peut s’étendre. (Cliquez sur le chevron vers le bas pour voir la recette.)

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Média

Exemple de carte utilisant une image pour renforcer le contenu.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

Par défaut, nous utilisons la combinaison d'un élément `<div>` et *background-image* pour afficher le support. Cela peut être problématique dans certaines situations. Par exemple, vous voudrez peut-être afficher une vidéo ou une image sensible. Utilisez la propriété `component` pour ces cas d'utilisation:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠ Quand `component="img"`, CardMedia s'appuie sur `objet-fit` pour centrer l'image. Ce n'est pas supporté par IE11.

## Action principale

Une carte  permet souvent  aux utilisateurs d'interagir avec l'intégralité de sa surface pour déclencher son action principale, que ce soit une extension, un lien vers un autre écran ou un autre comportement. La zone d'action de la carte peut être spécifiée en enveloppant son contenu dans un composant `CardActionArea`.

{{"demo": "pages/components/cards/ActionAreaCard.js", "bg": true}}

Une carte peut également offrir des actions supplémentaires qui devraient être détachées du domaine d'action principal afin d'éviter les chevauchements d'événements.

{{"demo": "pages/components/cards/MultiActionAreaCard.js", "bg": true}}

## Contrôles d'UI

Les actions supplémentaires au sein de la carte sont explicitement appelées à l'aide d'icônes, de texte et de contrôles d'interface utilisateur, généralement placés au bas de la carte.

Voici un exemple de carte de contrôle multimédia.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}

## Personnalisation

🎨 Si vous cherchez de l'inspiration, vous pouvez consulter les [exemples de personnalisation de MUI Treasury](https://mui-treasury.com/components/card).
