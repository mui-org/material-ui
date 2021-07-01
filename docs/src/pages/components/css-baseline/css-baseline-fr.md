---
components: CssBaseline, ScopedCssBaseline
githubLabel: 'component: CssBaseline'
---

# Principes CSS

<p class="description">Material-UI fournit un composant CssBaseline pour relancer une base élégante, cohérente et simple sur laquelle s'appuyer.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Réinitialisation globale

Vous êtes peut-être familier avec [normalize.css](https://github.com/necolas/normalize.css), une collection d'éléments HTML et de normalisations de styles.

```jsx
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MonApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* Le reste de votre application */}
    </React.Fragment>
  );
}

```

## Scope sur les enfants

Cependant, vous pourriez migrer progressivement un site Web vers Material-UI, utiliser une réinitialisation globale pourrait ne pas être une option. Il est possible d'appliquer la ligne de base uniquement aux enfants en utilisant le composant `ScopedCssBaseline`.

```jsx
import * as React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import MyApp from './MyApp';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* The rest of your application */}
      <MyApp />
    </ScopedCssBaseline>
  );
}
```

⚠ Assurez-vous d'abord d'importer `ScopedCssBaseline` pour éviter les conflits de taille de boîte comme dans l'exemple ci-dessus.

## Approche

### Page

Les éléments `<html>` et `<body>` sont mis à jour pour fournir de meilleurs paramètres par défaut à l'échelle de la page. Plus spécifiquement:

- La marge dans tous les navigateurs est supprimée.
- La couleur d'arrière-plan par défaut de Material Design est appliquée. Ceci est réalisé à l'aide de [`thème.la palette.arrière-plan.par défaut`](/customization/default-theme/?expand-path=$.palette.background) pour les appareils standard et un fond blanc pour les périphériques d'impression.

### Disposition

- la taille de la boîte `box-sizing` est définie globalement sur l'élément `<html>` à `border-box`. Chaque élément, y compris `* :: before` et `* :: after` est déclaré hériter de cette propriété, ce qui garantit que la largeur déclarée de l'élément n'est jamais dépassée en raison d'un remplissage ou d'une bordure.

### Barres de défilement

In dark mode, the colors of the scrollbars are customized to provide a better contrast. Add this code to your theme (for dark mode).

```jsx
import darkScrollbar from '@material-ui/core/darkScrollbar';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: theme.palette.mode === 'dark' ? darkScrollbar() : null,
      },
    },
  },
});
```

This website uses `darkScrollbar` when dark mode is enabled. Be aware, however, that using this utility (and customizing `-webkit-scrollbar`) forces MacOS to always show the scrollbar.

### Typographie

- Aucune taille de police de base n’est déclarée sur le `<html>`, mais 16px est utilisée (valeur par défaut du navigateur). Vous pouvez en apprendre davantage sur les implications de l' évolution du `<html>` taille de la police par défaut dans [la documentation abordant les thèmes](/customization/typography/#typography-html-font-size) page.
- Définit le style `theme.typography.body2` sur l'élément `<body>`.
- Définit le poids de police à `theme.typography.fontWeightBold` pour les éléments `<b>` et `<strong>`.
- Le lissage de police personnalisé est activé pour un meilleur affichage de la police Roboto.

## Personnalisation

Rendez-vous à la section [de personnalisation globale](/customization/how-to-customize/#5-global-css-override) de la documentation pour modifier la sortie de ces composants.
