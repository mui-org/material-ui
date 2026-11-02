# Typography

<p class="description">The theme provides a set of type sizes that work well together, and also with the layout grid.</p>

## Font family

You can change the font family with the `theme.typography.fontFamily` property.

For instance, this example uses the system font instead of the default Roboto font:

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

To self-host fonts, download the font files in the `woff2` format and import them into your code.

:::warning
This requires that you have a plugin or loader in your build process that can handle loading `woff2` files. Fonts will _not_ be embedded within your bundle. They will be loaded from your webserver instead of a CDN.
:::

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';
```

Next, you need to change the theme to use this new font.
In order to globally define Raleway as a font face, the [`CssBaseline`](/material-ui/react-css-baseline/) component can be used (or any other CSS solution of your choice).

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
          src: local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ fontFamily: 'Raleway' }}>Raleway</Box>
  </ThemeProvider>
);
```

Note that if you want to add additional `@font-face` declarations, you need to use the string CSS template syntax for adding style overrides, so that the previously defined `@font-face` declarations won't be replaced.

## Font size

Material UI uses `rem` units for the font size.
The browser `<html>` element default font size is `16px`, but browsers have an option to change this value,
so `rem` units allow us to accommodate the user's settings, resulting in a better accessibility support.
Users change font size settings for all kinds of reasons, from poor eyesight to choosing optimum settings
for devices that can be vastly different in size and viewing distance.

To change the font-size of Material UI you can provide a `fontSize` property.
The default value is `14px`.

```js
const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});
```

The computed font size by the browser follows this mathematical equation:

<div class="only-light-mode">
  <img alt="font size calculation" style="width: 550px; display: block;" src="/static/images/font-size.svg" width="436" height="48" />
</div>
<div class="only-dark-mode">
  <img alt="font size calculation" style="width: 550px; display: block;" src="/static/images/font-size-dark.svg" width="436" height="48" />
</div>

<!-- https://latex.codecogs.com/svg.latex?\dpi{200}&space;\text{computed}&space;=&space;\text{specification}\cdot\frac{\text{typography.fontSize}}{14}\cdot\frac{\text{html&space;fontsize}}{\text{typography.htmlFontSize}} -->

### Responsive font sizes

The `theme.typography.*` [variant](#variants) properties map directly to the generated CSS.
You can use [media queries](/material-ui/customization/breakpoints/#api) inside them:

```js
const baseTheme = createTheme();

const theme = createTheme({
  typography: {
    h3: {
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      [baseTheme.breakpoints.up('md')]: {
        fontSize: '2.4rem',
      },
    },
  },
});
```

{{"component": "file://./demos/custom-responsive-font-sizes/index.ts"}}

To automate this setup, you can use the [`responsiveFontSizes()`](/material-ui/customization/theming/#responsivefontsizes-theme-options-theme) helper to make Typography font sizes in the theme responsive.

{{"component": "file://./demos/responsive-font-sizes-chart/index.ts", "hideToolbar": true}}

You can see this in action in the example below. Adjust your browser's window size, and notice how the font size changes as the width crosses the different [breakpoints](/material-ui/customization/breakpoints/):

```js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

{{"component": "file://./demos/responsive-font-sizes/index.ts"}}

### Fluid font sizes

To be done: [#15251](https://github.com/mui/material-ui/issues/15251).

### HTML font size

You might want to change the `<html>` element default font size. For instance, when using the [10px simplification](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/).

:::warning
Changing the font size can harm accessibility ♿️. Most browsers agree on the default size of 16px, but the user can change it. For instance, someone with an impaired vision could set their browser's default font size to something larger.
:::

The `theme.typography.htmlFontSize` property is provided for this use case,
which tells Material UI what the font-size on the `<html>` element is.
This is used to adjust the `rem` value so the calculated font-size always match the specification.

```js
const theme = createTheme({
  typography: {
    // Tell Material UI what the font-size on the html element is.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

You need to apply the above CSS on the HTML element of this page to see the below demo rendered correctly.

{{"component": "file://./demos/font-size-theme/index.ts"}}

## Variants

The typography object comes with [13 variants](/material-ui/react-typography/#component) by default:

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

{{"component": "file://./demos/variants/index.ts"}}

## Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. Here is what you need to do:

**Step 1. Update the theme's typography object**

The code snippet below adds a custom variant to the theme called `poster`, and removes the default `h3` variant:

```js
const theme = createTheme({
  typography: {
    poster: {
      fontSize: '4rem',
      color: 'red',
    },
    // Disable h3 variant
    h3: undefined,
  },
});
```

**Step 2. (Optional) Set the default semantic element for your new variant**

At this point, you can already use the new `poster` variant, which will render a `<span>` by default with your custom styles.
Sometimes you may want to default to a different HTML element for semantic purposes, or to replace the inline `<span>` with a block-level element for styling purposes.

To do this, update the `variantMapping` prop of the `Typography` component globally, at the theme level:

```js
const theme = createTheme({
  typography: {
    poster: {
      fontSize: 64,
      color: 'red',
    },
    // Disable h3 variant
    h3: undefined,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the new variant to render a <h1> by default
          poster: 'h1',
        },
      },
    },
  },
});
```

**Step 3. Update the necessary typings (if you are using TypeScript)**

:::info
If you aren't using TypeScript you should skip this step.
:::

You need to make sure that the typings for the theme's `typography` variants and the `Typography`'s `variant` prop reflects the new set of variants.

<!-- Tested with packages/mui-material/test/typescript/augmentation/typographyVariants.spec.ts -->

```ts
declare module '@mui/material/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}
```

**Step 4. You can now use the new variant**

{{"component": "file://./demos/custom-variant/index.ts", "hideToolbar": true}}

```jsx
<Typography variant="poster">poster</Typography>;

/* This variant is no longer supported. If you are using TypeScript it will give an error */
<Typography variant="h3">h3</Typography>;
```

## Default values

You can explore the default values of the typography using [the theme explorer](/material-ui/customization/default-theme/?expand-path=$.typography) or by opening the dev tools console on this page (`window.theme.typography`).
