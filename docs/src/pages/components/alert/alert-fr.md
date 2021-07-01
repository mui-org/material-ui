---
title: Composant React Alerte
components: Alert, AlertTitle
githubLabel: 'component: Alert'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#alert'
---

# Alert

<p class="description">Une alerte affiche un message court et important d'une manière qui attire l'attention de l'utilisateur sans interrompre sa tâche.</p>

**Remarque :** Ce composant n'est pas documenté dans les [consignes de Material Design](https://material.io/), mais Material-UI le supporte.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Alertes simples

L'alerte offre quatre niveaux de sévérité qui définissent une icône et une couleur distinctes.

{{"demo": "pages/components/alert/BasicAlerts.js"}}

## Description

Vous pouvez utiliser le composant `AlertTitle` pour afficher un titre formaté au-dessus du contenu.

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## Actions

Une alerte peut avoir une action, comme un bouton de fermeture ou d'annulation. Il est affiché après le message, à la fin de l'alerte.

Si une fonction de rappel `onClose` est fournie et qu'aucune propriété `action` n'est définie, une icône de fermeture s'affiche. La propriété `action` peut être utilisée pour fournir une action alternative, par exemple en utilisant un `Button` ou un `IconButton`.

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### Transition

Vous pouvez utiliser un [composant de transition](/components/transitions/) tel que `Collapse` pour faire la transition de l'apparence de l'alerte.

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Icônes

La propriété `icon` vous permet d'ajouter une icône au début du composant d'alerte. Cela remplacera l'icône par défaut pour la sévérité spécifiée.

Vous pouvez changer la sévérité par défaut pour le mapping d'icône avec la propriété `iconMapping`. Cela peut être défini globalement en utilisant la [personnalisation du thème](/customization/theme-components/#default-props).

Définir la propriété `icon` à `false` supprimera complètement l'icône.

{{"demo": "pages/components/alert/IconAlerts.js"}}

## Variants

Deux variantes supplémentaires sont disponibles – `outlined` et `filled` :

### Outlined

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### Filled

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## Toast

Vous pouvez utiliser la `Snackbar` pour [afficher un toast](/components/snackbars/#customized-snackbars) avec l'alerte.

## Couleur

La propriété `color` remplacera la couleur par défaut pour la sévérité spécifiée.

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

Lorsque le composant est affiché dynamiquement, le contenu est automatiquement annoncé par la plupart des lecteurs d'écran. À l'heure actuelle, les lecteurs d'écran n'informent pas les utilisateurs des alertes présentes lors du chargement de la page.

L'utilisation de la couleur pour ajouter de la signification ne fournit qu'une indication visuelle qui ne sera pas transmise aux utilisateurs de technologies d'assistance telles que les lecteurs d'écran. Assurez-vous que les informations indiquées par la couleur sont soit évidentes à partir du contenu lui-même (par exemple le texte visible), ou est inclus par d'autres moyens, tels que le texte caché supplémentaire.

Les actions doivent avoir un index de tabulation de 0 pour être accessibles aux utilisateurs utilisant uniquement le clavier.
