---
title: Composant React Stepper
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
githubLabel: 'component: Stepper'
materialDesign: https://material.io/archive/guidelines/components/steppers.html
---

# Stepper

<p class="description">Steppers convey progress through numbered steps. It provides a wizard-like workflow.</p>

Les Steppers affichent la progression à travers une séquence d'étapes logiques et numérotées. They may also be used for navigation. Steppers may display a transient feedback message after a step is saved.

- **Types d’étapes**: Modifiable, Non éditable, Mobile, Optionnel
- **Types d'etapes**: Horizontal, vertical, linéaire, non linéaire

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **Note:** les Steppers ne seront plus documenté dans le [Material Design guidelines](https://material.io/), mais Material-UI continue le support.

## Stepper horizontale

Les Steppers horizontales sont idéelles lorsque le contenu d'une étape dépend d'une étape antérieure.

Évitez d'utiliser des noms d'étapes longues dans les étapes horizontales.

### Barre de progression linéaire

Un Steper linéaire permet à l'utilisateur de compléter les étapes en séquence.

La `Stepper` peut être contrôlée en passant l'indice d'étape actuel (basé sur zéro) en tant que propriété `activeStep`. L'orientation de `Stepper` est définie à l'aide de la prop `orientation`.

Cet exemple montre également l'utilisation d'une Stepper facultative en plaçant la prop `optional` sur le deuxième composant `Step`. Note that it's up to you to manage when an optional step is skipped. Once you've determined this for a particular step you must set `completed={false}` to signify that even though the active step index has gone beyond the optional step, it's not actually complete.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js"}}

### Non-linear

Les steppers non linéaires permettent à l'utilisateur d'entrer un flux multi-étapes à n'importe quel moment.

Cet exemple est similaire à la stepper horizontale normale, excepté les étapes ne sont plus automatiquement définies à `disabled={true}` en se basant sur la prop `activeStep`.

The use of the `StepButton` here demonstrates clickable step labels, as well as setting the `completed` flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to determine when all steps are completed (or even if they need to be completed).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js"}}

### Libellé alternatif

Labels can be placed below the step icon by setting the `alternativeLabel` prop on the `Stepper` component.

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js"}}

### Étape d'erreur

{{"demo": "pages/components/steppers/HorizontalStepperWithError.js"}}

### Étape horizontale personnalisée

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

{{"demo": "pages/components/steppers/CustomizedSteppers.js"}}

## Stepper verticale

Les Steppers verticaux sont conçus pour les tailles d’écran étroites. Elles sont idéales pour les mobiles. Toutes les fonctionnalités de Stepper horizontale peuvent être implémentées.

{{"demo": "pages/components/steppers/VerticalLinearStepper.js"}}

### Perfomance

Le contenu d'un Stepper est démonté lorsqu'il est fermé. Si vous devez rendre le contenu disponible pour les moteurs de recherche ou afficher des arborescences de composants longs dans votre modal tout en optimisant la réactivité des interactions il peut être judicieux de modifier ce comportement par défaut en passant la propriété `keepMounted` :

```jsx
<StepContent TransitionProps={{ unmountOnExit: false }} />
```

## Stepper de mobile

This component implements a compact stepper suitable for a mobile device. Il a plus de fonctionnalités limitées que le Stepper vertical. See [mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps) for its inspiration.

Le Stepper mobile prend en charge trois variantes pour afficher la progression à travers les étapes disponibles : text, dots, et progress.

### Text

L'étape actuelle et le nombre total d'étapes sont affichés sous forme de texte.

{{"demo": "pages/components/steppers/TextMobileStepper.js", "bg": true}}

### Texte avec effet de carrousel

Cette démo utilise [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) pour créer un carrousel.

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js", "bg": true}}

### Dots

Utilisez des points lorsque le nombre d'étape est petit.

{{"demo": "pages/components/steppers/DotsMobileStepper.js", "bg": true}}

### Barres de progression

Use a progress bar when there are many steps, or if there are steps that need to be inserted during the process (based on responses to earlier steps).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js", "bg": true}}
