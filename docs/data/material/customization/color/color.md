# Color

<p class="description">Convey meaning through color. Out of the box you get access to all colors in the Material Design guidelines.</p>

The Material Design [color system](https://m2.material.io/design/color/) can be used to create a color theme that reflects your brand or style.

## Picking colors

### Official color tool

The Material Design team has also built an awesome palette configuration tool: [material.io/resources/color/](https://m2.material.io/inline-tools/color/).
This can help you create a color palette for your UI, as well as measure the accessibility level of any color combination.

<a href="https://m2.material.io/inline-tools/color/" target="_blank" rel="noopener nofollow" class="remove-link-arrow">
  <img src="/static/images/color/colorTool.png" alt="Official color tool" style="width: 574px" width="1148" height="610" />
</a>
<br />
<br />

The output can be fed into `createTheme()` function:

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
```

### Playground

To test a [material.io/design/color](https://m2.material.io/design/color/) color scheme with the Material UI documentation, simply select colors using the palette and sliders below.
Alternatively, you can enter hex values in the Primary and Secondary text fields.

{{"component": "file://./demos/tool/index.ts", "hideToolbar": true, "bg": true}}

The output shown in the color sample can be pasted directly into a [`createTheme()`](/material-ui/customization/theming/#createtheme-options-args-theme) function (to be used with [`ThemeProvider`](/material-ui/customization/theming/#theme-provider)):

```jsx
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});
```

Only the `main` shades need to be provided (unless you wish to further customize `light`, `dark` or `contrastText`), as the other colors will be calculated by `createTheme()`, as described in the [Theme customization](/material-ui/customization/palette/) section.

If you are using the default primary and / or secondary shades then by providing the color object, `createTheme()` will use the appropriate shades from the material color for main, light and dark.

### Tools by the community

- [mui-theme-creator](https://zenoo.github.io/mui-theme-creator/): A tool to help design and customize themes for the Material UI component library. Includes basic site templates to show various components and how they are affected by the theme
- [MUI Theme Builder](https://petertyliu.github.io/mui-theme-builder/): A tool to generate, preview, and edit Material UI themes
- [Material palette generator](https://m2.material.io/inline-tools/color/): The Material palette generator can be used to generate a palette for any color you input.
- [MUI Theme Customizer](https://mansourcodes.github.io/mui-theme-customizer/): A tool to make it easier to experiment with and generate Material UI themes.

## 2014 Material Design color palettes

These color palettes, originally created by Material Design in 2014, are comprised of colors designed to work together harmoniously, and can be used to develop your brand palette. To generate your own harmonious palettes, use the palette generation tool.

### Important Terms

- **Palette**: A palette is a collection of colors, that is hues and their shades. Material UI provides all colors from the Material Design guidelines.
  [This color palette](#color-palette) has been designed with colors that work harmoniously with each other.
- **Hue & Shade**: A single color within the palette is made up of a hue such as "red", and shade, such as "500".
  "red 50" is the lightest shade of red (_pink!_), while "red 900" is the darkest.
  In addition, most hues come with "accent" shades, prefixed with an `A`.

### Color palette

Given a _HUE_ (red, pink, etc.) and a _SHADE_ (500, 600, etc.) you can import the color like this:

```jsx
import { red } from '@mui/material/colors';

const color = red[500];
```

{{"component": "file://./demos/color/index.ts", "hideToolbar": true, "bg": "inline"}}

### Examples

For instance, you can refer to complementary primary and accent colors, "red 500" and "purple A200" like so:

```js
import { purple, red } from '@mui/material/colors';

const primary = red[500]; // #f44336
const accent = purple['A200']; // #e040fb
const accent = purple.A200; // #e040fb (alternative method)
```

### Accessibility

[WCAG 2.2 Success Criterion 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) does recommend
that you have a minimum of a 4.5:1 contrast ratio for the visual presentation of text and images of text.
Material UI currently only enforces a 3:1 contrast ratio. If you would like to meet WCAG 2.2 Level AA compliance,
you can increase your minimum contrast ratio as described in the
[Theme customization](/material-ui/customization/palette/#accessibility) section.
