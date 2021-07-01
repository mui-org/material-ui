# Temática

<p class="description">Personaliza Material-UI con tu tema. Puedes cambiar los colores, la tipografía y mucho más.</p>

El tema especifica el color de los componentes, las obscuridad de las superficies, nivel de la sombra, opacidad apropiada de la tinta de los elementos, etc.

Los temas te permiten aplicar un tono consistente a tu aplicación. Le permite ** personalizar todos los aspectos de diseño ** de su proyecto para satisfacer las necesidades específicas de su negocio o marca.

Para promover una mayor coherencia entre las aplicaciones; claro y oscuro son los tipos de temas que están disponibles para elegir. Por defecto, los componentes utilizan el tema de tipo claro.

## Proveedor de Tema

Si desea personalizar el tema, deberá de usar el componente ` ThemeProvider ` para inyectar un tema en su aplicación. Sin embargo, esto es opcional; Los componentes de material-UI vienen con un tema predeterminado.

Puede aprender más acerca de esto en la [sección API](/styles/api/#themeprovider). Puede aprender más acerca de esto en la [sección API](/styles/api/#themeprovider).

## Variables de configuración de Tema

Cambiar las variables de configuración del tema es la forma más efectiva de adaptar Material-UI a sus necesidades. Las siguientes secciones cubren las variables de tema más importantes:

- [`.paleta`](/customization/palette/)
- [`.typography`](/customization/typography/)
- [`.espaciado`](/customization/spacing/)
- [`.separaciones`](/customization/breakpoints/)
- [`.zIndex`](/customization/z-index/)
- [`.transições`](/customization/transitions/)
- [`.componentes`](/customization/theme-components/)

Puede consultar la sección de [Tema predeterminado](/customization/default-theme/) para ver el tema completo.

### Variables personalizadas

Al usar el tema de Material-UI con la [solución de estilo](/styles/basics/) o [cualquier otra](/guides/interoperability/#themeprovider), puede ser conveniente añadir variables adicionales al tema, para que se puedan usar en todas partes. Por ejemplo:

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

## Accediendo al tema en un componente

<video autoPlay muted loop width="320">
  <source src="/static/studies.mp4" type="video/mp4" >
</video>

Usted [ puede acceder ](/styles/advanced/#accessing-the-theme-in-a-component) a las variables del tema dentro de sus componentes React.

- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/): A tool to generate themes for your Material-UI applications by just selecting the colors and having a live preview. Includes basic site templates to show various components and how they are affected by the theme
- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): Is an online tool for creating Material-UI themes via Material Design Color Tool.
- [Material palette generator](https://material.io/inline-tools/color/): The Material palette generator can be used to generate a palette for any color you input.

## Accediendo al tema en un componente

Usted [ puede acceder ](/styles/advanced/#accessing-the-theme-in-a-component) a las variables del tema dentro de sus componentes React.

## Anidando el tema

Usted [ puedes anidar ](/styles/advanced/#theme-nesting) multiples proveedores de tema.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

El tema interno **sobrescribirá** el tema exterior. Puede ampliar el tema externo proporcionando una función:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

**Sobre el rendimiento**

Las implicaciones de rendimiento de anidar el componente ` ThemeProvider ` están vinculados al trabajo de JSS detrás de escena. El punto principal a entender es que el CSS inyectado se almacena en caché con la siguiente tupla ` (styles, theme) `.

- `theme`: Si proporciona un tema nuevo en cada renderizado, un nuevo objeto CSS será calculado e inyectado. Tanto para la consistencia de la interfaz de usuario, como para el rendimiento, es mejor renderizar un número limitado de objetos de tema.
- ` styles`: Cuanto más grande es el objeto de estilos, más trabajo se necesitará.

## API

### `createTheme(options, ...args) => theme`

Generar un tema en base a las opciones recibidas.

#### Argumentos

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### Regresa

`theme` (_object_): A complete, ready-to-use theme object.

#### Ejemplos

```js
import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

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

#### Argumentos

1. `theme` (_object_): The theme object to enhance.
2. `options` (*Object* [optional]):

- `breakpoints` (_array\<string\>_ [optional]): Default to `['sm', 'md', 'lg']`. `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`.
- `disableAlign` (_bool_ [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (_number_ [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must be greater than 1.
- `variants` (_array\<string\>_ [optional]): Default to all. The typography variants to handle.

#### Regresa

`theme` (_object_): The new theme with a responsive typography.

#### Ejemplos

```js
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Using `unstable_createMuiStrictModeTheme` restricts the usage of some of our components.

#### Argumentos

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### Regresa

`theme` (_object_): A complete, ready to use theme object.

#### Ejemplos

```js
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```
