---
title: Composant React de navigation inférieure
components: BottomNavigation, BottomNavigationAction
githubLabel: 'component: BottomNavigation'
materialDesign: https://material.io/components/bottom-navigation
---

# Bottom Navigation (Barre de navigation inférieure)

<p class="description">Les barres de navigation inférieures permettent de se déplacer entre les destinations principales dans une application.</p>

La barre de navigation inférieure affiche de de trois à cinq destinations en bas de l'écran. Chaque destination est représentée par une icône et une étiquette de texte optionnelle. Lorsqu'une icône de navigation en bas de page est enfoncée, l'utilisateur est dirigé vers la destination de navigation de niveau supérieur associée à cette icône.</p> 

{{"component": "modules/components/ComponentLinkHeader.js"}}



## Bottom Navigation (Barre de navigation inférieure)

Si il y a **quatre** ou **cinq** actions, affichage inactif points de vue uniquement sous forme d'icônes.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}



## Navigation du bas sans étiquette

S'il y a **quatre actions** ou **cinq actions** , les vues inactives sont affichées uniquement sous forme d'icônes.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}



## Position fixe

Cette démo maintient la navigation de bas en bas, peu importe la quantité de contenu à l'écran.

{{"demo": "pages/components/bottom-navigation/FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}



## Bibliothèque de routage tierce

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `BottomNavigationAction` component provides the `component` prop to handle this use case. Here is a [more detailed guide](/guides/routing).
