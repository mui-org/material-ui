---
title: 'Componente React: App Bar'
components: AppBar, Toolbar, Menu
githubLabel: 'component: AppBar'
materialDesign: https://material.io/components/app-bars-top
---

# App Bar

<p class="description">La App Bar muestra información y acciones relacionadas con la pantalla actual.</p>

La [top App Bar](https://material.io/design/components/app-bars-top.html) provee contenido y acciones relacionados a la pantalla actual. It's used for branding, screen titles, navigation, and actions.

Se puede transformar en una barra de acción contextual o usarse como una barra de navegación.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## App Bar Simple

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## App Bar con un campo de búsqueda principal

Un campo de búsqueda principal.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## App Bar con menú

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## App Bar con campo de búsqueda

Un campo de búsqueda al costado.

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## Denso (sólo escritorio)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## Prominente

Un App Bar prominente.

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## App bar en pie de página

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## Posición Fija

Cuando muestra la posición de la barra de App Bar fija, la dimensión de los elementos no tiene impacto sobre el resto de la página. Esto puede causar que alguna parte de su contenido no sea visible, detrás del App Bar. Aquí hay 3 posibles soluciones:

1. Puedes usar `position = "sticky"` en lugar de fijo. ⚠️ sticky is not supported by IE11.
2. Puedes renderizar un segundo componente `<Toolbar />`:

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

3. Puede usar `theme.mixins.toolbar` CSS:

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

## Desplazamiento

Puede usar el `useScrollTrigger ()` para responder a las acciones de desplazamiento del usuario.

### Ocultar App bar

La barra de aplicaciones se oculta al desplazarse hacia abajo para dejar más espacio para leer.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### Elevar App Bar

La barra de la aplicación se eleva al desplazarse para comunicar que el usuario no está en la parte superior de la página.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### Ir arriba

Aparece un botón de acción flotante al desplazarse para que sea fácil volver a la parte superior de la página.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### Argumentos

1. `options` (*Object* [optional]):

   - `options.disableHysteresis` (*Boolean* [optional]): Default `false`. Desactiva la histéresis. Ignora la dirección de desplazamiento cuando determina el valor del `trigger`.
   - `options.target` (*Node* [optional]): Default `window`.
   - `options.threshold` (*Number* [optional]): Default `100`. Cambia el valor de `trigger` cuando el desplazamiento vertical cruza estrictamente este umbral (exclusivo).

#### Regresa

`trigger`: ¿La posición de desplazamiento coincide con los criterios?

#### Ejemplos

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hola</div>
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
