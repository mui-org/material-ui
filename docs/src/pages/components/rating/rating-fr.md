---
title: Composant d'évaluation de réaction
components: Rating (Notation)
githubLabel: 'component: Rating'
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
---

# Rating (Notation)

<p class="description">Les évaluations donnent un aperçu des opinions et des expériences des autres et peuvent permettre à l'utilisateur de soumettre sa propre évaluation.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Évaluation de base

{{"demo": "pages/components/rating/BasicRating.js"}}

## Précision de notation

The rating can display any float number with the `value` prop. Use the `precision` prop to define the minimum increment value change allowed.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Hover feedback

Vous pouvez afficher une étiquette au survol pour aider l'utilisateur à choisir la bonne valeur d'évaluation. The demo uses the `onChangeActive` prop.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Tailles

Pour des notes plus grandes ou plus petites, utilisez la propriété `size`.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Évaluation personnalisée

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

{{"demo": "pages/components/rating/CustomizedRating.js"}}

## RadioGroup

The rating is implemented with a radio group, set `highlightSelectedOnly` to restore the natural behavior.

L'accessibilité de ce composant repose sur les points suivants :

## Accessibilité

([Tutoriel WAI](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

L'accessibilité de ce composant repose sur les points suivants :

- Un groupe radio avec ses champs visuellement cachés. Il contient six boutons radio, un pour chaque étoile et un autre pour 0 étoile coché par défaut. Assurez-vous de fournir une valeur pour la propriété `name` qui est unique au formulaire parent.
- Libellés des boutons radio contenant du texte réel (« 1 étoile », « 2 étoiles », …). Assurez-vous de fournir une fonction appropriée à la prop `getLabelText` lorsque la page est dans une langue autre que l'anglais. Vous pouvez utiliser les [locales incluses](https://material-ui.com/guides/localization/) ou fournir les vôtres.
- Une apparence visuellement distincte pour les icônes de notation. Par défaut, le composant d'évaluation utilise à la fois une différence de couleur et de forme (icônes pleines et vides) pour indiquer la valeur. Dans le cas où vous utilisez la couleur comme seul moyen d'indiquer la valeur, les informations doivent également être affichées sous forme de texte, comme dans cette démo. Ceci est important pour correspondre au [critère de réussite 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) des WCAG2.1.

{{"demo": "pages/components/rating/TextRating.js"}}

### ARIA

La note en lecture seule a un rôle de "img", et une aria-label qui décrit la note affichée.

### Clavier

Étant donné que le composant d'évaluation utilise des boutons radio, l'interaction du clavier suit le comportement natif du navigateur. L'onglet se concentrera sur la note actuelle et les touches de curseur contrôlent la note sélectionnée.

La note en lecture seule n'est pas focalisable.
