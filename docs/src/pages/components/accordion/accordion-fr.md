---
title: Composant React Accordéon
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: Accordion'
materialDesign: https://material.io/archive/guidelines/components/expansion-panels.html
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#accordion'
---

# Accordéon (Panneau d'extension)

<p class="description">L'accordéon contient le flux de création et permet la modification légère de ses éléments.</p>

Un [panneau d'extension](https://material.io/archive/guidelines/components/expansion-panels.html) est un conteneur léger pouvant être autonome ou connecté à une surface plus grande, telle qu'une carte.

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **Note:** Le panneau d'expansion n'est plus documenté dans le [Material Design guidelines](https://material.io/), mais Material-UI continue le support. Il était précédemment connus sous le nom de panneau d'expansion.

## Panneau d'extension simple

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Accordéon contrôlé

Étendez le comportement du panneau par défaut pour créer un accordéon avec le composant `Accordion`.

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Accordéon personnalisé

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Performances

Le contenu de l'accordéon est monter par défaut et se même si l'accordéon n'est pas ouvert. Se comportement à le "server-side rendrering" et le SEO comme objectif. Si vous devez rendre un lourd composant au niveau des détails de l'accordéon ou simplement rendre plusieurs accordéons, il serait une bonne idée de changer le comportement par défaut en activant le `unmountOnExit` dans le prop `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Se n'est tout de même pas une solution miracle. Soyez sure de d'abord identifier les goulot d'étranglement et ensuite de considérer ses stratégies d'optimisation.

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Pour une accessibilité optimal nous recommandons le paramètre `id` et `aria-controls` sur le `AccordionsSummary`.  `Accordion` générera les nécessaires `aria-labelledby` et `id` pour le contenu régional de l'accordéon.
