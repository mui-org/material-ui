---
title: App Bar React-Komponente
components: AppBar, Toolbar, Menu
githubLabel: 'component: AppBar'
materialDesign: https://material.io/components/app-bars-top
---

# App Bar

<p class="description">In der App-Bar werden Informationen und Aktionen angezeigt, die sich auf den aktuellen Bildschirm beziehen.</p>

Die [obere App-Bar](https://material.io/design/components/app-bars-top.html) liefert Inhalte und Aktionen auf dem aktuellen Bildschirm. It's used for branding, screen titles, navigation, and actions.

It can transform into a contextual action bar or be used as a navbar.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Einfache App-Bar

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## App-Bar mit einem Hauptsuchfeld

Eine primäre Suchleiste.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## App-Bar mit Menü

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## App-Bar mit Suchfeld

Ein seitliches Suchfeld.

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## Kompakt (nur für Desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## Prominent

A prominent app bar.

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## Untere App-Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. You can use `position="sticky"` instead of fixed. ⚠️ sticky is not supported by IE11.
2. You can render a second `<Toolbar />` component:

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

3. You can use `theme.mixins.toolbar` CSS:

```jsx
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Offset />
    </React.Fragment>
  );
}
```

## Scrollen

Der Hook `useScrollTrigger()` kann verwendet werden, um auf Scrollen des Benutzers zu reagieren.

### App-Bar verstecken

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### App-Bar anheben

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### Zurück nach oben

Beim Scrollen erscheint ein schwebender Button, um einfach wieder zum Seitenanfang zu gelangen.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### Parameter

1. `options` (_object_ [optional]):

   - `options.disableHysteresis` (_bool_ [optional]): Defaults to `false`. Hysterese deaktivieren. Die Bildlaufrichtung wird beim Bestimmen des `trigger`-Werts ignoriert.
   - `options.target` (*Node* [optional]): Standardwert `window`.
   - `options.threshold` (*number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll strictly crosses this threshold (exclusive).

#### Rückgabewerte

`trigger`: Entspricht die Bildlaufposition den Kriterien?

#### Beispiele

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
