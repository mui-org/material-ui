---
title: Composant React Image List
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel: 'component: ImageList'
---

# Liste d'images

<p class="description">Les listes d'images affichent une collection d'images dans une grille organisée.</p>

Les listes d'images représentent une collection d'éléments dans un motif répété. Ils aident à améliorer la compréhension visuelle du contenu qu'ils contiennent.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Liste d'images standard

Les listes d'images standard sont idéales pour les éléments d'égale importance. Ils ont une taille, un rapport et un espacement de conteneur uniformes.

{{"demo": "pages/components/image-list/StandardImageList.js"}}

## Liste d'images matelassées

Les listes d'images matelassées mettent en valeur certains éléments par rapport à d'autres dans une collection. Ils créent une hiérarchie en utilisant des tailles et des ratios de conteneurs variés.

{{"demo": "pages/components/image-list/QuiltedImageList.js"}}

## Liste d'images tissées

Les listes d'images tissées utilisent des ratios de conteneurs alternés pour créer une mise en page rythmique. Une liste d'images tissées est idéale pour parcourir le contenu des pairs.

{{"demo": "pages/components/image-list/WovenImageList.js"}}

## Liste d'images avancée

Les listes d'images avancées utilisent des hauteurs de conteneurs de taille dynamique qui reflètent le rapport hauteur/largeur de chaque image. Cette liste d'images est mieux utilisée pour parcourir le contenu de pairs non rogné.

{{"demo": "pages/components/image-list/MasonryImageList.js"}}

## Liste d'images avec barres de titre

Cet exemple illustre l'utilisation de `ImageListItemBar` pour ajouter une superposition à chaque `ImageListItem`. La superposition peut accueillir un `titre`, `sous - titre` et une action secondaire - dans cet exemple un `IconButton`.

{{"demo": "pages/components/image-list/TitlebarImageList.js"}}

### Barre de titre sous l'image (standard)

La barre de titre peut être placée sous l'image.

{{"demo": "pages/components/image-list/TitlebarBelowImageList.js"}}

### Barre de titre sous l'image (avancé)

{{"demo": "pages/components/image-list/TitlebarBelowMasonryImageList.js"}}

## Liste d'images personnalisée

Dans cet exemple, les éléments ont une barre de titre personnalisée, positionnée en haut et avec un dégradé `titleBackground` personnalisé. L'action secondaire `IconButton` est positionnée sur la gauche. La prop `gap` est utilisée pour ajuster l'écart entre les éléments.

{{"demo": "pages/components/image-list/CustomImageList.js", "defaultCodeOpen": false}}
