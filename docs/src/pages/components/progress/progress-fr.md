---
title: Circular, Linear progress React components
components: CircularProgress, LinearProgress
githubLabel: 'component: CircularProgress'
materialDesign: '<a href="https://material.io/design/components/progress-indicators.html#linear-progress-indicators">Linear progress</a> indicators.'
---

# Barres de progression

<p class="description">Les indicateurs de progression, plus connus sous le nom de spinners, expriment un temps d'attente non spécifié ou affichent la durée d'un processus.</p>

Les [Indicateurs de progression](https://material.io/design/components/progress-indicators.html) informent les utilisateurs de l'état des processus en cours, tels que le chargement d'une application, la soumission d'un formulaire ou la progression des mises à jour.

- Les indicateurs **déterminés** indiquent la durée d'une opération.
- **Indeterminate** circular indicators grow and shrink in size while moving along the invisible track.

Les animations des composants s'appuient sur CSS autant que possible pour fonctionner avant même que le JavaScript soit chargé.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Circular

### Circulaire indéterminée

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Circular color

{{"demo": "pages/components/progress/CircularColor.js"}}

### Circulaire déterminée

{{"demo": "pages/components/progress/CircularDeterminate.js"}}

### Interactive integration

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### Circular with label

{{"demo": "pages/components/progress/CircularWithValueLabel.js"}}

## Barre de progression linéaire

### Linéaire indéterminée

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### Linear color

{{"demo": "pages/components/progress/LinearColor.js"}}

### Linéaire déterminée

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### Linear buffer

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### Linear with label

{{"demo": "pages/components/progress/LinearWithValueLabel.js"}}

## Non-standard ranges

The progress components accept a value in the range 0 - 100. This simplifies things for screen-reader users, where these are the default min / max values. Sometimes, however, you might be working with a data source where the values fall outside this range. Here's how you can easily transform a value in any range to a scale of 0 - 100:

```jsx
// MIN = Minimum expected value
// MAX = Maximium expected value
// Function to normalise the values (MIN / MAX could be integrated)
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

// Example component that utilizes the `normalise` function at the point of render.
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## Barres de progression personnalisée

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

{{"demo": "pages/components/progress/CustomizedProgressBars.js", "defaultCodeOpen": false}}

## Retarder l'apparition

Il y a [3 limites importantes](https://www.nngroup.com/articles/response-times-3-important-limits/) à connaître sur les temps de réponse. The ripple effect of the `ButtonBase` component ensures that the user feels that the system is reacting instantaneously. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second. After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted.

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## Limites

### Charge CPU élevée

Under heavy load, you might lose the stroke dash animation or see random CircularProgress ring widths. You should run processor intensive operations in a web worker or by batch in order not to block the main rendering thread.

![heavy load](/static/images/progress/heavy-load.gif)

When it's not possible, you can leverage the `disableShrink` property to mitigate the issue. See [this issue](https://github.com/mui-org/material-ui/issues/10327).

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}

### Mises à jour haute fréquence

Le `LinearProgress` utilise une transition sur la propriété de transformation CSS pour fournir une mise à jour lisse entre différentes valeurs. La durée de transition par défaut est de 200ms. Dans le cas où le composant parent met à jour la propriété `value` trop rapidement, vous aurez au moins un délai de 200ms entre le rendu (affichage) et la barre de progression complètement mise à jour.

Si vous devez effectuer 30 affichages par seconde ou plus, nous vous recommandons de désactiver la transition :

```css
.MuiLinearProgress-bar {
  transition: none;
}
```

### IE11

The circular progress component animation on IE11 is degraded. L'animation du tableau de bord des traits ne fonctionne pas (équivalent à `disableShrink`) et à l'animation circulaire. Vous pouvez résoudre ce dernier avec :

```css
.MuiCircularProgress-indeterminate {
  animation: circular-rotate 1.4s linear infinite;
}

@keyframes circular-rotate {
  0% {
    transform: rotate(0deg);
    /* Fix IE11 wobbly */
    transform-origin: 50% 50%;
  }
  100% {
    transform: rotate(360deg);
  }
}
```
