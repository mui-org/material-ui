---
components: CssBaseline, ScopedCssBaseline
githubLabel: 'component: CssBaseline'
---

# Base de CSS

<p class="description">Material-UI provee un componente llamado CssBaseline como un punto de partida elegante, simple y consistente para empezar a desarrollar.</p>

[La función de estilo de la paleta](/system/palette/).

## Global reset

Tal vez tengas familiaridad con [normalize.css](https://github.com/necolas/normalize.css), una colección de atributos de estilos normalizados para elementos HTML.

```jsx
Reinicio global
```

## Scoping on children

However, you might be progressively migrating a website to Material-UI, using a global reset might not be an option. It's possible to apply the baseline only to the children by using the `ScopedCssBaseline` component.

```jsx
import * as React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import MyApp from './MyApp';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* El resto de tu aplicación */}
      <MyApp />
    </ScopedCssBaseline>
  );
}
```

⚠️ Make sure you import `ScopedCssBaseline` first to avoid box-sizing conflicts as in the above example.

## Enfoque

### Página

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- Se elimina el margen en todos los navegadores.
- Se aplica el color de fondo predeterminado de Material Design. Utiliza [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) para dispositivos estándares y un fondo blanco para dispositivos de impresión.

### Disposición

- La propiedad `box-sizing` se establece globalmente en el elemento `<html>` con el valor `border-box`. Cada elemento, incluyendo `*::before` y `*::after`, es declarado para heredar ésta propiedad, la cual asegura que el ancho declarado del elemento nunca sea excedido gracias al relleno o al borde.

### Scrollbars

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

### Tipografía

- No se declara ningún tamaño de fuente de base en el elemento `<html>`, pero se asume 16px (el valor predeterminado del navegador). Puedes aprender más acerca de las implicaciones de cambiar el tamaño de fuente predeterminado de `<html>`, en la página [de documentación del tema](/customization/typography/#typography-html-font-size).
- Set the `theme.typography.body2` style on the `<body>` element.
- Set the font-weight to `theme.typography.fontWeightBold` for the `<b>` and `<strong>` elements.
- Custom font-smoothing is enabled for better display of the Roboto font.

## Personalización

Head to the [global customization](/customization/how-to-customize/#5-global-css-override) section of the documentation to change the output of these components.
