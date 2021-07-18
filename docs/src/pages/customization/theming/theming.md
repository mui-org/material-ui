# Theming

<p class="description">Customize Material-UI with your theme. You can change the colors, the typography and much more.</p>

The theme specifies the color of the components, darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.

Themes let you apply a consistent tone to your app. It allows you to **customize all design aspects** of your project in order to meet the specific needs of your business or brand.

To promote greater consistency between apps, light and dark theme types are available to choose from. By default, components use the light theme type.

## Theme provider

If you wish to customize the theme, you need to use the `ThemeProvider` component in order to inject a theme into your application.
However, this is optional; Material-UI components come with a default theme.

`ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize.
You can learn more about this in [the API section](/styles/api/#themeprovider).

## Theme configuration variables

Changing the theme configuration variables is the most effective way to match Material-UI to your needs.
The following sections cover the most important theme variables:

- [`.palette`](/customization/palette/)
- [`.typography`](/customization/typography/)
- [`.spacing`](/customization/spacing/)
- [`.breakpoints`](/customization/breakpoints/)
- [`.zIndex`](/customization/z-index/)
- [`.transitions`](/customization/transitions/)
- [`.components`](/customization/theme-components/)

You can check out the [default theme section](/customization/default-theme/) to view the default theme in full.

### Custom variables

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider), it can be convenient to add additional variables to the theme so you can use them everywhere.
For instance:

```jsx
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```tsx
declare module '@material-ui/core/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
```

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Theme builder

<video autoPlay muted loop width="320">
  <source src="/static/studies.mp4" type="video/mp4" >
</video>

The community has built great tools to build a theme:

- [mui-theme-creator](https://bareynol.github.io/mui-theme-creator/): A tool to help design and customize themes for the Material-UI component library. Includes basic site templates to show various components and how they are affected by the theme
- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): Is an online tool for creating Material-UI themes via Material Design Color Tool.
- [Material palette generator](https://material.io/inline-tools/color/): The Material palette generator can be used to generate a palette for any color you input.

## Accessing the theme in a component

You [can access](/styles/advanced/#accessing-the-theme-in-a-component) the theme variables inside your React components.

## Nesting the theme

[You can nest](/styles/advanced/#theme-nesting) multiple theme providers.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

The inner theme will **override** the outer theme.
You can extend the outer theme by providing a function:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

**A note on performance**

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes.
The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `createTheme(options, ...args) => theme`

Generate a theme base on the options received.

#### Arguments

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### Returns

`theme` (_object_): A complete, ready-to-use theme object.

#### Examples

```js
import { createTheme } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Arguments

1. `theme` (_object_): The theme object to enhance.
2. `options` (_object_ [optional]):

- `breakpoints` (_array\<string\>_ [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (_bool_ [optional]): Default to `false`. Whether font sizes change slightly so line
  heights are preserved and align to Material Design's 4px line height grid.
  This requires a unitless line height in the theme's styles.
- `factor` (_number_ [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens.
  The lower the value, the bigger font sizes for small screens. The value must be greater than 1.
- `variants` (_array\<string\>_ [optional]): Default to all. The typography variants to handle.

#### Returns

`theme` (_object_): The new theme with a responsive typography.

#### Examples

```js
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Currently `unstable_createMuiStrictModeTheme` adds no additional requirements.

#### Arguments

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### Returns

`theme` (_object_): A complete, ready to use theme object.

#### Examples

```js
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>
  );
}
```
