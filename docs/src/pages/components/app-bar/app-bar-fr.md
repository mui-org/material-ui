---
title: Composant React de barre d'application
components: AppBar, Toolbar, Menu
githubLabel: 'component: AppBar'
materialDesign: https://material.io/components/app-bars-top
---

# App Bar (Barre d'application)

<p class="description">La barre d'application affiche des informations et des actions relatives à l'écran actuel.</p>

[La barre d'application](https://material.io/design/components/app-bars-top.html) de la page fournit le contenu et les actions liés à l'écran actuel. Elle est utilisée pour le marquage, les titres d'écran, la navigation et les actions.

Il peut être utilisé en tant que barre d'action contextuel ou en tant que barre de navigation.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Barre d'application simple

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## Barre d'application avec champ de recherche principal

Une barre de recherche principale.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## Barre d'application avec menu

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## Barre d'application avec champ de recherche

Une barre de recherche latérale.

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## Dense (bureau uniquement)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## Barre plus importante

Barre d'application étendu.

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## Barre inférieure

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## Emplacement fixe

Quand vous rendez la barre d'application en position fixe, les dimensions de l'élément n'impact pas le reste de page. Cela peut rendre certaine partie de votre contenu invisible, caché derrière la barre d'application. Voici 3 solutions possible:

1. Vous pouvez utiliser `position="sticky"` au lieu de `position="fixed"`. ⚠️ sticky n'est pas supporté par IE11.
2. Vous pouvez rendre un deuxième composant `<Toolbar />` :

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. Vous pouvez utiliser `theme.mixins.toolbar` CSS:

```jsx
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  )
};
```

## Défilement

Vous pouvez utiliser le `useScrollTrigger()` hook pour répondre au défilement déclencher par l'utilisateur.

### Barre d'application masquable

La barre d'application est caché lorsque l'utilisateur défile vers le bas de page lui conférant plus d'espace de lecture.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### Barre d'application élevable

La barre d'application s'élève lorsque l'utilisateur fait défiler la page pour lui indiquer qu'il n'est plus au début de la page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### Retour au sommet

Au défilement un bouton d'action flottant apparaît pour faciliter le retour au sommet de la page.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### Paramètres

1. `options` (*Object* [optional]):

   - `options.disableHysteresis` (*Boolean* [optional]): Valeur par défaut `false`. Désactive l'hystérésis. Ignore le sens de défilement lors de la détermination de la valeur `trigger`.
   - `options.target` (_Nœud_ [optionnel]) : Valeur par défaut `window`.
   - `options.threshold` (*Nombre* [optional]): Valeur par défaut `100`. Modifier la valeur de `déclenchement` quand lorsque le défilement vertical dépasse strictement ce seuil (exclusif).

#### Valeur de retour

`trigger`: Est-ce que la position de défilement respecte les critères ?

#### Exemples

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```

## Enable Color on Dark

Following the [Material Design guidelines](https://material.io/design/color/dark-theme.html), the `color` prop has no effect on the appearance of the AppBar in dark mode. You can override this behavior by setting the `enableColorOnDark` prop to `true`.

```jsx
// Specific element via prop
<AppBar enableColorOnDark />

// Affect all AppBars via theme
<ThemeProvider
  theme={createTheme({
    components: {
      MuiAppBar: {
        defaultProps: {
          enableColorOnDark: true,
        },
      },
    },
  })}
>
  <AppBar />
</ThemeProvider>
```
