# Palette

<p class="description">In der Palette können Sie die Farbe der Komponenten an Ihre Marke anpassen.</p>

## Palette colors

The theme exposes the following palette colors (accessible under `theme.palette.`):

- *primary* - used to represent primary interface elements for a user. It's the color displayed most frequently across your app's screens and components.
- *secondary* - used to represent secondary interface elements for a user. It provides more ways to accent and distinguish your product. Having it is optional.
- *error* - used to represent interface elements that the user should be made aware of.
- *warning* - used to represent potentially dangerous actions or important messages.
- *info* - used to present information to the user that is neutral and not necessarily important.
- *success* - used to indicate the successful completion of an action that user triggered.

If you want to learn more about color, you can check out [the color section](/customization/color/).

## Default values

You can explore the default values of the palette using [the theme explorer](/customization/default-theme/?expand-path=$.palette) or by opening the dev tools console on this page (`window.theme.palette`).

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline", "hideToolbar": true}}

Die Standardpalette verwendet die mit `A` (`A200` usw.) gekennzeichneten Schattierungen für die sekundäre Intention, und die nicht vorangestellten Farben für die anderen Intentionen.

## Individuelle Anpassung

You may override the default palette values by including a palette object as part of your theme. If any of the:

- [`.palette.primary`](/customization/default-theme/?expand-path=$.palette.primary)
- [`.palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary)
- [`.palette.error`](/customization/default-theme/?expand-path=$.palette.error)
- [`.palette.warning`](/customization/default-theme/?expand-path=$.palette.warning)
- [`.palette.info`](/customization/default-theme/?expand-path=$.palette.info)
- [`.palette.success`](/customization/default-theme/?expand-path=$.palette.success)

palette color objects are provided, they will replace the defaults.

The palette color value can either be a [color](/customization/color/#2014-material-design-color-palettes) object, or an object with one or more of the keys specified by the following TypeScript interface:

```ts
interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
```

### Verwenden eines Farbobjekts

Die einfachste Möglichkeit, eine Absicht anzupassen, besteht darin, eine oder mehrere der angegebenen Farben zu importieren und auf eine Palettenabsicht anzuwenden:

```js
import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createTheme({
  palette: {
    primary: blue,
  },
});
```

### Die Farben direkt zur Verfügung stellen

Wenn Sie mehr benutzerdefinierte Farben bereitstellen möchten, können Sie entweder ein eigenes Farbobjekt erstellen oder Farben für einige oder alle Schlüssel der Absichten direkt angeben:

```js
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    tonalOffset: 0.2,
  },
});
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    tonalOffset: 0.2,
  },
});
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // Zum Beispiel von Red 500 zu Red 300 oder Red 700 zu wechseln.
```

As in the example above, if the intention object contains custom colors using any of the "main", "light", "dark" or "contrastText" keys, these map as follows:

- If the "dark" and / or "light" keys are omitted, their value(s) will be calculated from "main", according to the "tonalOffset" value.
- If "contrastText" is omitted, its value will be calculated to contrast with "main", according to the "contrastThreshold" value.

Both the "tonalOffset" and "contrastThreshold" values may be customized as needed. The "tonalOffset" value can either be a number between 0 and 1, which will apply to both light and dark variants, or an object with light and dark variants specified by the following TypeScript type:

```ts
type PaletteTonalOffset = number | {
  light: number;
  dark: number;
};
```

A higher value for "tonalOffset" will make calculated values for "light" lighter, and "dark" darker. A higher value for "contrastThreshold" increases the point at which a background color is considered light, and given a dark "contrastText".

Note that "contrastThreshold" follows a non-linear curve.

### Beispiel

{{"demo": "pages/customization/palette/Palette.js", "defaultCodeOpen": true}}

### Adding new colors

You can add new colors inside and outside the palette of the theme as follow:

```js
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

<!-- tested with packages/material-ui/test/typescript/augmentation/paletteColors.spec.ts -->

```ts
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'],
    }
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color']
    }
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
```

{{"demo": "pages/customization/palette/CustomColor.js"}}

## Picking colors

Etwas Inspiration gefällig? The Material Design team has built an [palette configuration tool](/customization/color/#picking-colors) to help you.

## Dark mode

Material-UI comes with two palette modes: light (the default) and dark. You can make the theme dark by setting `mode: 'dark'`.

```js
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
```

While it's only a single value change, the `createTheme` helper modifies several palette values. The colors modified by the palette mode are the following:

{{"demo": "pages/customization/palette/DarkTheme.js", "bg": "inline", "hideToolbar": true}}

### Toggling color mode

You can use the React context to toggle the mode with a button inside your page.

{{"demo": "pages/customization/palette/ToggleColorMode.js", "defaultCodeOpen": false}}

### System preference

Users might have specified a preference for a light or dark theme. The method by which the user expresses their preference can vary. It might be a system-wide setting exposed by the Operating System, or a setting controlled by the User Agent.

You can leverage this preference dynamically with the [useMediaQuery](/components/use-media-query/) hook and the [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query.

For instance, you can enable the dark mode automatically:

```jsx
import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}
```
