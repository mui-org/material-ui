---
title: React Icon Component
components: Icon, SvgIcon
githubLabel: 'componentes: SvgIcon'
materialDesign: https://material.io/design/iconography/system-icons.html
---

# Iconos

<p class="description">Guía y sugerencias para usar iconos con Material-UI.</p>

Material-UI da soporte para iconos de tres maneras:

1. [Iconos de Material Design](#material-icons) estandarizados y exportados como componentes de React (iconos SVG).
1. Con el componente [SvgIcon](#svgicon), un envoltorio de React para iconos SVG personalizados.
1. Con el componente [Icono](#icon-font-icons), un envoltorio de React para iconos de fuentes personalizados.

## Material Icons

Google has created over 1,700 official Material icons, each in five different "themes" (see below). For each SVG icon, we export the respective React component from the @material-ui/icons package. Puedes [buscar la lista completa de estos iconos](/components/material-icons/).

### Instalación

Instala el paquete en el directorio de tu proyecto con:

```sh
// usando npm
npm install @material-ui/icons

// usando yarn
yarn add @material-ui/icons
```

These components use the Material-UI `SvgIcon` component to render the SVG path for each icon, and so have a peer-dependency on `@materialui/core`.

If you aren't already using Material-UI in your project, you can add it with:

```sh
// usando npm
npm install @material-ui/core

// usando yarn
yarn add @material-ui/core
```

### Implementación

Importa iconos usando una de estas dos opciones:

- Opción 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Opción 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest for bundle size is Option 1, but some developers prefer Option 2. Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach.

Each Material icon also has a "theme": Filled (default), Outlined, Rounded, Two-tone, and Sharp. To import the icon component with a theme other than the default, append the theme name to the icon name. Por ejemplo el `@material-ui/icons/Delete` icono con:

- El tema Filled (por defecto) se exporta como `@material-ui/icons/Delete`,
- El tema Outlined se exporta como `@material-ui/icons/DeleteOutlined`,
- El tema Rounded se exporta como `@material-ui/icons/DeleteRounded`,
- El tema Twotone se exporta como `@material-ui/icons/DeleteTwoTone`,
- El tema Sharp se exporta como `@material-ui/icons/DeleteSharp`.

> Note: The Material Design guidelines name the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@material-ui/icons` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). Hay tres excepciones a esta regla de nomenclatura: `3d_rotation` exportada como `ThreeDRotation`, `4k` exportado como `FourK`, y `360` exportado como `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

### Pruebas

For testing purposes, each icon exposed from `@material-ui/icons` has a `data-testid` attribute with the name of the icon. Por ejemplo:

```jsx
import DeleteIcon from '@material-ui/icons/Delete';
```

has the following attribute once mounted:

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon

If you need a custom SVG icon (not available in the [Material Icons](/components/material-icons/)) you can use the `SvgIcon` wrapper. Este componente extiende el elemento nativo `<svg>`:

- Viene con accesibilidad integrada.
- SVG elements should be scaled for a 24x24px viewport so that the resulting icon can be used as is, or included as a child for other Material-UI components that use icons. (Esto puede personalizarse con el atributo `viewBox`).
- Por defecto, el componente hereda el color actual. Opcionalmente, puedes aplicar uno de los colores del tema usando el accesorio `color`.

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### Color

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Tamaño

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Component prop

Puede utilizar el envoltorio `SvgIcon` incluso si sus iconos se guardan en el formato `.svg`. [svgr](https://github.com/smooth-code/svgr) tiene cargadores para importar archivos SVG y usarlos como componentes React. Por ejemplo, con webpack:

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// ---
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

También es posible usarlo con "url-loader" o "file-loader". This is the approach used by Create React App.

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
}

// ---
import { ReactComponent as StarIcon } from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

### createSvgIcon

The `createSvgIcon` utility component is used to create the [Material icons](#material-icons). It can be used to wrap an SVG path with an SvgIcon component.

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
```

{{"demo": "pages/components/icons/CreateSvgIcon.js"}}

### Font Awesome

If you find that there are layout issues when using FontAwesomeIcon from `@fortawesome/react-fontawesome`, you can try passing the Font Awesome SVG data directly to SvgIcon.

[Font Awesome](https://fontawesome.com/icons) se puede utilizar con el componente `Icon` siguiente manera:

{{"demo": "pages/components/icons/FontAwesomeSvgIconDemo.js"}}

FontAwesomeIcon's `fullWidth` prop can also be used to approximate the correct dimensions, but it isn't perfect.

### Fuente de iconos Material

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) proporciona más de 2.000 iconos. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component, or with `createSvgIcon()`.

Nota: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) ya ha envuelto cada uno de estos iconos SVG con el componente `SvgIcon`, para que no tenga que hacerlo usted mismo.

## Icono (iconos de fuente)

El componente `Icon` mostrará iconos de cualquier fuente compatible con ligaduras. El componente `Icon` mostrará iconos de cualquier fuente compatible con ligaduras. Para usar un icono, simplemente se envuelve el nombre del icono (ligadura de la fuente) con el componente `Icono`, por ejemplo:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Por defecto, un Icono heredará el color del texto actual. Opcionalmente, se puede cambiar el color usando uno de los atributos del color del tema: `primary`, `secondary`, `action`, `error` & `disabled`.

### Fuente de iconos Material

`Icon` will by default set the correct base class name for the Material Icons font (filled variant). All you need to do is load the font, for instance, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

{{"demo": "pages/components/icons/Icons.js"}}

### Custom font

For other fonts, you can customize the baseline class name using the `baseClassName` prop. For instance, you can display two-tone icons with Material Design:

```jsx
import Icon from '@material-ui/core/Icon';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
  // Import the two tones MD variant                           ^^^^^^^^
/>;
```

{{"demo": "pages/components/icons/TwoToneIcons.js"}}

#### Global base class name

Modifying the `baseClassName` prop for each component usage is repetitive. You can change the default prop globally with the theme

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      defaultProps: {
        // Replace the `material-icons` default value.
        baseClassName: 'material-icons-two-tone',
      },
    },
  },
});
```

Then, you can use the two-tone font directly:

```jsx
<Icon>add_circle</Icon>
```

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follows:

{{"demo": "pages/components/icons/FontAwesomeIcon.js"}}

Note that the Font Awesome icons weren't designed like the Material Design icons (compare the two previous demos). The fa icons are cropped to use all the space available. You can adjust for this with a global override:

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/components/icons/FontAwesomeIconSize.js"}}

## Fuente vs SVG. Qué método usar?

Both approaches work fine, however there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, and renders faster and better.

For more details, take a look at [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accesibilidad

Icons can convey all sorts of meaningful information, so it's important to ensure they are accessible where appropriate. There are two use cases you'll want to consider:

- **Decorative icons** that are only being used for visual or branding reinforcement. Si se eliminaran de la página, los usuarios aún entenderían y podrían usar su página.
- **Semantic icons** are ones that you're using to convey meaning, rather than just pure decoration. This includes icons without text next to them that are used as interactive controls — buttons, form elements, toggles, etc.

### Decorative icons

If your icons are purely decorative, you're already done! El atributo `aria-hidden=true` se agrega para que sus iconos sean correctamente accesibles (invisibles).

### Semantic icons

#### Semantic SVG icons

You should include the `titleAccess` prop with a meaningful value. The `role="img"` attribute and the `<title>` element are added so that your icons are correctly accessible.

In the case of focusable interactive elements, for example when used with an icon button, you can use the `aria-label` prop:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

#### Semantic font icons

You need to provide a text alternative that is only visible to assistive technologies.

```jsx
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { visuallyHidden } from '@material-ui/utils';

// ...

<Icon>add_circle</Icon>
<Box component="span" sx={visuallyHidden}>Create a user</Box>
```

#### Referencia

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
