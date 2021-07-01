# Typografie

<p class="description">Das Theme bietet eine Anzahl von Schriftgrößen, die gut zusammen mit dem Layoutraster funktionieren.</p>

## Schriftfamilie

You can change the font family with the `theme.typography.fontFamily` property.

For instance, this demo uses the system font instead of the default Roboto font:

```js
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

### Self-hosted fonts

Um Schriftarten selbst zu hosten, laden Sie diese als `ttf`, `woff` und/oder `woff2` herunter und importieren Sie diese in Ihren Code.

⚠️ Voraussetzung dafür ist, dass Sie in Ihrem Build-Prozess ein Plugin oder Loader haben, dass das Laden von `ttf`, `woff` und `woff2` Datein ermöglicht. Schriftarten werden _nicht _ in deinen Bundle eingebettet sein. Sie werden von Ihrem Webserver anstelle von CDN geladen.

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';
```

Next, you need to change the theme to use this new font. In order to globally define Raleway as a font face, the [`CssBaseline`](/components/css-baseline/) component can be used (or any other CSS solution of your choice).

```jsx
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: "local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2')";
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
        }
      `,
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        fontFamily: 'Raleway',
      }}
    >
      Raleway
    </Box>
  </ThemeProvider>
);
```

Note that if you want to add additional `@font-face` declarations, you need to use the string CSS template syntax for adding style overrides, so that the previosly defined `@font-face` declarations won't be replaced.

## Schriftgröße

Material-UI verwendet `rem` Einheiten für die Schriftgröße. The browser `<html>` element default font size is `16px`, but browsers have an option to change this value, so `rem` units allow us to accommodate the user's settings, resulting in a better accessibility support. Benutzer ändern Schriftgröße aus alle Arten von Gründen, von Sehschwäche bis zu optimalen Einstellungen für Geräte, die sehr unterschiedlich in Größe und Betrachtungsabstand sein können.

Um die Schriftgröße der Material-UI zu ändern, können Sie eine `fontSize` Eigenschaft angeben. Der Standardwert ist `14px`.

```js
const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});
```

Die vom Browser berechnete Schriftgröße folgt dieser mathematischen Gleichung:

<img src="/static/images/font-size.png" alt="font size calculation" style="width: 458px;" />

<!-- https://latex.codecogs.com/png.latex?\dpi{200}&space;\text{computed}&space;=&space;\text{specification}\cdot\frac{\text{typography.fontSize}}{14}\cdot\frac{\text{html&space;fontsize}}{\text{typography.htmlFontSize}} -->

### Responsive Schriftgrößen

Die Eigenschaften der Typografievarianten werden direkt dem generierten CSS zugeordnet. Sie können in ihnen [Medienabfragen](/customization/breakpoints/#api) verwenden:

```js
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
```

{{"demo": "pages/customization/typography/CustomResponsiveFontSizes.js"}}

Um dieses Setup zu automatisieren, können Sie die Funktion [`responsiveFontSizes()`](/customization/theming/#responsivefontsizes-theme-options-theme) Helfer verwenden, um die Schriftgrößen der Typografie im Design ansprechend zu gestalten.

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideToolbar": true}}

Sie können dies in dem folgenden Beispiel in Aktion sehen. Adjust your browser's window size, and notice how the font size changes as the width crosses the different [breakpoints](/customization/breakpoints/):

```js
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

### Fließende Schriftgrößen

Noch zu tun: [#15251](https://github.com/mui-org/material-ui/issues/15251).

### HTML-Schriftgröße

Möglicherweise möchten Sie die Standardschriftgröße des `<html>` Elements ändern. Zum Beispiel bei der Verwendung der [10px-Vereinfachung](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/).

> ⚠️ Changing the font size can harm accessibility ♿️. ⚠️ Changing the font size can harm accessibility ♿️. For instance, someone with an impaired vision could have set their browser's default font size to something larger.

An `htmlFontSize` theme property is provided for this use case, which tells Material-UI what the font-size on the `<html>` element is. This is used to adjust the `rem` value so the calculated font-size always match the specification.

```js
const theme = createTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

_Sie müssen das obige CSS auf das HTML-Element dieser Seite anwenden, um die unten stehende Demo korrekt anzuzeigen_

{{"demo": "pages/customization/typography/FontSizeTheme.js"}}

## Varianten

The typography object comes with [13 variants](/components/typography/#component) by default:

- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- subtitle2
- body1
- body2
- button
- caption
- overline

Each of these variants can be customized individually:

```js
const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
```

{{"demo": "pages/customization/typography/TypographyVariants.js"}}

## Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. Here is what you need to do:

**Step 1. Update the theme's typography object**

```js
const theme = createTheme({
  typography: {
    poster: {
      color: 'red',
    },
    // Disable h3 variant
    h3: undefined,
  },
});
```

**Step 2. Update the necessary typings (if you are using TypeScript)**

> If you aren't using TypeScript you should skip this step.

You need to make sure that the typings for the theme's `typography` variants and the `Typography`'s `variant` prop reflects the new set of variants.

<!-- Tested with packages/material-ui/test/typescript/augmentation/typographyVariants.spec.ts -->

```ts
declare module '@material-ui/core/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@material-ui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}
```

**Step 3. You can now use the new variant**

{{"demo": "pages/customization/typography/TypographyCustomVariant.js", "hideToolbar": true}}

```jsx
<Typography variant="poster">poster</Typography>;

/* This variant is no longer supported */
<Typography variant="h3">h3</Typography>;
```

## Default values

You can explore the default values of the typography using [the theme explorer](/customization/default-theme/?expand-path=$.typography) or by opening the dev tools console on this page (`window.theme.typography`).
